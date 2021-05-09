import { withIronSession } from "next-iron-session";
import initMiddleware from "../../libs/init-middleware";
import Cors from "cors";
import ironConfig from "../../libs/ironSessionConfig";

const cors = initMiddleware(
  Cors({
    methods: ["GET"],
  })
);

async function handler(req, res, session) {
  await cors(req, res);
  const user = req.session.get("user");
  if (user && user.username && user.admin) {
    return res.json({ status: 200, data: user });
  } else {
    return res.json({ status: 404 });
  }
}

export default withIronSession(handler, ironConfig);
