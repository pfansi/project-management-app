const { Team } = require('../models');

const teamData = [
  {
    name: 'The Rangers',
  },
  {
    name: 'The Wannabes',
  },
];

const seedTeam = () => Team.bulkCreate(teamData);

module.exports = seedTeam;
