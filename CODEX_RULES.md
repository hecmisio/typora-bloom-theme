# Codex Project Rules (MUST FOLLOW)

## 0. Prime Directive
- Do NOT create new configuration files or new toolchains.
- Do NOT add new environment variables unless explicitly asked.
- Always reuse existing project structure, configs, tooling.
- If you think you need a new config file, STOP and ask for approval first.

## 1. Read Before Write (Required)
Before making any code change, always inspect:
- package.json scripts and dependencies
- existing configs: tsconfig*, eslint*, prettier*, vite/webpack/next configs
- workspace config if exists: pnpm-workspace.yaml, turbo.json, nx.json
- existing env files: .env*, env.example, config folder

## 2. Allowed Changes
- Only edit existing files unless explicitly told to create a new one.
- New files are allowed ONLY in these folders:
  - src/
  - tests/
  - docs/
- Never create files under:
  - root configs (unless already exist)
  - build tool config
  - CI config
  - lint/format config

## 3. Minimal Diff Policy
- Make the smallest change that meets the requirement.
- Prefer changing existing modules over introducing new abstractions.

## 4. Task Completion Policy
- Don’t "solve" problems by adding new config layers.
- Don’t add new scripts unless asked.
- Don’t add new dependencies unless asked.

## 5. When uncertain
- Ask: “Should I follow the existing build/lint/test pipeline or create new config?”
- Provide the exact file(s) to edit, and why.