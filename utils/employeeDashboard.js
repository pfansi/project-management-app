const { User, Task } = require('../models');

async function renderEmployeeDashboard(req, res) {
  try {
    const userRawData = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'first_name', 'last_name', 'team_id'],
      include: [
        {
          model: Task,
          attributes: {
            exclude: ['user_id'],
          },
        },
      ],
    });
    if (!userRawData) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userData = userRawData.get({ plain: true });
    const { tasks } = userData;

    const completedTasks = tasks.filter((task) => task.status === 'completed');
    const inProgressTasks = tasks.filter(
      (task) => task.status === 'in_progress'
    );
    const notStartedTasks = tasks.filter(
      (task) => task.status === 'not_started'
    );
    return { userData, completedTasks, inProgressTasks, notStartedTasks };
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = renderEmployeeDashboard;
