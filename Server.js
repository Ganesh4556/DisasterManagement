const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("sendAlert", (data) => {
    io.emit("receiveAlert", data);
  });
});

app.get("/", (req, res) => res.send("Disaster Management API Running"));

server.listen(5000, () => console.log("Server running on port 5000"));
Create .env File
MONGO_URI=mongodb://localhost:27017/disaster-management
PORT=5000
Run Backend
nodemon server.js
3. Frontend (React)
Setup React
cd ..
npx create-react-app frontend
cd frontend
npm install axios socket.io-client react-router-dom
Modify src/App.js
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