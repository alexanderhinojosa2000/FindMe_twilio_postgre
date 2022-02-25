const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/user/:id', (req, res) => {

    const getCatFomrsByUserIdQuery = `SELECT cat_forms.id, cat_name, gender, age, last_seen_date, last_seen_address, last_seen_city, last_seen_postal_code, status, date_created, user_id, image, description FROM cat_forms JOIN users ON users.id = cat_forms.user_id WHERE users.id = $1;`;
    const userId = [req.params.id];

    db.query(getCatFomrsByUserIdQuery, userId)
      .then(data => {
        const catForms = data.rows;
        res
          .status(200)
          .json({ catForms });
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  router.get('/:id', (req, res) => {

    const getCatFomrByIdQuery = `SELECT cat_forms.id, cat_name, gender, age, last_seen_date, last_seen_address, last_seen_city, last_seen_postal_code, status, date_created, user_id, image, description, users.first_name, users.last_name, users.username, users.phone_number, users.email FROM cat_forms JOIN users ON user_id = users.id WHERE cat_forms.id = $1;`;
    const catFormId = [req.params.id];

    db.query(getCatFomrByIdQuery, catFormId)
      .then(data => {
        const catForm = data.rows[0];
        res
          .status(200)
          .json(catForm);
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  return router;
};