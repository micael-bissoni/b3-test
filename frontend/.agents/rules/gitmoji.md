---
trigger: always_on
---

# Gitmoji Conventional Commits

We use **Gitmoji** in conjunction with Conventional Commits to make our commit history easy to read, visually recognizable, and automatically parseable for changelog generation.

## Format
Every commit message must follow this structure:

```
<emoji> <type>(<scope>): <subject>
```
* **emoji**: The specific emoji representing the intent of the commit.
* **type**: The standard Conventional Commit type (feat, fix, refactor, etc.).
* **scope**: (Optional) The module or feature area affected (e.g., ui, login, core).
* **subject**: A short, imperative description of the change (e.g., "add email validation").

## Recommended Gitmojis

Below are the most commonly used Gitmojis and their corresponding commit types:

* ✨ `:sparkles:` - `feat`: A new feature
* 🐛 `:bug:` - `fix`: A bug fix
* ♻️ `:recycle:` - `refactor`: A code change that neither fixes a bug nor adds a feature
* 📝 `:memo:` - `docs`: Documentation only changes
* ✅ `:white_check_mark:` - `test`: Adding missing tests or correcting existing tests
* 💄 `:lipstick:` - `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, UI styling)
* 🚀 `:rocket:` - `perf`: A code change that improves performance or deployment
* 🔧 `:wrench:` - `chore`: Changes to the build process, auxiliary tools, or configuration
* 🚧 `:construction:` - `wip`: Work in progress
* 💡 `:bulb:` - `chore`: Add or update comments in source code
* 🔒 `:lock:` - `fix`: Fix security issues
* ⚡️ `:zap:` - `perf`: Improve performance
* 💥 `:boom:` - `feat`: Introduce breaking changes
* 🧑‍💻 `:technologist:` - `dev`: Improve developer experience

## AI Agent Directives
When generating or suggesting commit messages:
1. Always prepend the commit type with the matching gitmoji.
2. Adhere to the `emoji type(scope): message` convention.
3. Example: `✨ feat(auth): add google sign-in` or `🐛 fix(ui): resolve button alignment issue`.
