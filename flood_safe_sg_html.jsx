<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flood Safe SG</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(to bottom right, #e0f7fa, #b2ebf2);
      display: flex;
      justify-content: center;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      width: 100%;
      background: white;
      border-radius: 15px;
      padding: 20px;
      box-shadow: 0 0 15px rgba(0,0,0,0.2);
    }
    h1 { text-align: center; color: #00796b; }
    section {
      margin-top: 20px;
      padding: 15px;
      background: #f9f9f9;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .flood-card {
      padding: 10px;
      margin-bottom: 10px;
      border-left: 5px solid red;
      border-radius: 8px;
      background: #ffebee;
    }
    input, select, button {
      padding: 5px;
      border-radius: 5px;
      border: 1px solid #ccc;
      margin-right: 5px;
    }
    button {
      background-color: #00796b;
      color: white;
      border: none;
      cursor: pointer;
    }
    ul { max-height: 150px; overflow-y: auto; padding-left: 20px; }
    .hosting-info {
      margin-top: 30px;
      padding: 15px;
      background: #fff3e0;
      border-radius: 10px;
      border-left: 5px solid #ffa726;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Flood Safe SG</h1>
    <section>
      <label>Alert Radius (km): </label>
      <input type="number" id="radius" value="2">
    </section>
    <section>
      <h2>Saved Routes</h2>
      <input type="text" id="newRoute" placeholder="Enter route (e.g., Home to Work)">
      <button onclick="addRoute()">Add Route</button>
      <ul id="routesList"></ul>
    </section>
    <section>
      <label><input type="checkbox" id="voiceAlerts"> Voice Alerts</label>
    </section>
    <section>
      <h2>Flood Alerts</h2>
      <div id="floodAlerts">No floods nearby.</div>
    </section>
    <section>
      <h2>Flood History</h2>
      <ul id="historyList"></ul>
    </section>
    <section class="hosting-info">
      <h2>Hosting Instructions</h2>
      <ol>
        <li>Use <strong>GitHub Pages</strong>: push this HTML file to a repository and enable GitHub Pages to serve it.</li>
        <li>Use <strong>Netlify or Vercel</strong>: drag-and-drop the HTML file into Netlify dashboard or deploy via Vercel for free hosting.</li>
        <li>Use any standard web hosting: upload the HTML file via FTP or web manager.</li>
      </ol>
      <p>This file is standalone and can be opened locally in a browser, but hosting will allow access from any device with an internet connection.</p>
    </section>
  </div>
  <script>
    const routes = [];
    const history = [];
    const floodEvents = [
      { id: 1, location: 'Orchard Road', distance: 1.2, severity: 'High' },
      { id: 2, location: 'Bukit Timah', distance: 3.5, severity: 'Moderate' },
      { id: 3, location: 'Jurong East', distance: 0.8, severity: 'Low' }
    ];

    function updateFloodAlerts() {
      const radius = Number(document.getElementById('radius').value);
      const filtered = floodEvents.filter(f => f.distance <= radius);
      const alertsDiv = document.getElementById('floodAlerts');
      if (filtered.length === 0) {
        alertsDiv.innerHTML = 'No floods nearby.';
      } else {
        alertsDiv.innerHTML = '';
        filtered.forEach(f => {
          const div = document.createElement('div');
          div.className = 'flood-card';
          div.innerHTML = `<strong>${f.severity}</strong> flood at ${f.location} (${f.distance} km away)`;
          alertsDiv.appendChild(div);

          const voiceCheck = document.getElementById('voiceAlerts').checked;
          if (voiceCheck) {
            const utterance = new SpeechSynthesisUtterance(`${f.location}: ${f.severity} flood alert!`);
            speechSynthesis.speak(utterance);
          }

          history.unshift({ ...f, date: new Date().toLocaleTimeString() });
          if (history.length > 10) history.pop();
        });
        updateHistory();
      }
    }

    function updateHistory() {
      const list = document.getElementById('historyList');
      list.innerHTML = '';
      history.forEach(h => {
        const li = document.createElement('li');
        li.textContent = `${h.date} — ${h.location} (${h.severity})`;
        list.appendChild(li);
      });
    }

    function addRoute() {
      const input = document.getElementById('newRoute');
      const value = input.value.trim();
      if (value) {
        routes.push(value);
        input.value = '';
        const list = document.getElementById('routesList');
        const li = document.createElement('li');
        li.textContent = value;
        list.appendChild(li);
      }
    }

    document.getElementById('radius').addEventListener('input', updateFloodAlerts);
    document.getElementById('voiceAlerts').addEventListener('change', updateFloodAlerts);

    updateFloodAlerts();
  </script>
</body>
</html>
