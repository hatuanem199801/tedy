import dbConnect from "../../configs/dbConnect";
import Event from "../../models/Event";

const handler = async (req, res) => {
  const { method, body } = req;
  let result;
  switch (method) {
    case "POST":
      result = await Event.create(body);
    default:
      result = await Event.find();
  }
  return res.json({
    status: 200,
    message: "success",
    data: JSON.parse(JSON.stringify(result)),
  });
};

export default dbConnect(handler);
