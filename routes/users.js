const router = require("express").Router();
const {
  getUsers,
  getUser,
  patchProfile,
  pacthAratar,
  createUser,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", getUser);
router.patch("/me", patchProfile);
router.patch("/me/avatar", pacthAratar);
router.post("/", createUser);

module.exports = router;
