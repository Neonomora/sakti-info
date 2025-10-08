'use client';

import { useState } from "react";

export default function Togle({event, ann}) {
  const [active, setActive] = useState("event");

  const buttonStyle = (page) =>
    `${active === page ? "border-b-2 border-black" : ""}`;

  return (
    <>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setActive("event")}
          className={buttonStyle("event")}
        >
          Tasks
        </button>
        <button onClick={() => setActive("ann")} className={buttonStyle("ann")}>
          Announcements
        </button>
      </div>
      {active === "event" && event}
      {active === "ann" && ann}
    </>
  );
}
