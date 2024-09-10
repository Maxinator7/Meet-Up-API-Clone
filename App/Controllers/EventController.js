const eventService = require("../Services/EventService");
class EventController {
  async createEvent(req, res) {
    try {
      const event = await eventService.createEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateEvent(req, res) {
    try {
      const event = await eventService.updateEvent(req.params.id, req.body);
      res.status(200).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteEvent(req, res) {
    try {
      await eventService.deleteEvent(req.params.id);
      res.status(200).json({
        message: "Event deleted successfully.",
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async getEventDetails(req, res) {
    try {
      const event = await eventService.getEventDetails(req.params.id);
      res.status(200).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllEvents(req, res) {
    try {
      const events = await eventService.getAllEvents();
      res.status(200).json(events);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new EventController();
