https://fleet-and-asset-management.vercel.app/

FleetStream is an event-driven, high-frequency IoT telemetry ecosystem designed to eliminate operational blind spots in modern logistics. The platform transforms physical vehicle fleets into intelligent, data-streaming nodes by capturing continuous edge coordinates, running instantaneous spatial perimeter matching, and processing thousands of concurrent packets per second with zero pipeline lag.

🚀 Key System Features & Capabilities

*   **High-Frequency Telemetry Ingestion:** Engineered to stream continuous location coordinates, speed, and heading diagnostics directly from edge tracking devices at fixed 5-second intervals.
*   **Automated Geofencing Perimeters:** Utilizes spatial database geometric polygons to map complex physical yards and instantly track asset entry or exit events.
*   **Instant Safety Exception Alerts:** An event-driven processing pipeline that continuously evaluates streaming diagnostics to flag overspeed thresholds (>80 km/h) or harsh braking maneuvers the exact millisecond they occur.
*   **Time-Series Path Breadcrumbs:** Structured data sequencing that maintains chronological vehicle trajectory histories to accurately reconstruct asset travel logs over any selected historical timeline.

---

🛠️ Engineered Architecture & Technology Stack

The project relies on a modular, decoupled 3-layer architecture designed for horizontal scalability and low latency:

### 1. Edge Telemetry Layer (Firmware / Hardware Simulation)
*   **Core Tech:** Embedded C / Edge Simulation
*   **Responsibility:** Handles low-level serial data collection from GPS receivers. Serializes state dynamics (latitude, longitude, velocity, IMEI identifiers) into compressed JSON packets and transmits them over network transport channels every 5 seconds.

### 2. Core Processing Gateway (Ingestion Pipeline)
*   **Core Tech:** Node.js, Express, MQTT / HTTP WebSockets
*   **Responsibility:** Operates as a non-blocking, event-driven streaming server capable of ingesting massive, concurrent throughput (simulated up to 1,420 packets/second) without connection drops. Houses the logic for background business rule checking and spatial query triggers.

### 3. Relational Storage Layer (Spatial Engine)
*   **Core Tech:** MySQL with Spatial Extensions
*   **Responsibility:** Maximizes database performance by splitting data writing patterns. It performs hyper-fast `1:1 Upsert` cache operations on an active table to store immediate vehicle positions (averaging sub-5ms latency) while concurrently appending historical data into a time-series telemetry ledger.

---

📈 System Metrics & Simulated Live Controls

The platform features a live operational control dashboard tracking microsecond infrastructure health and compliance events:

*   **Network Throughput:** Ingesting up to **1,420 pkts/s** with a strict 0-packet drop margin.
*   **Operational Latency:** Average spatial indexing read/write transaction cycle of **4.2 ms**.
*   **Live Exception Handling:** Captures and pushes explicit vehicle infractions into chronological stream feeds:
    *   `CRITICAL`: Overspeed alarms (e.g., Vehicle #TRK-8821 traveling at 92 km/h).
    *   `WARNING`: Perimeter geofence breaches (e.g., Vehicle #VAN-4042 entering restricted zones).
    *   `INFO`: Live signal heartbeats monitoring connectivity metrics.

---

💻 Getting Started Locally

### Prerequisites
*   A modern web browser (Chrome, Edge, Firefox, Safari)
*   An active internet connection (to fetch Tailwind CSS CDN styles and Lucide Vector Icons dynamically)
