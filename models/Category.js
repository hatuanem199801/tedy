import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provider name of this event."],
  },
  seourl: {
    type: String,
    required: [true, "Please provider seourl of this event."],
  },
  image: {
    type: String,
    required: [true, "Please provider image of this event."],
  },
  description: {
    type: String,
  },
  date_created: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
