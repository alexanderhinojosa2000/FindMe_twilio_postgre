const express = require('express');
const router = express.Router();
const createNotification = require('../helpers/notificationHelpers');


module.exports = (db) => {

  router.get("/:postId", (req, res) => {
    console.log("get: /sms/postId", req.params);
    createNotification(req.params.postId)
      .then(result => {
        if (result) {
          res.status(203).json({ msg: result.msg });
        }
      })
      .catch(e => {
        res.status(403).json({ msg: e.message });
        console.log("IN ROUTER CATCH", e);
      });
  });

  return router;
};