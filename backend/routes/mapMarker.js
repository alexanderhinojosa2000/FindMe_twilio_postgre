"use strict";

const express = require('express');
const router = express.Router();


module.exports = (db) => {

  router.get('/:id', function (req, res) {

    const { last_seen_address, last_seen_postal_code, last_seen_city, cat_forms } = req.query;


    const query = {
      text: `
      SELECT last_seen_address, last_seen_postal_code, last_seen_city 
      FROM cat_forms 
      WHERE cat_forms.id = $1;`,
      // [last_seen_address, last_seen_postal_code, last_seen_city, cat_forms]
    }
    const catFormId = [req.params.id];

    db.query(query, catFormId)
      .then(results =>
        res.status(200)
          .send(results.rows)
      )
      .catch(error => {
        console.error(error)
        res.send(error.message)
      })

  });
  return router;
}