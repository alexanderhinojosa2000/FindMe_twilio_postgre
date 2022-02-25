const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = (db) => {

  router.post('/', (req, res) => {
    // getting data from the client
    const newUser = req.body;
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

    db.query(`SELECT * FROM users WHERE username = $1;`, [newUser.username])
      .then(data => {
        const user = data.rows[0];
        if (user) {
          res.status(401).send({ message: 'The username is already registered' });
          // throwing an error is like a break statement
          // it will jump directly to the catch block
          throw new Error("The username is already registered, username has to be unique");
        }
        // Insert user data to database
        const signUpQuery = "INSERT INTO users(first_name, last_name, username, phone_number, email, password) VALUES($1, $2, $3, $4, $5, $6) returning id, first_name, last_name, username, phone_number, email";

        const queryParams = [newUser.first_name, newUser.last_name, newUser.username, newUser.phone_number, newUser.email, hashedPassword];

        // when chaining .then blocks, make sure to return a promise (db.query returns a promise):
        // need to include 'return', or else it will not pass data to next block
        return db.query(signUpQuery, queryParams);
      }).then((data) => {
        const user = data.rows[0];
        res.status(200).send({
          message: "Signed up successfully!",
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          username: user.username,
          phoneNumber: user.phoneNumber,
          email: user.email
        });
      }).catch(err => {
        console.log(err);
      });
  });

  return router;
};