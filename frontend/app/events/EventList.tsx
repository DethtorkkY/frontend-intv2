"use client";

type Event = {
  id: number;
  name: string;
  type: "conference" | "webinar" | "meeting";
};

type EventListProps = {
  events: Event[];
  eventNames: {
    conference: string;
    webinar: string;
    meeting: string;
  };
};

export default function EventList({ events, eventNames }: EventListProps) {
  return (
    <div>
      <h2>Мероприятия</h2>

      {events.map((event) => (
        <div key={event.id}>
          <p>Название: {event.name}</p>
          <p>Тип: {eventNames[event.type]}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}