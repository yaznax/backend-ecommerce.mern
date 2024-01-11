const router = require("express").Router();
const authCtrl = require("./auth.controller");
const uploader = require("../../middlewares/uploader.middleware");
const ValidateRequest = require("../../middlewares/validate-request.middleware");
const {
  registerSchema,
  passwordSchema,
  loginSchema,
  emailValidatonSchema,
} = require("./auth.validator");
const CheckLogin = require("../../middlewares/auth.middleware");
const CheckPermission = require("../../middlewares/rbac.middleware");
const { z } = require("zod");

const dirSetup = (req, res, next) => {
  req.uploadDir = "./public/uploads/users";
  next();
};

router.post(
  "/register",
  dirSetup,
  uploader.single("image"),
  ValidateRequest(registerSchema),
  authCtrl.register
);

router.get("/verify-token/:token", authCtrl.verifyToken);
router.post(
  "/set-password/:token",
  ValidateRequest(passwordSchema),
  authCtrl.setpassWord
);

router.post("/login", ValidateRequest(loginSchema), authCtrl.login);

router.get("/me", CheckLogin, authCtrl.getLoggedInUser);

router.get("/refresh-token", CheckLogin, (req, res, next) => {});

router.post(
  "/forget-password",
  ValidateRequest(emailValidatonSchema),
  authCtrl.forgetPassword
);

router.post(
  "/reset-password/:resetToken",
  ValidateRequest(passwordSchema),
  authCtrl.resetPassword
);

router.post("/logout", CheckLogin, authCtrl.logoutUser);

module.exports = router;
