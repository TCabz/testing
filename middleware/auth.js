// dependencies
// jsonwebtoken
const jwt = require("jsonwebtoken");

// const router = require("../routes/userRouter");
// const { route } = require("../routes/userRouter");

// middleware to be executed auth
const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No Authentication Token, Authorization Denied" });

    // if there is a token, need to verify the token vs the secret
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // if not verified
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token Verification Failed, Authorization Denied" });

    // if verified
    //     req.user = verified;
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
