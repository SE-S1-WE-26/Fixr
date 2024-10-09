const express = require('express');
const router = express.Router();
const {
    getTopEmployeesOfTheMonth,
    updateTopEmployees,
    getTopEmployeesByMonthAndYear,
    createEOM,
} = require('../../controllers/worker/eom.controller');

router.get('/current', getTopEmployeesOfTheMonth);
router.post('/update', updateTopEmployees);
router.get('/:month/:year', getTopEmployeesByMonthAndYear);
router.post('/create', createEOM); // Route to create dummy data

module.exports = router;
