// reportWebVitals.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);
  // Wysyłanie metryki do zewnętrznego narzędzia analitycznego
  fetch("/analytics", { method: "POST", body });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
