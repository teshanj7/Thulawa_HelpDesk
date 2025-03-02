const router = require("express").Router();

const { createIssue, getAllIssuesByUserId, getAllIssues, updateIssue, deleteIssue, searchIssue, updateIssueStatus, resolveIssue } = require('../Controllers/issueController');

//create new issue
router.post('/', createIssue);

//view all issues by userId
router.get('/getAllIssues/:id', getAllIssuesByUserId);

//view all issues
router.get('/', getAllIssues);

//update an issue by id
router.put('/updateIssue/:id', updateIssue);

//delete an issue by id
router.delete('/deleteIssue/:id', deleteIssue);

//search issue
router.get('/searchIssue/:key', searchIssue);

//update issue status by id
router.patch('/updateIssueStatus/:id', updateIssueStatus);

//resolve issue by id
router.patch('/resolveIssue/:id', resolveIssue);

module.exports = router;

