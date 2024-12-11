# Teammify

This is an Atlassian Forge app that helps teams align their work to organizational goals, track progress, and enable seamless knowledge sharing across the organization.

## Features

1. **Goal Alignment**:
   - Users (team members or managers) can create, edit, and track goals.
   - Align individual/team goals with larger organizational objectives.
   - Visualize progress through charts or Kanban boards.
   - Send reminders or notifications about pending/achieved goals.

2. **Knowledge Flow**:
   - A centralized repository for storing, searching, and categorizing knowledge (documents, FAQs, insights).
   - Teams can share knowledge across departments or within projects.
   - Tagging and AI-powered search for ease of finding relevant data.

3. **Jira Integration**:
   - Allow teams to link Jira issues with app goals.
   - Sync progress between Jira issues and app goals.
   - Provide a Jira-powered dashboard for goal tracking.

## User Roles

1. **Admins**: Manage goals, assign access, & oversee knowledge repositories.
2. **Team Members**: Create/track personal goals and access knowledge bases.

## Tech Stack

- **Frontend**: Forge UI Kit, React 
- **Backend**: Forge Resolvers, Node.js
- **Storage**: Forge Storage API
- **Integration**: Atlassian REST APIs - Jira
- **Design System**: Atlassian Design System (Atlaskit)
- **Authentication**: Forge Authentication
- **AI Features**: Forge AI Rovo integration

## Prerequisites

1. Node.js (version 16 or higher)
2. npm (Node Package Manager)
3. Forge CLI installed globally
4. Atlassian Developer Account
5. Access to a Jira instance (e.g., Jira Cloud)
6. Visual Studio Code (or your preferred IDE)
7. Git for version control

## Project Setup

1. **Set Up Your Environment**:
   - Install Node.js and npm.
   - Install Forge CLI: `npm install -g @forge/cli`.
   - Log in to Atlassian: `forge login`.

2. **Initialize the Project**:
   - Create a new Forge app: `forge create team-alignment-app`.
   - Navigate to the project folder: `cd team-alignment-app`.

3. **Edit `manifest.yml`**:
   - Add required permissions (e.g., `read:jira-work`, `write:jira-work`, `storage:app`).
   - Define modules for UI (like a custom Jira page).

4. **Install Dependencies**:
   - Add essential packages: `npm install @forge/ui @forge/resolver`.

5. **Set Up APIs**:
   - Use Atlassian REST API to fetch Jira data.
   - Generate API tokens if needed.

6. **Develop Features**:
   - Create UI components, resolvers, and storage functions.

7. **Deploy and Test**:
   - Deploy the app: `forge deploy`.
   - Install the app on your Jira instance: `forge install`.
