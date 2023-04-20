const express = require('express');
const { requiresAuth, claimEquals, claimCheck, claimIncludes } = require('express-openid-connect');
const ProjectController = require('../controllers/project.controller');

let router = express.Router();

router.get('/epics',requiresAuth(), ProjectController.getEpicsProjects);
router.get('/', requiresAuth(), ProjectController.project);
router.post('/create', requiresAuth(), ProjectController.postProject);
router.get('/list', requiresAuth(), ProjectController.getListProjects);
router.get('/list/search', requiresAuth(), ProjectController.getListProjectsSearchBar);
router.delete('/delete/:project', requiresAuth(), ProjectController.deleteProject);
router.get('/modify/:project',requiresAuth(),ProjectController.modifyProject);
router.post('/modify/:project',requiresAuth(),ProjectController.modifyProjectPost);

module.exports = router;