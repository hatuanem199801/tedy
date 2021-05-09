import dbConnect from "../../configs/dbConnect";
import Event from "../../models/Event";
import Cors from "cors";
import initMiddleware from "../../libs/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST"],
  })
);
const handler = async (req, res) => {
  await cors(req, res);
  const { method, body } = req;
  let result;
  switch (method) {
    case "POST":
      result = await Event.create(body);
    default:
      result = await Event.find({ isActive: true });
  }
  return res.json({
    status: 200,
    message: "success",
    data: JSON.parse(JSON.stringify(result)),
  });
};

export default dbConnect(handler);
