"use client";
import { createContext, useState, useContext, ReactNode } from "react";

type EventContextType = {
  selectedOption: "conference" | "webinar" | "meeting";
  setSelectedOption: (type: "conference" | "webinar" | "meeting") => void;
};

export const EventContext = createContext<EventContextType>({
  selectedOption: "conference",
  setSelectedOption: () => {},
});

type EventProviderProps = {
  children: ReactNode;
};

export function EventProvider({ children }: EventProviderProps) {
  const [selectedOption, setSelectedOption] = useState<
    "conference" | "webinar" | "meeting"
  >("conference");

  const value = {
    selectedOption,
    setSelectedOption,
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
}