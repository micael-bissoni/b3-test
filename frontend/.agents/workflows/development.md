---
description: Standardized Development Workflow using Gitflow, TDD, and Gitmoji
---

# 🚀 Standard Development Workflow

This workflow ensures consistency, code quality, and a clear history using Gitflow and Gitmoji. Follow these steps for every task.

## 1. 🌿 Branch Preparation (Gitflow)

Before starting any work, ensure you are on the latest state of the base branch (usually `main` or `develop`).

1. **Switch to base branch**: `git checkout main`
2. **Pull latest**: `git pull origin main`
3. **Create a new branch**: If the prompt contains a feature ID or bug number, automatically create a new branch using a descriptive prefix and kebab-case.
   - **Features**: `feature/issueID_short-description` (e.g., `feature/1_login-google-auth`)
   - **Bugfixes**: `bugfix/issueID_issue-description` (e.g., `bugfix/2_fix-header-overlap`)
   - **Hotfixes**: `hotfix/issueID_urgent-fix` (e.g., `hotfix/3_security-patch-api`)
   - **Docs**: `docs/issueID_topic-name`
   - **Refactoring**: `refactor/issueID_component-name`

   ```bash
   git checkout -b feature/issueID_your-feature-name
   ```


## 2. 🧪 Development Cycle (TDD & Clean Code)

Follow the Red-Green-Refactor cycle as per our core rules.

1. **Plan & Breakdown**: 📋
   - Before coding, create an **Implementation Plan** artifact.
   - Break the main task into small, atomic sub-tasks (Backend, UI Components, Application Logic).
2. **Red**: Write a failing test for the current small sub-task.
3. **Green**: Write the minimum code necessary to make the test pass.
4. **Refactor**: Clean up the code while keeping tests green.
   - **UI Development**: ⚛️ 
     - Use the `atomic-ui-architect` skill for creating or modifying components.
     - Follow the **"Token First" Rule**: Always use semantic design tokens, never hardcoded values.
     - Leverage existing atoms and molecules before creating new ones.
   - **Backend**: 🏗️ Follow DDD concepts and maintain strict type safety.
   - Ensure no `any` types are used.

## 3. 📝 Commit Changes (Gitmoji)

Commits should be atomic and clearly described. Use Domains as type. Use the following Gitmojis:

- ✨ `:sparkles:` - New feature
- 🐛 `:bug:` - Bugfix
- ♻️ `:recycle:` - Refactoring
- 📝 `:memo:` - Documentation
- ✅ `:white_check_mark:` - Adding/Updating tests
- 🎨 `:art:` - UI/Style changes
- 🚀 `:rocket:` - Deployment/Performance
- 🔒 `:lock:` - Security

**Format**: `<emoji> <type>(<scope>): <short description>`
Example: `✨ feat(auth): add google social login`

```bash
git add .
git commit -m "✨ feat(auth): add google social login"
```

## 4. 📤 Finalization

1. **Verify**: Run the full test suite and build.
   ```bash
   npm test
   npm run build
   ```
2. **Push**:
   ```bash
   git push origin feature/issueID_your-feature-name
   ```
3. **Draft PR**: Create a Pull Request against the base branch for review.