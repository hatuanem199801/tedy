import { withIronSession } from "next-iron-session";
import Cors from "cors";
import initMiddleware from "../../libs/init-middleware";
import ironConfig from "../../libs/ironSessionConfig";

const cors = initMiddleware(
  Cors({
    methods: ["GET"],
  })
);

async function handler(req, res, session) {
  await cors(req, res);
  req.session.destroy();
  return res.redirect("/admin/login");
}

export default withIronSession(handler, ironConfig);
