"use strict";

const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // router.get('/map/:cat_forms/marker', function (req, res) {
  //   const cat_forms = req.params.cat_form
  //   const { lng, lat, place_id } = req.query;
  //   db.query("SELECT id FROM cat_forms WHERE last_seen_address = $1 AND lat = $2 AND place_id = $3 AND map_id = $4", [last_seen_address, last_seen_postal_code, last_seen_city, cat_forms])

  //     .then(result => {
  //       res.send(result.rows)
  //     })
  //     .catch(error => {
  //       res.status(500).send("error.message")
  //       // console.log("hello:", error);
  //     })

  // });.

  // router.get('/marker', function (req, res) {
  //   const cat_forms = req.params.cat_form
  //   const { lng, lat, place_id } = req.query;
  //   db.query(`
  //   SELECT last_seen_address, last_seen_postal_code, last_seen_city 
  //   FROM cat_forms 
  //   WHERE cat_forms.id = $1;`,
  //     [last_seen_address, last_seen_postal_code, last_seen_city, cat_forms])

  //     .then(result => {
  //       res.send(result.rows)
  //     })
  //     .catch(error => {
  //       res.status(500).send("error.message")
  //       // console.log("hello:", error);
  //     })

  // });



  return router;
};
