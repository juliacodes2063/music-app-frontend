# 🎵 Music Tracks Frontend

This is the frontend part of a music management app where users can browse, edit, and manage their music tracks, genres, and tags. The app is fully responsive and supports full CRUD functionality.

## 🚀 Features

- View, create, edit and delete music tracks
- Genre and tag management
- Filter and search functionality
- Responsive UI
- State management with Redux Toolkit
- Server communication using **RTK Query**
- Intelligent column-based search (with debounce)
- Track file upload and deletion
- Track metadata editing

## 🛠 Tech Stack

- React
- Redux Toolkit + RTK Query
- Vite
- Framer Motion 
- Tailwind
- Tanstack/react-table

## 📦 Install & Run

```bash
npm install
npm run dev


Make sure the backend is running as well.

📂📂 Folder Structure

/src/api — Base API config (e.g. base URL)

/src/assets — Static assets

/src/components — Reusable UI components

common — shared elements like buttons, loader, modal, table

FormModels — form element and forms config

TracksTable, TrackFileUploader, etc. — domain-specific components

/src/hooks — Custom React hooks

/src/pages — Main page components 

/src/store — Redux slices and RTK Query API setup

/src/types — TypeScript interfaces and enums

/src/utils — Utility functions

[🔗 Backend (See the backend repo)](https://github.com/juliacodes2063/music-app-backend)


[🔗 Demo](https://music-app-frontend-gilt.vercel.app/tracks)




