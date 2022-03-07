/* eslint-disable camelcase */
const router = require('express').Router();
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/connection');
const { Team, User, Task } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/:id/team', async (req, res) => {
  try {
    const rawData = await sequelize.query(
      'SELECT team_id FROM user WHERE user.id = :id',
      {
        type: QueryTypes.SELECT,
        replacements: { id: req.params.id },
      }
    );
    if (rawData.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { team_id } = rawData[0];
    const userTeam = await Team.findByPk(team_id, {
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
      ],
    });
    return res.status(200).json(userTeam);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      return res
        .status(404)
        .json({ message: 'Login failed. Please try again.' });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: 'Login failed. Please try again.' });
    }
    return req.session.save(() => {
      req.session.user = userData;
      req.session.loggedIn = true;
      return res.status(200).json({
        user: userData,
      });
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      role: 'employee',
    });
    return req.session.save(() => {
      req.session.user = userData;
      req.session.loggedIn = true;
      return res.status(201).json(userData);
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/logout', async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => res.status(204).end());
  } else {
    res.status(404).end();
  }
});

router.patch('/:id', async (req, res) => {
  try {
    await User.update(req.body, { where: { id: req.params.id } });
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
