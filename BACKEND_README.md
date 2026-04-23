# ASTU Performance Evaluator Backend Configuration

This document covers the architectural and structural details for the `mongoose` backend logic serving the Employee Performance Evaluation Dashboard.

## Core Models (`/models/`)
- `User.js` - Stores admin, team-leader, and employee identities, roles, and hashed passwords.
- `Task.js` - Tracks individual assignments, weightings out of 100%, and status.
- `Evaluation.js` - Processes the scoring for self, peer, and supervisor evaluations.
- `Team.js` & `Department.js` - Handles organizational grouping.

## Security
- `bcryptjs` is utilized in `User.js` via a `pre-save` hook for secure password management.
- All evaluation APIs perform token-based authentication (NextAuth).

## Notes
- Ensure `.env.local` contains valid `MONGODB_URI` string before running server.
