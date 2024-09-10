const eventRepository = require("../Repositeries/EventRepository");
const User = require("../Models/User");
const EventRepository = require("../Repositeries/EventRepository");

class EventService {
  async createEvent(eventData) {
    if (eventData.attendees || eventData.organizer) {
      await this.validateUsers(eventData);
    }
    return await eventRepository.createEvent(eventData);
  }

  async updateEvent(eventId, eventData) {
    await this.checkEvent(eventId);
    return await eventRepository.updateEvent(eventId, eventData);
  }

  async deleteEvent(eventId) {
    await this.checkEvent(eventId);
    return await eventRepository.deleteEvent(eventId);
  }
  async getEventDetails(eventId) {
    return await this.checkEvent(eventId);
  }

  async attendEvent() {
    await this.checkEvent();
    // fetch event

    // update add member and update event

    // and return reqd response

    return { message: "Added member" };
  }

  async checkEvent(eventId) {
    const event = await eventRepository.getEventDetails(eventId);

    if (!event) {
      throw new Error("Event do not exist.");
    }
    return event;
  }

  async getAllEvents() {
    const events = await eventRepository.getAllEvents();

    if (!events) {
      throw new Error("Events not found.");
    }
    return events;
  }

  async validateUsers(eventData) {
    if (eventData.attendees) {
      const existingAttendees = await User.find(
        { _id: { $in: eventData.attendees } },
        { _id: 1 }
      );

      if (existingAttendees.length !== eventData.attendees.length) {
        throw new Error("One or more attendees do not exist");
      }
    }

    if (eventData.organizer) {
      const existingorganizers = await User.find(
        { _id: { $in: eventData.organizer } },
        { _id: 1 }
      );

      if (existingorganizers.length !== eventData.organizer.length) {
        throw new Error("One or more organizers do not exist");
      }
    }
  }
}

module.exports = new EventService();
