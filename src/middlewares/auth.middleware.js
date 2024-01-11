require("dotenv").config();
const jwt = require("jsonwebtoken");
const authSvc = require("../app/auth/auth.services");
const { getTokenFromHeader } = require("../config/helpers");

const CheckLogin = async (req, res, next) => {
  try {
    let token = getTokenFromHeader(req);

    if (token === null) {
      next({ code: 401, message: "Login required." });
    } else {
      token = token.split(" ").pop();
      if (!token) {
        next({ code: 401, message: "Token required." });
      } else {
        let patData = await authSvc.getPatByToken(token);
        if (patData) {
          let data = jwt.verify(token, process.env.JWT_SECRET);

          let userDetail = await authSvc.getuserByFilter({
            _id: data.userId,
          });
          if (userDetail) {
            req.authUser = userDetail;
            next();
          } else {
            next({ code: 401, message: "User does not exists anymore" });
          }
        } else {
          next({ code: 401, messaage: "Token already expired or invalid" });
        }
      }
    }
  } catch (exception) {
    console.log(exception);
    next({ code: 401, message: exception.message });
  }
};
module.exports = CheckLogin;
