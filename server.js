const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'this is a test and it is secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize
  .sync({ force: false })
  .then(() =>
    // eslint-disable-next-line no-console
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
  )
  .catch((error) => {
    throw new Error(error.message);
  });
