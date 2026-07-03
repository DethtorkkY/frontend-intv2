const express = require('express');
const app = express();
const PORT = 3001;
const events = [
  {
    id: 1,
    name: "React Conf",
    type: "conference",
  },
  {
    id: 2,
    name: "JS Webinar",
    type: "webinar",
  },
  {
    id: 3,
    name: "Angular Meetup",
    type: "meeting",
  },
  {
    id: 4,
    name: "Next.js Conf",
    type: "conference",
  },
  {
    id: 5,
    name: "TypeScript Webinar",
    type: "webinar",
  },
];
app.get('/api/filter', (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = parseInt(req.query.offset, 10) || 0;
  const filter = req.query.filterBy;
  let filteredEvents = events;
  if (filter) {
  filteredEvents = events.filter(event => event.type === filter);
  }
  const paginatedEvents = filteredEvents.slice(offset, offset + limit);
  res.json(paginatedEvents);
});
app.get("/api/data", (req, res) => {
  res.json(events);
});
app.post("/api/submit", (req, res) => {
  console.log("Получены данные");

  res.json({
    success: true,
    message: "Форма успешно отправлена",
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});