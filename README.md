# Web-Development - Final Project

Silas Sequeira & Valdemar Armindo : Master in Design and Multimedia FCTUC 2023/2024

This project is a Single Page Web Application called **Art Rush**. It features a React-based front-end powered by Vite and a Node.js/Express backend with MongoDB for the database. The application allows users to browse, save & rate historic european artworks.

## Prerequisites

Make sure you have the following installed on your system before continuing:

- **Node.js** (version 16.x or later) & **npm** (comes with Node.js)
- **MongoDB** (local installation or a cloud database like MongoDB Atlas)

## Setup

1. Unpack zip file locally
2. You'll need to have Node.js installed in your computer - ["https://nodejs.org/en/download/prebuilt-installer"]
3. Using the main terminal in your system write the following commands in order :

   1. cd "TO_THIS_FOLDER_PATH" // for example : cd "C:\Users\silas\Web-Development"
   2. `npm run installserver`
   3. `npm run app`

4. You should now see the SPA running! For more information and development commands :

### Server Side Commands

- Run `npm run installserver` to install backend dependencies

- Run `npm run server` to start the server

- Run `npm run app` to start the built app

### Front-end Side Commands

- Run `npm run installfrontend` to install frontend dependencies

- Run `npm run build` to create a static frontend build of the app

- Run `npm run nodemon` to create a static frontend build every time there is change in the frontend/src file

- Run `npm run frontend` to start the vite app and server

### Project Structure

Web-Development
├── frontend
│ ├── build
│ │ ├── assets
│ │ ├── favicon
│ │ └── images
│ ├── public
│ │ ├── favicon
│ │ ├── images
│ │ └── scripts
│ ├── src
│ │ ├── assets
│ │ ├── components
│ │ ├── pages
│ │ └── services
│ └── vite.config
├── server
│ ├── models
│ └── Routes
├── README.md

### API

- Content related to the paintings was fetched from the public API "[https://metmuseum.github.io/]"
