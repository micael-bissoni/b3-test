---
trigger: always_on
---

# 🤖 AI Usage & Security Rules

This document outlines the mandatory security protocols for developers (Frontend & Backend) when using AI Agents or LLMs for code generation, refactoring, and architectural decisions.

---

## 🛡️ Core Principles
1. **Human Oversight:** All AI-generated code is "untrusted" by default. It must undergo a manual peer review.
2. **Data Sovereignty:** Never input PII (Personally Identifiable Information), internal credentials, or proprietary secrets into AI prompts.
3. **Zero Trust Output:** Treat AI suggestions as user-provided input. Validate everything.

---

## 🏗️ Backend Security Standards

### 1. Data Integrity & Injection
* **Parameterized Queries:** AI-generated SQL/NoSQL must use parameterization. Never allow string concatenation for queries.
* **Input Validation:** Rigorously validate the schema, type, and length of any data processed or suggested by an AI agent.
* **Sensitive Data Exposure:** NEVER return user passwords or other sensitive credentials in API responses. In Backend entities (e.g., `User`), always use `@JsonIgnore` or similar mechanisms (e.g., separate DTOs) to exclude the password field from serialization.

### 2. Access Control
* **The Principle of Least Privilege:** AI agents operating via CLI or API must have restricted, read-only permissions where possible. Never grant `sudo` or `DB_OWNER` roles.
* **Auth Verification:** Manually audit AI-written middleware for **Broken Object Level Authorization (BOLA)**.

### 3. Dependency Management
* **Vetting Libraries:** Verify that all libraries suggested by AI exist and are reputable. Beware of **AI Package Hallucination** attacks where malicious actors register "hallucinated" package names.

---

## 🎨 Frontend Security Standards

### 1. XSS & Injection Prevention
* **Sanitization:** Ensure AI-generated components properly escape data. Avoid `dangerouslySetInnerHTML` or similar methods without a strict sanitization layer (e.g., DOMPurify).
* **Content Security Policy (CSP):** Ensure AI-generated scripts or styles comply with our existing CSP.

### 2. Secret Exposure
* **Build-Time Safety:** Never allow AI to hardcode API keys or sensitive URLs into client-side code. Use `process.env` or equivalent build-time variables.

### 3. Session & State Management
* **Secure Storage:** Verify that AI doesn't suggest storing sensitive tokens in `localStorage`. Use `HttpOnly` cookies or secure state management patterns.

---

## 🛠️ Developer Checklist

- [ ] **Secrets:** Have I removed all API keys and passwords from the prompt?
- [ ] **Review:** Has a human reviewed the logic for edge cases and security flaws?
- [ ] **Dependencies:** Are all suggested NPM/PyPI/Cargo packages real and safe?
- [ ] **Tests:** Does the AI-generated code have corresponding unit tests?
- [ ] **Bias/Logic:** Did the AI introduce any "hallucinated" business logic?

---

> **Warning:** Failure to comply with these rules may result in security vulnerabilities and violates our internal security policy. Use AI as a co-pilot, not an autopilot.