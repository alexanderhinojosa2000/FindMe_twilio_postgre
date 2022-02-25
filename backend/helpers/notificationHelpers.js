const db = require('../db');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMS = (user) =>  {
  const { id, first_name, last_name, phone_number } = user;
  console.log(id, first_name, last_name, phone_number);
  const msg = `Hi! ${first_name} ${last_name}, This is from Find Me-Ow! You got a comment on your post: ${id}.`;
  return client.messages
    .create({
      body: msg,
      from: process.env.SOURCE_NUMBER,
      to: process.env.DESTINATION_NUMBER
    })
    .then(message => {
      console.log(message.sid);
      return {success: true, msg: `sent SMS for post id ${id}`};
    });
};

const createNotification = (postId) => {

  const userInfoQuery = `SELECT users.id, first_name, last_name, phone_number, cat_forms.id FROM users JOIN cat_forms ON users.id = cat_forms.user_id WHERE cat_forms.id =$1;`;
  const queryParams = [postId];
  return db.query(userInfoQuery, queryParams)
    .then(data => {
      const user = data.rows[0];
      if (!user) {
        throw new Error(`This post doesn't exist.`);
      }
      return sendSMS(user);
    });
};

module.exports = { createNotification };