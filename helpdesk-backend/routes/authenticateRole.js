const express = require("express");
const router = express.Router();
const authenticateRoleController = require('../controllers/authenticateRoleController');
const {isAdmin, isAdminORStudent, isStudent } = require('../middleware/authenticateRoleBase');

router.get('/admin', isAdmin, authenticateRoleController.adminRole);
router.get('/adminAndStudent', isAdminORStudent, authenticateRoleController.adminAndStudentRole);
router.get('/student', isStudent, authenticateRoleController.studentRole);

module.exports = router;