const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const signupRouter = require('./routes/signup');
const searchRouter = require('./routes/search');
const loginRouter = require('./routes/login');
const smsRouter = require('./routes/sms');
const commentRouter = require('./routes/comment');
const mapDisplayRouter = require("./routes/map");
const catFormsRouter = require('./routes/catForms');
const mapMarkerRouter = require('./routes/mapMarker')


const app = express();
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);
const cors = require('cors');
const router = require('./routes/search');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);

// ### CREATE ROUTES HERE 

app.use('/api/users', usersRouter(dbHelpers));
app.use('/api/signup', signupRouter(db));
app.use('/api/search', searchRouter);
app.use('/api/login', loginRouter(db));
app.use('/api/comment', commentRouter);
app.use('/api/sms', smsRouter(db)); //for test
app.use("/map", mapDisplayRouter);
app.use('/api/catforms', catFormsRouter(db));
app.use('/api/marker', mapMarkerRouter(db));



app.post('/report-pet', (req, res) => {
  const { description, image, cat_name, gender, last_seen_date, last_seen_address, last_seen_city, last_seen_postal_code, status, age, user_id } = req.body

  // console.log("OVER HERE~~~~~~~~~", req.body);
  db.query(`
  INSERT INTO cat_forms ( 
    cat_name,
      gender,
      age,
      last_seen_date,
      last_seen_address,
      last_seen_city,
      last_seen_postal_code,
      status,
      image,
      description,
      user_id)
    
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *;`,
    [cat_name,
      gender,
      age,
      last_seen_date,
      last_seen_address,
      last_seen_city,
      last_seen_postal_code,
      status,
      image,
      description,
      user_id
    ])
    .then((data) => {
      // res.json(submit);
      res.status(200);
      res.send(data.rows[0]);
    })
    .catch(error => {
      console.error(error)
    })
})





module.exports = app;