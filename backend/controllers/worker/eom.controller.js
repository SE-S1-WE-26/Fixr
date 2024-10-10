const EOM = require("../../models/worker/eom.model"); // Adjust the path to your EOM model
const mongoose = require("mongoose");

// Helper function to get the current month and year
const getCurrentMonthAndYear = () => {
  const date = new Date();
  return {
    month: date.getMonth() + 1, // Months are zero-indexed in JavaScript
    year: date.getFullYear(),
  };
};

// 1. Get top 3 employees of the month (current system month)
const getTopEmployeesOfTheMonth = async (req, res) => {
  try {
    const { month, year } = getCurrentMonthAndYear();

    const topEmployees = await EOM.find({ month, year })
      .sort({ place: 1 }) // Sort by place (ascending)
      .limit(3)
      .populate({
        path: "workerId", // Populating Worker
        populate: { path: "userId" }, // Nested populate to get User
      })
      .exec();

    return res.status(200).json(topEmployees);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching top employees", error: error.message });
  }
};

// 2. Update the system monthly with top 3 employees and their places
const updateTopEmployees = async (req, res) => {
  try {
    const { month, year } = getCurrentMonthAndYear();
    const { topEmployees } = req.body; // Expecting an array of employee IDs with their places

    // Clear previous month's records if needed
    await EOM.deleteMany({ month, year });

    const updatedEmployees = topEmployees.map((emp, index) => ({
      workerId: emp.workerId,
      place: index + 1,
      year,
      month,
    }));

    await EOM.insertMany(updatedEmployees);

    return res
      .status(201)
      .json({ message: "Top employees updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating top employees", error: error.message });
  }
};

// 3. Get top 3 employees according to a specific month and year
const getTopEmployeesByMonthAndYear = async (req, res) => {
  try {
    const { month, year } = req.params;

    const topEmployees = await EOM.find({
      month: Number(month),
      year: Number(year),
    })
      .sort({ place: 1 }) // Sort by place (ascending)
      .limit(3)
      .populate("workerId", "name") // Assuming 'name' is a field in Worker model
      .exec();

    return res.status(200).json(topEmployees);
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error fetching top employees for specified month/year",
        error: error.message,
      });
  }
};

const createEOM = async (req, res) => {
  try {
    const entries = req.body; // Expecting an array of entries

    const newEOMEntries = entries.map((entry) => ({
      workerId: entry.workerId,
      place: entry.place,
      year: entry.year,
      month: entry.month,
    }));

    await EOM.insertMany(newEOMEntries); // Insert all entries at once

    return res
      .status(201)
      .json({
        message: "EOM entries created successfully",
        data: newEOMEntries,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating EOM entries", error: error.message });
  }
};

module.exports = {
  getTopEmployeesOfTheMonth,
  updateTopEmployees,
  getTopEmployeesByMonthAndYear,
  createEOM,
};
