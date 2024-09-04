const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
      trim: true,
    },
    time: {
      type: String, // Use String to store time in HH:MM format
    },
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    //   image: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Image", // Optional, if you want to associate an image with the event
    //   },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
