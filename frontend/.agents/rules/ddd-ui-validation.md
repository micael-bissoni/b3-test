# 🏢 DDD and UI Validation Rules

> **Lead's Note:** Architecture and consistency are paramount. Every new feature or fix must be preceded by a strict business domain definition and UI component validation phase.

---

## 🎯 Mandatory Pre-Development Validation

Before beginning any development task, you **MUST ALWAYS** follow these steps in order:

### 1. Define the Business Domain (DDD)
* **Action:** Identify and explicitly state which business domain (DDD) the new development belongs to.
* **Why:** This ensures clear boundaries and prevents cross-domain coupling in our architecture.

### 2. UI Component Availability Check
* **Action:** Review the desired UI for the feature and verify if **ALL** required interactive/visual components already exist in `frontend/libs/ui`.
* **Requirement:** Native HTML tags (such as `<div>`, `<span>`, `<p>`, `<header>`, `<section>`) are permitted directly in application code for structure and layout. NEVER create simple new components just to wrap basic HTML tags. Only create specialized components using Atomic Design principles when needed.

### 3. Component Creation Phase
* **Trigger:** If any required UI components do **not** exist in `frontend/libs/ui`.
* **Action:** You **MUST** call the appropriate `.agents/skills` to create these missing components **BEFORE** making any changes to files in the `frontend` or `backend` folders.
* **Why:** This enforces the Atomic Design methodology and ensures that apps only consume polished, tested components.

---

## 🚫 Strict Anti-Patterns

* **NEVER** create new components just to wrap basic HTML tags (like a `<pharma-box>` to wrap a `<div>` or `<pharma-text>` for a `<p>`). Use native HTML layout tags directly in the applications for structure as needed.
* **ALWAYS** create components using the Atomic Design methodology *only* when a specific, semantic, or interactive UI element is required (e.g., buttons, inputs, modals). Consume these from `frontend/libs/ui`.
* **NEVER** start writing backend logic or frontend application logic before the UI components are fully implemented and available in the UI library.
* **WITHIN THE UI LIBRARY:** When creating higher-level components like Organisms or Templates, you **MUST** replace raw HTML tags (like `<button>`, `<input>`, `<h1>`) with lower-level atomic components (like `<pharma-button>`, `<pharma-input>`, `<pharma-heading>`) whenever possible. Native HTML is allowed *only* for structural layout purposes (e.g., `<div>`, `<ul>`).
