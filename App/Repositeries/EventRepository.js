const Event = require("../Models/Event");
const eventCreateValidator = require("../Validators/EventCreateValidator");
const eventUpdateValidator = require("../Validators/EventUpdateValidator");

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
}

module.exports = new EventRepository();
