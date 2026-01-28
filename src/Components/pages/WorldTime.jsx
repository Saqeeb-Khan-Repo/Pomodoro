import { useState, useEffect } from "react";
import { ClockLoader } from "react-spinners";

const WorldTime = () => {
  const [times, setTimes] = useState({});

  const timeZones = [
    { name: "IST", zone: "Asia/Kolkata" },
    { name: "UTC", zone: "UTC" },
    { name: "EST", zone: "America/New_York" },
    { name: "GMT", zone: "Europe/London" },
    { name: "PST", zone: "America/Los_Angeles" },
    { name: "JST", zone: "Asia/Tokyo" },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const updatedTimes = {};

      timeZones.forEach(({ name, zone }) => {
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: zone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true, // Shows AM/PM
        });
        updatedTimes[name] = formatter.format(now);
      });

      setTimes(updatedTimes);
      // Only set once
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); // Remove console.log

  return (
    <div className="world-clock">
      <h2 style={{ textAlign: "center" }} className="h2">
        World Clock
      </h2>
      <div className="clocks-grid">
        {timeZones.map(
          (
            { name, zone }, // Use name as key, not zone
          ) => (
            <div key={name} className="clock-item">
              <p className="zone-name">{zone}</p>
              <p className="time">{times[name]}</p>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default WorldTime;
