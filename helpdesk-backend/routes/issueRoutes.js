const router = require("express").Router();
const { isAdmin, isStudent, isAdminORStudent } = require('../middleware/authenticateRoleBase');
const { createIssue, getAllIssuesByUserId, getAllIssues, updateIssue, 
    deleteIssue, searchIssue, updateIssueStatus, resolveIssue, updateIssuePriority } = require('../controllers/issueController');

// Student-only routes
router.post('/createIssue', createIssue); //create new issue
router.get('/getAllIssuesByUserId/:id', isStudent, getAllIssuesByUserId); //view all issues by userId
router.put('/updateIssue/:id', isAdminORStudent, updateIssue); //update an issue by id

// Student and Admin routes
router.delete('/deleteIssue/:id', isAdminORStudent, deleteIssue); //delete an issue by id
router.get('/searchIssue', isAdminORStudent, searchIssue); //search issue

// Admin-only routes
router.get('/', isAdmin, getAllIssues); //view all issues
router.put('/updateIssueStatus/:id', isAdminORStudent, updateIssueStatus); //update issue status by id
router.put('/resolveIssue/:id', isAdmin, resolveIssue); //resolve issue by id
router.put('/updateIssuePriority/:id', isAdmin, updateIssuePriority); //update issue priority by id

module.exports = router;

