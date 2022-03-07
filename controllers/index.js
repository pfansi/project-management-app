const router = require('express').Router();
const homeRoutes = require('./home-routes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

router.all('*', async (_, res) => {
  return res.redirect('/');
});

module.exports = router;
