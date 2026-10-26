
import { useEffect, useState } from "react";

const weddingDate = new Date("2026-11-30T00:00:00+05:30");

function getTimeRemaining() {
  const difference = Math.max(
    0,
    weddingDate.getTime() - Date.now()
  );

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function WeddingCountdown() {
  const [time, setTime] = useState(getTimeRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "DAYS", value: time.days },
    { label: "HOURS", value: time.hours },
    { label: "MINUTES", value: time.minutes },
    { label: "SECONDS", value: time.seconds },
  ];

  return (
    <div className="wedding-countdown">
      {units.map((unit) => (
        <div className="countdown-box" key={unit.label}>
          <span className="countdown-number">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="countdown-label">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
