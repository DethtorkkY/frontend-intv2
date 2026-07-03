"use client";
//import Image from "next/image";
//import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<"conference" | "webinar" | "meeting">("conference");
  const eventNames = {
    conference: "Конференция",
    webinar: "Вебинар",
    meeting: "Встреча",
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    fetch("http://localhost:3001/api/submit", {
      method: "POST",
      body: formData,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Первое задание</h1>
      <div>
        <h2>Название мероприятия</h2>
        <input type="text" name="event-name" placeholder="Введите название мероприятия" />
      </div>
      <div>
        <label htmlFor="event-select">Тип мероприятия</label>
        <select id="event-select" name="event-type" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value as "conference" | "webinar" | "meeting") }>
          <option value="conference">Конференция</option>
          <option value="webinar">Вебинар</option>
          <option value="meeting">Встреча</option>
        </select>
        <p>Выбранный тип мероприятия: {eventNames[selectedOption]}</p>
      </div>
      <button type="submit">Отправить</button>
    </form>
  );
}