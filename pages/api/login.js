import { withIronSession } from "next-iron-session";
import initMiddleware from "../../libs/init-middleware";
import Cors from "cors";

const cors = initMiddleware(
  Cors({
    methods: ["POST"],
  })
);

async function handler(req, res) {
  await cors(req, res);
  const { username, password } = req.body;
  if (username === "admin" && password === "Gongyoo001@") {
    req.session.set("user", {
      username: "admin",
      admin: true,
    });
    await req.session.save();
    res.json({
      status: 200,
      message: "Logged in success.",
    });
  } else {
    res.json({
      status: 404,
      message: "Not found user or password.",
    });
  }
}

export default withIronSession(handler, {
  cookieName: "admin",
  password: "complex_password_at_least_32_characters_long",
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
