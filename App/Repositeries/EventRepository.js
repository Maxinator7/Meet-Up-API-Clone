const Event = require("../Models/Event");
const eventCreateValidator = require("../Validators/EventCreateValidator");
const eventUpdateValidator = require("../Validators/EventUpdateValidator");
const redisClient = require("../redisClient");

class EventRepository {
  async createEvent(eventData) {
    const { error } = eventCreateValidator(eventData);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const event = new Event(eventData);
    return await event.save();
  }

  async updateEvent(eventId, eventData) {
    const { error } = eventUpdateValidator(eventData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    return await Event.findByIdAndUpdate(eventId, eventData, { new: true });
  }

  async deleteEvent(eventId) {
    return await Event.findByIdAndDelete(eventId);
  }

  async getEventDetails(eventId) {
    return await Event.findById(eventId);
  }

  async getAllEvents() {
    let events = await redisClient.get("events");

    if (events) {
      // Parse and return cached data if exists
      return JSON.parse(events);
    }

    events = await Event.find();

    if (!events) {
      throw new Error("Events not found.");
    }

    // Store the result in Redis and set an expiration time (e.g., 1 hour)
    await redisClient.set("events", JSON.stringify(events), {
      EX: 3600, // 1 hour in seconds
    });

    return events;
  }
}

module.exports = new EventRepository();
