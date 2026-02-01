import { useState, useEffect } from "react";
import "./TimeZone.css"

const TimeZone = () => {
  const [times, setTimes] = useState({});

  const timeZones = [
    { name: "IST", zone: "Asia/Kolkata" },
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
        TimeZone
      </h2>
      <div className="clocks-grid">
        {timeZones.map(
          (
            { name, zone }, // Use name as key, not zone
          ) => (
            <div key={name} className="clock">
              <p className="zone">{zone}</p>
              <p className="times">{times[name]}</p>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default TimeZone;
