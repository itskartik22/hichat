const Router = require("express").Router;
const userController = require("../controllers/userController");
const contactController = require("../controllers/contactController");
const conversationController = require("../controllers/conversationController");

const router = Router();

router.post("/create", userController.createUser);
router.post("/checkEmail", userController.checkEmail);
router.post("/login", userController.loginUser);
router.get("/details", userController.protect, userController.userDetails);
router.put("/update-details", userController.protect, userController.updateUserDetails);
// router.post("/login", userController.loginUser);

router.get("/logout", userController.logoutUser);

router.delete("/delete", userController.deleteUsers);

//contacts
router.post("/add-contact", userController.protect, contactController.addContact);
router.get("/contacts", userController.protect, contactController.getContacts);

//get Conversations
router.get("/conversations", userController.protect, conversationController.getConversations);

module.exports = router;