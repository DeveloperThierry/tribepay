# TribePay 💸

**TribePay** is a minimal and simple application designed for managing shared digital services (Netflix, Spotify, Costco) within roommates and families. 


## Description and Purpose
Managing shared subscriptions is a common pain point. TribePay provides immediate value by serving as a **single source of truth** for who owns a service, what it costs, and who has contributed their share for the month. By centralizing this information, the app eliminates the confusion and administrative overhead often associated with split billing.

## Inspiration
Shared digital services are ubiquitous, but tracking them is often messy, relying on group texts or complicated spreadsheets. Inspired by a need for a "no-nonsense" tracker, TribePay focuses on simplicity and ease of use, avoiding "annoying auth" and over-engineered features to ensure the tribe stays organized without the friction.

## Features
- ✅ **Dashboard View**: View all active tribe services and their total monthly costs in one central location.
- ✅ **Add Shared Service**: A simple form to add new subscriptions like Netflix or Spotify to the tribe's tracker.
- ✅ **Service Management**: A dedicated details page for each service to manage ownership and total costs.
- ✅ **Add Contributor**: Easily link tribe members to specific services they share.
- ✅ **Payment Toggle**: A same-page interaction that allows owners to mark a member's share as "Paid" or "Unpaid" instantly.
- ✅ **Delete Service**: Remove services from the dashboard when they are no longer being shared by the tribe.

## Tech Stack
- **Frontend**: React with dynamic routing via React Router.
- **Backend**: Express.js server providing a RESTful API.
- **Database**: PostgreSQL with structured one-to-many and many-to-many relationships.
- **Styling**: Minimalist design utilizing a single global CSS file for simplicity.
