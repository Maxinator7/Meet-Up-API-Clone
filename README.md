# Meetup API Clone

A backend API clone for managing events, attendees, and organizers similar to the functionality provided by Meetup. This project is built using Node.js and Express, with MongoDB as the database.

## Features

- **User Management**: CRUD operations for users, including attendee and organizer roles.
- **Event Management**: Create, update, delete, and view events. Each event can have multiple attendees and an organizer.
- **Validation**: Ensures that attendees and organizers exist in the database before associating them with an event.
- **Error Handling**: Robust error handling for common issues like missing users or events.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user and event data.
- **Mongoose**: ODM library for MongoDB.
- **Joi**: Schema description language and data validator for JavaScript objects.
