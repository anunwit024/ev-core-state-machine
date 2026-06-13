# EV Core State Machine Engine (Tech-Agnostic Core)

A lightweight, high-reliability State Machine Engine designed for Electric Vehicle (EV) core controllers. This project demonstrates deterministic state management and critical safety interlocking systems without environment dependencies (Tech-Agnostic Design).

## 🚀 Key Features & Safety Interlocks
- **Deterministic FSM:** Strict state transitions between `PARKED`, `DRIVING`, and `CHARGING`.
- **Anti-Lock Braking Safety:** Prevents shifting from `DRIVING` to `PARKED` if the vehicle speed is greater than 0 km/h.
- **High-Voltage Protection:** Restricts `UNPLUG` actions during active high-voltage charging states until the battery hits 100%.
- **Autonomous Transitions:** Automatically switches to a safe `PARKED` state once the charging cycle is fully completed.

## 🏗️ Architecture Note
This logic is designed under the **Tech-Agnostic** principle. The core state-machine logic can be seamlessly ported into **Node.js backends**, **React UI state controllers**, or **Embedded C/C++ firmware** without changing the business logic structure.