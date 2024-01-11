const CheckLogin = require("../../middlewares/auth.middleware");
const CheckPermission = require("../../middlewares/rbac.middleware");
const uploader = require("../../middlewares/uploader.middleware");
const ValidateRequest = require("../../middlewares/validate-request.middleware");
const userCtrl = require("./user.controller");
const userSvc = require("./user.service");

const router = require("express").Router();
const { checkAccess } = require("../../middlewares/access-check.middleware");

const dirSetup = (req, res, next) => {
  req.uploadDir = "./public/uploads/user";
  next();
};

router.get("/by-status/:status", userCtrl.getUserByStatus);
router.get("/by-role/:role", userCtrl.getUserByRole);

router
  .route("/")
  .get(CheckLogin, CheckPermission("admin"), userCtrl.listAllUsers);

module.exports = router;
