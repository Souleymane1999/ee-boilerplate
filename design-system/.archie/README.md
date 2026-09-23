# .archie

This directory contains Archie's configuration and project context.

## Contents

| Path | Tracked | Purpose |
|------|---------|---------|
| `app.yaml` | Yes | **Runtime manifest** — defines how Archie installs, starts, and manages this app (port, commands, processes). This is the main configuration contract. |
| `spec/` | Yes | **Living specification** — project documentation that Archie references when working on tasks. Edit these to guide AI behavior. |
| `skills/` | Yes | **Team conventions & playbooks** — reusable instructions (e.g. "how we write tests", "deploy checklist") that Archie follows. |
| `logs/` | No | Runtime process output logs (git-ignored). |
| `pids/` | No | Process ID files for lifecycle management (git-ignored). |
| `videos/` | No | Demo recordings and walkthroughs (git-ignored). |
| `context-files/` | No | Temporary read-only copies of uploaded files for agent context (git-ignored). |

## How it works

- **`app.yaml`** is the only required file. It tells Archie how to run your project locally.
- **`spec/`** and **`skills/`** are optional but help Archie make better decisions when working on your code.
- **`logs/`**, **`pids/`**, **`videos/`**, and **`context-files/`** are runtime-only and excluded from version control.

## Learn more

See the Archie documentation for details on manifest format, spec authoring, and skills.
