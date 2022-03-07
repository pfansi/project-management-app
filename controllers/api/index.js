const router = require('express').Router();

const taskRoutes = require('./task-routes');
const teamRoutes = require('./team-routes');
const userRoutes = require('./user-routes');
const projectRoutes = require('./project-routes');

router.use('/tasks', taskRoutes);
router.use('/teams', teamRoutes);
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
