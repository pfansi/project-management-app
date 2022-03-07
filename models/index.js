const User = require('./User');
const Task = require('./Task');
const Team = require('./Team');
const Project = require('./Project');

User.hasMany(Task, {
  foreignKey: 'user_id',
});

Task.belongsTo(User, {
  foreignKey: 'user_id',
});

Team.hasMany(User, {
  foreignKey: 'team_id',
});

User.belongsTo(Team, {
  foreignKey: 'team_id',
});

Team.hasOne(Project, {
  foreignKey: 'team_id',
});

Project.belongsTo(Team, {
  foreignKey: 'team_id',
});

module.exports = { User, Task, Team, Project };
