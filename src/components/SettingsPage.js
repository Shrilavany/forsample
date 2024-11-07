import React, { useState } from "react";
import "./SettingsPage.css";

// Styles can be added with CSS or styled-components for a cleaner layout
const SettingsPage = () => {
  // Step 1: Temperature and Humidity Thresholds
  const [temperatureThreshold, setTemperatureThreshold] = useState(25);
  const [humidityThreshold, setHumidityThreshold] = useState(60);

  // Step 2: Operational Modes
  const [mode, setMode] = useState("Automatic");
  const [emergencyOverride, setEmergencyOverride] = useState(false);

  // Step 3: Notification Settings
  const [alertEnabled, setAlertEnabled] = useState(true);
  const [alertFrequency, setAlertFrequency] = useState("immediate");
  const [alertChannels, setAlertChannels] = useState({
    email: true,
    sms: false,
  });

  // Step 4: Scheduling Options
  const [operationSchedule, setOperationSchedule] = useState("09:00 - 17:00");
  const [maintenanceSchedule, setMaintenanceSchedule] = useState("Monthly");

  // Step 5: Data Logging and Reports
  const [dataLoggingEnabled, setDataLoggingEnabled] = useState(true);
  const [reportFrequency, setReportFrequency] = useState("weekly");

  // Step 6: Security and Access Control
  const [sessionTimeout, setSessionTimeout] = useState(30);

  // Step 7: Chatbot Behavior Settings
  const [chatbotLanguage, setChatbotLanguage] = useState("English");
  const [chatbotTone, setChatbotTone] = useState("Formal");

  // Step 8: Diagnostic and Troubleshooting Tools
  const [diagnosticsMode, setDiagnosticsMode] = useState(false);

  // Step 9: Energy Efficiency Settings
  const [energySavingMode, setEnergySavingMode] = useState(true);
  const [efficiencyTarget, setEfficiencyTarget] = useState(80);

  // Step 10: Environment Integration
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = () => {
    // Handle save settings to backend
    const settings = {
      temperatureThreshold,
      humidityThreshold,
      mode,
      emergencyOverride,
      alertEnabled,
      alertFrequency,
      alertChannels,
      operationSchedule,
      maintenanceSchedule,
      dataLoggingEnabled,
      reportFrequency,
      sessionTimeout,
      chatbotLanguage,
      chatbotTone,
      diagnosticsMode,
      energySavingMode,
      efficiencyTarget,
      apiKey,
    };
    console.log("Settings saved:", settings);
  };

  return (
    <div className="settings-page">
      <h1>Cooling Tower Automation Settings</h1>

      {/* Temperature and Humidity Thresholds */}
      <section>
        <h2>Temperature and Humidity Thresholds</h2>
        <label>
          Temperature Threshold:
          <input
            type="number"
            value={temperatureThreshold}
            onChange={(e) => setTemperatureThreshold(e.target.value)}
          />
        </label>
        <label>
          Humidity Threshold:
          <input
            type="number"
            value={humidityThreshold}
            onChange={(e) => setHumidityThreshold(e.target.value)}
          />
        </label>
      </section>

      {/* Operational Modes */}
      <section>
        <h2>Operational Modes</h2>
        <label>
          Mode:
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </label>
        <label>
          Emergency Override:
          <input
            type="checkbox"
            checked={emergencyOverride}
            onChange={(e) => setEmergencyOverride(e.target.checked)}
          />
        </label>
      </section>

      {/* Notification Settings */}
      <section>
        <h2>Notification Settings</h2>
        <label>
          Enable Alerts:
          <input
            type="checkbox"
            checked={alertEnabled}
            onChange={(e) => setAlertEnabled(e.target.checked)}
          />
        </label>
        <label>
          Alert Frequency:
          <select
            value={alertFrequency}
            onChange={(e) => setAlertFrequency(e.target.value)}
          >
            <option value="immediate">Immediate</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
          </select>
        </label>
        <label>
          Alert Channels:
          <div>
            <label>
              Email:
              <input
                type="checkbox"
                checked={alertChannels.email}
                onChange={(e) =>
                  setAlertChannels({
                    ...alertChannels,
                    email: e.target.checked,
                  })
                }
              />
            </label>
            <label>
              SMS:
              <input
                type="checkbox"
                checked={alertChannels.sms}
                onChange={(e) =>
                  setAlertChannels({ ...alertChannels, sms: e.target.checked })
                }
              />
            </label>
          </div>
        </label>
      </section>

      {/* Scheduling Options */}
      <section>
        <h2>Scheduling Options</h2>
        <label>
          Operation Schedule:
          <input
            type="text"
            value={operationSchedule}
            onChange={(e) => setOperationSchedule(e.target.value)}
          />
        </label>
        <label>
          Maintenance Schedule:
          <input
            type="text"
            value={maintenanceSchedule}
            onChange={(e) => setMaintenanceSchedule(e.target.value)}
          />
        </label>
      </section>

      {/* Data Logging and Reports */}
      <section>
        <h2>Data Logging and Reports</h2>
        <label>
          Enable Data Logging:
          <input
            type="checkbox"
            checked={dataLoggingEnabled}
            onChange={(e) => setDataLoggingEnabled(e.target.checked)}
          />
        </label>
        <label>
          Report Frequency:
          <select
            value={reportFrequency}
            onChange={(e) => setReportFrequency(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
      </section>

      {/* Security and Access Control */}
      <section>
        <h2>Security and Access Control</h2>
        <label>
          Session Timeout (minutes):
          <input
            type="number"
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(e.target.value)}
          />
        </label>
      </section>

      {/* Chatbot Behavior Settings */}
      <section>
        <h2>Chatbot Behavior Settings</h2>
        <label>
          Chatbot Language:
          <input
            type="text"
            value={chatbotLanguage}
            onChange={(e) => setChatbotLanguage(e.target.value)}
          />
        </label>
        <label>
          Chatbot Tone:
          <select
            value={chatbotTone}
            onChange={(e) => setChatbotTone(e.target.value)}
          >
            <option value="Formal">Formal</option>
            <option value="Friendly">Friendly</option>
          </select>
        </label>
      </section>

      {/* Diagnostic and Troubleshooting Tools */}
      <section>
        <h2>Diagnostic and Troubleshooting Tools</h2>
        <label>
          Diagnostics Mode:
          <input
            type="checkbox"
            checked={diagnosticsMode}
            onChange={(e) => setDiagnosticsMode(e.target.checked)}
          />
        </label>
      </section>

      {/* Energy Efficiency Settings */}
      <section>
        <h2>Energy Efficiency Settings</h2>
        <label>
          Energy Saving Mode:
          <input
            type="checkbox"
            checked={energySavingMode}
            onChange={(e) => setEnergySavingMode(e.target.checked)}
          />
        </label>
        <label>
          Efficiency Target (%):
          <input
            type="number"
            value={efficiencyTarget}
            onChange={(e) => setEfficiencyTarget(e.target.value)}
          />
        </label>
      </section>

      {/* Environment Integration */}
      <section>
        <h2>Environment Integration</h2>
        <label>
          API Key:
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </label>
      </section>

      {/* Submit Button */}
      <button onClick={handleSubmit}>Save Settings</button>
    </div>
  );
};

export default SettingsPage;
