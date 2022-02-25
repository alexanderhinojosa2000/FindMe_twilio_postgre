const express = require('express');
const router = express.Router();
const db = require('../db');


/* Search Form */

router.get('/', (req, res) => {

  const { last_seen_city, last_seen_postal_code, status } = req.query;
  const city = last_seen_city ? last_seen_city.replace(/\s+/g, '') : null;
  const postalCode = last_seen_postal_code ? last_seen_postal_code.replace(/\s+/g, '') : null;

  let queryString = `
                    SELECT 
                    cat_forms.id,
                    cat_name,
                    gender,
                    age,
                    last_seen_date,
                    last_seen_address,
                    last_seen_city,
                    last_seen_postal_code,
                    status,
                    image,
                    description
                    FROM cat_forms `;
  
  const params = [];
  if (city) {
    params.push(`%${city}%`);
    queryString += `WHERE last_seen_city ILIKE $${params.length} `;
  }

  if (postalCode) {
    queryString += params.length ? `AND ` : `WHERE `;
    params.push(`%${postalCode}%`);
    queryString += `last_seen_postal_code ILIKE $${params.length} `;
  }

  if (status) {
    queryString += params.length ? `AND ` : `WHERE `;
    params.push(status);
    queryString += `status ILIKE $${params.length} `;
  }

  // use exact values
  db.query(queryString, params)
    .then(results =>
      res.status(200).send(results.rows)
    )
    .catch(error => {
      console.error(error);
      res.send(error.message);
    });
});

module.exports = router;