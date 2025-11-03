"use client";

import { useEffect, useState } from "react";

const CurrentDate = () => {
  const [date, setDate] = useState("");
  

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "Europe/Berlin",
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDate(formatted);
  }, []); 

  return <div className="text-white text-xl">{date}</div>;
};

export default CurrentDate;