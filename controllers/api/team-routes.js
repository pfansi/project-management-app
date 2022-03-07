/* eslint-disable camelcase */
const router = require('express').Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../../config/connection');
const { Team, User, TeamProject } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const teamsData = await Team.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ],
    });
    return res.status(200).json(teamsData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    await Team.create({ name: req.body.teamName });
    return res.status(201).json({ message: 'Team successfully created' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    await Team.update(req.body, { where: { id: req.params.id } });
    const teamData = await Team.findByPk(req.params.id);
    if (!teamData) {
      return res.status(400).json({ message: 'Team not found' });
    }
    return res.status(200).json({ message: 'Team updated' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
