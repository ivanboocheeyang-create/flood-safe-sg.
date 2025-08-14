<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flood Safe SG</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Roboto', sans-serif;
      background: linear-gradient(to bottom right, #e0f7fa, #b2ebf2);
      margin: 0;
      padding: 0;
    }
    header {
      background-color: #00796b;
      color: white;
      padding: 20px;
      text-align: center;
      font-size: 1.8rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .container {
      max-width: 900px;
      margin: 20px auto;
      background: white;
      border-radius: 15px;
      padding: 20px;
      box-shadow: 0 0 20px rgba(0,0,0,0.2);
    }
    section {
      margin-top: 20px;
      padding: 15px;
      background: #f9f9f9;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    h2 { color: #00796b; }
    input, button {
      padding: 8px;
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
    .flood-card {
      padding: 10px;
      margin-bottom: 10px;
      border-left: 5px solid red;
      border-radius: 8px;
      background: #ffebee;
      cursor: pointer;
    }
    ul { max-height: 150px; overflow-y: auto; padding-left: 20px; }
    footer {
      text-align: center;
      padding: 15px;
      background-color: #004d40;
      color: white;
      margin-top: 20px;
      border-radius: 0 0 15px 15px;
    }
  </style>
</head>
<body>
  <header>Flood Safe SG</header>
  <div class="container">
    <section>
      <label>Alert Radius (km): </label>
      <input type="number" id="radius" value="2">
    </section>
    <section>
      <h2>Saved Routes</h2>
      <input type="text" id="newRoute" placeholder="Enter route (e.g., Home to Work)">
      <button id="addRouteBtn">Add Route</button>
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
  </div>
  <footer>
    &copy; 2025 Flood Safe SG. Developed for Singapore residents.
  </footer>
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
      alertsDiv.innerHTML = '';

      if (filtered.length === 0) {
        alertsDiv.innerHTML = 'No floods nearby.';
      } else {
        filtered.forEach(f => {
          const div = document.createElement('div');
          div.className = 'flood-card';
          div.innerHTML = `<strong>${f.severity}</strong> flood at ${f.location} (${f.distance} km away)`;
          div.onclick = () => alert(`Details:\nLocation: ${f.location}\nSeverity: ${f.severity}\nDistance: ${f.distance} km`);
          alertsDiv.appendChild(div);

          if (document.getElementById('voiceAlerts').checked) {
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
        li.onclick = () => alert(`Route Details: ${value}`);
        list.appendChild(li);
      }
    }

    document.getElementById('radius').addEventListener('input', updateFloodAlerts);
    document.getElementById('voiceAlerts').addEventListener('change', updateFloodAlerts);
    document.getElementById('addRouteBtn').addEventListener('click', addRoute);

    updateFloodAlerts();
  </script>
</body>
</html>
