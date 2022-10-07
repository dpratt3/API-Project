// backend/routes/api/index.js
const router = require("express").Router();
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
// router.use(restoreUser);

// GET /api/set-token-cookie
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");
router.get("/set-token-cookie", async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: "Demo-lition",
    },
  });
  console.log("-----------------------", user);
  setTokenCookie(res, user);
  return res.json({ user });
});

router.use(restoreUser);

router.get("/restore-user", (req, res) => {
  return res.json(req.user);
});

module.exports = router;
