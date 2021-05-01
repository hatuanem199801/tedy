import { withIronSession } from "next-iron-session";
import Cors from "cors";
import initMiddleware from "../../libs/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET"],
  })
);

async function handler(req, res, session) {
  await cors(req, res);
  req.session.destroy();
  res.send("Logged out");
}

export default withIronSession(handler, {
  cookieName: "admin",
  password: "complex_password_at_least_32_characters_long",
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
