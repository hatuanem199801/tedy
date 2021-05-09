import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provider name of this event."],
  },
  image: {
    type: String,
    required: [true, "Please provider image of this event."],
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  date_created: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
