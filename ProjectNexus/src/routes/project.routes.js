const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const ProjectController = require('../controllers/project.controller');

let router = express.Router();

router.get('/', requiresAuth(), ProjectController.project);
router.post('/create', ProjectController.postProject);

module.exports = router;