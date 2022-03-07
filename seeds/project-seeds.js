const { Project } = require('../models');

const projectData = [
  {
    title: 'Team Task Manager',
    project_deadline: new Date('2022/05/01'),
    team_id: 1,
  },
  {
    title: 'Bitcoin tracker',
    project_deadline: new Date('2022/06/01'),
    team_id: 2,
  },
];

const seedProject = () => Project.bulkCreate(projectData);

module.exports = seedProject;
