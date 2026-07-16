"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useEvent } from "../contexts/EventContext";

const EventList = dynamic(() => import("./EventList"));

type Event = {
  id: number;
  name: string;
  type: "conference" | "webinar" | "meeting";
};

export default function EventsPage() {
  const { selectedOption, setSelectedOption } = useEvent();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [events, setEvents] = useState<Event[]>([]);

  const eventNames = {
    conference: "Конференция",
    webinar: "Вебинар",
    meeting: "Встреча",
  };

  useEffect(() => {
    fetch(`https://angularinter.onrender.com/api/filter?filterBy=${selectedOption}&offset=${offset}&limit=${limit}`)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, [selectedOption, offset, limit]);

  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);

  function handleNextPage() {
    setOffset(offset + limit);
  }
  function handlePreviousPage() {
    if (offset - limit >= 0) {
      setOffset(offset - limit);
    } else {
      setOffset(0);
    }
  }
  function handleLimitChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setLimit(parseInt(e.target.value));
    setOffset(0);
  }
  function handleOptionChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedOption(e.target.value as "conference" | "webinar" | "meeting");
    setOffset(0);
  }
  
  return (
    <>  
    <Link href="/">
        <button type="button">Назад на главную</button>
    </Link>
    <h1>Мероприятия</h1>
    <label htmlFor="event-select">Тип мероприятия</label>
    <select
        id="event-select"
        name="event-type"
        value={selectedOption}
        onChange={handleOptionChange}>
        <option value="conference">Конференция</option>
        <option value="webinar">Вебинар</option>
        <option value="meeting">Встреча</option>
    </select>
    <p>Выбранный тип мероприятия: {eventNames[selectedOption]}</p>
    <div>
        <label htmlFor="limit-select">Мероприятий на странице:</label>
        <select id="limit-select" value={limit} onChange={handleLimitChange}>
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
        </select>
    </div>
    <Suspense fallback={<p>Загрузка мероприятий...</p>}>
      <EventList events={events} eventNames={eventNames} />
    </Suspense>
    <hr />
    <div>
        <button type="button" onClick={handlePreviousPage}>Предыдущая</button>
        <button type="button" disabled={events.length < limit} onClick={handleNextPage}>Следующая</button>
    </div>
    </>
  );
}