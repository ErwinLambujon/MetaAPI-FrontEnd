import "./App.css"; // Ensure you're importing the CSS file
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [appId, setAppId] = useState("");
  const [appSecret, setAppSecret] = useState("");
  const [userAccessToken, setUserAccessToken] = useState("");
  const [pageId, setPageId] = useState("");
  const [daysAgo, setDaysAgo] = useState(30);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/fetch-messages/",
        {
          app_id: appId,
          app_secret: appSecret,
          user_access_token: userAccessToken,
          page_id: pageId,
          days_ago: daysAgo,
        }
      );

      if (response.data.status === "success") {
        setMessages(response.data.messages);
        setError("");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching messages.");
    }
  };

  return (
    <div className="App">
      <h1>Facebook Graph API -- Retrieving Messages</h1>

      <div>
        <label>App ID: </label>
        <input
          type="text"
          value={appId}
          onChange={(e) => setAppId(e.target.value)}
        />
      </div>

      <div>
        <label>App Secret: </label>
        <input
          type="text"
          value={appSecret}
          onChange={(e) => setAppSecret(e.target.value)}
        />
      </div>

      <div>
        <label>User Access Token: </label>
        <input
          type="text"
          value={userAccessToken}
          onChange={(e) => setUserAccessToken(e.target.value)}
        />
      </div>

      <div>
        <label>Page ID: </label>
        <input
          type="text"
          value={pageId}
          onChange={(e) => setPageId(e.target.value)}
        />
      </div>

      <div>
        <label>Days Ago: </label>
        <input
          type="number"
          value={daysAgo}
          onChange={(e) => setDaysAgo(Number(e.target.value))}
        />
      </div>

      <button onClick={fetchMessages}>Fetch Messages</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {messages.length > 0 ? (
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>
                <p>
                  <strong>Time:</strong> {msg.created_time}
                </p>
                <strong>From:</strong> {msg.from.name} <br />
                <strong>Message:</strong> {msg.message}
              </li>
            ))}
          </ul>
        ) : (
          <p>No messages found</p>
        )}
      </div>
    </div>
  );
}

export default App;
