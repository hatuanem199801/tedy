import { withIronSession } from "next-iron-session";
import initMiddleware from "../../libs/init-middleware";
import Cors from "cors";

const cors = initMiddleware(
  Cors({
    methods: ["GET"],
  })
);

async function handler(req, res, session) {
  await cors(req, res);
  const user = req.session.get("user");
  if (user) {
    res.json({ status: 200, data: user });
  }
  res.json({ status: 404 });
}

export default withIronSession(handler, {
  cookieName: "admin",
  password: "complex_password_at_least_32_characters_long",
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
