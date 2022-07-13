// backend/routes/api/users.js
const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Sign up
router.post(
  '/',
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    console.log(firstName)
    const user = await User.signup({ email, username, password, firstName : firstName, lastName : lastName });
    await setTokenCookie(res, user);

    return res.json({
      user
    });
  }
);

module.exports = router;
