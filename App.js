import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.on("receiveAlert", (data) => {
      setAlerts((prev) => [...prev, data]);
    });
  }, []);

  const sendAlert = () => {
    const alertMessage = "Emergency Alert: Flood detected in XYZ area!";
    socket.emit("sendAlert", alertMessage);
  };

  return (
    <div>
      <h1>Disaster Management System</h1>
      <button onClick={sendAlert}>Send Alert</button>
      <h2>Alerts:</h2>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>{alert}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
