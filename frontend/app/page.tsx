"use client";

import { useEffect, useState } from "react";

type Event = {
  id: number;
  name: string;
  type: "conference" | "webinar" | "meeting";
};

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<
    "conference" | "webinar" | "meeting"
  >("conference");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [events, setEvents] = useState<Event[]>([]);

  const eventNames = {
    conference: "Конференция",
    webinar: "Вебинар",
    meeting: "Встреча",
  };

  useEffect(() => {
    fetch(`http://localhost:3001/api/filter?filterBy=${selectedOption}&offset=${offset}&limit=${limit}`)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, [selectedOption, offset, limit]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    fetch("http://localhost:3001/api/submit", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert(data.message);
      })
      .catch((error) => {
        console.error(error);
        alert("Произошла ошибка при отправке формы.");
      });
  }

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
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Первое задание</h1>

        <div>
          <h2>Название мероприятия</h2>

          <input
            type="text"
            name="event-name"
            placeholder="Введите название мероприятия"
          />
        </div>

        <div>
          <label htmlFor="event-select">Тип мероприятия</label>

          <select
            id="event-select"
            name="event-type"
            value={selectedOption}
            onChange={(e) =>
              setSelectedOption(
                e.target.value as "conference" | "webinar" | "meeting"
              )
            }
          >
            <option value="conference">Конференция</option>
            <option value="webinar">Вебинар</option>
            <option value="meeting">Встреча</option>
          </select>

          <p>
            Выбранный тип мероприятия: {eventNames[selectedOption]}
          </p>
        </div>
        <div>
          <label htmlFor="limit-select">Мероприятий на странице:</label>
          <select 
            id="limit-select"
            value={limit} 
            onChange={handleLimitChange}
          >
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <button type="submit">Отправить</button>
      </form>

      <hr />

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
      <div>
        <button type="button" onClick={handlePreviousPage}>Предыдущая</button>
        <button type="button" disabled={events.length < limit} onClick={handleNextPage}>Следующая</button>
      </div>
    </>
  );
}