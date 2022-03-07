const { QueryTypes } = require('sequelize');
const { Project, Team } = require('../models');
const sequelize = require('../config/connection');

async function renderManagerDashboard() {
  try {
    const projectsData = await Project.findAll({});
    const projects = projectsData.map((project) =>
      project.get({ plain: true })
    );

    const teamsData = await Team.findAll({});
    const teams = teamsData.map((team) => team.get({ plain: true }));
    const freeTeams = await sequelize.query(
      'SELECT team.id, team.name FROM team LEFT JOIN project ON team.id = project.team_id WHERE project.team_id IS NULL',
      { type: QueryTypes.SELECT }
    );
    console.log(freeTeams);

    return { projects, teams, freeTeams };
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = renderManagerDashboard;
