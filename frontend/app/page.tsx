"use client";

import Link from "next/link";
import { useEvent } from "./contexts/EventContext";
import { useEffect } from "react";

export default function Home() {
  const { selectedOption, setSelectedOption } = useEvent();

  const eventNames = {
    conference: "Конференция",
    webinar: "Вебинар",
    meeting: "Встреча",
  };

  useEffect(() => {
    console.log("Home:", selectedOption);
  }, [selectedOption]);

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
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Название мероприятия</h1>

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
              setSelectedOption(e.target.value as "conference" | "webinar" | "meeting")}>
            <option value="conference">Конференция</option>
            <option value="webinar">Вебинар</option>
            <option value="meeting">Встреча</option>
          </select>
          <p>
            Выбранный тип мероприятия: {eventNames[selectedOption]}
          </p>
        </div>
        <button type="submit">Отправить</button>
        <br />
        <Link href="/events">
          <button type="button">Перейти к мероприятиям</button>
        </Link>
      </form>
    </>
  );
}