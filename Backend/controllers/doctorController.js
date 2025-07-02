import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailibility = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availability changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const matchSpecialization = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms) {
      return res.json({ success: false, message: "Symptoms are required" });
    }

    // Example symptom-to-specialization mapping
    const specializationMapping = {
      fever: "General Physician",
      "chest pain": "Cardiologist",
      "skin rash": "Dermatologist",
      toothache: "Dentist",
      "stomach ache": "Gastroenterologist",
      "eye problem": "Ophthalmologist",
    };

    let matchedSpecialist = "General Physician"; // Default specialist
    for (const key in specializationMapping) {
      if (symptoms.toLowerCase().includes(key)) {
        matchedSpecialist = specializationMapping[key];
        break;
      }
    }

    res.json({ success: true, specialist: matchedSpecialist });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for doctor login

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const isMatched = await bcrypt.compare(password, doctor.password);
    if (isMatched) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//apis to get doctor appointments for doctor panel

const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.doctor._id;
    const appointments = await appointmentModel.find({ docId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to mark appointment complete

const appointmentComplete = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    if (appointment.isCompleted) {
      return res.json({
        success: false,
        message: "Appointment is already completed",
      });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      isCompleted: true,
    });

    res.json({
      success: true,
      message: "Appointment marked as completed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//api to cancel appointment for doctor pannel

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    res.json({ success: true, message: "Appointment canceled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//api to get dashboard data for doctor panel

const doctorDashBoard = async (req, res) => {
  try {
    const docId = req.doctor._id;

    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get doctor profile for doctor panel

const doctorProfile = async (req, res) => {
  try {
    const docId = req.doctor._id;

    const profileData = await doctorModel.findById(docId).select("-password");

    res.json({ success: true, profileData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//api to update the doctor data from doctor panel

const updateDoctorProfile = async (req, res) => {
  try {
    const { fees, address, available } = req.body;
    const docId = req.doctor._id;

    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailibility,
  doctorList,
  matchSpecialization,
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorDashBoard,
  doctorProfile,
  updateDoctorProfile,
};
