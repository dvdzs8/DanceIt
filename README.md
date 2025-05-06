# Description

A website that you upload a video to which plays it back and provides special controls like:

- [ ]  mirroring
- [ ]  custom speed presets and increases
- [ ]  custom skipping amounts (ie. forwards by 2.7 seconds)
- [ ]  cookies to save setting presets, notes, and the uploaded video
- [ ]  auto start (works for section or full video loops)
- [ ]  countdowns
    - toggle to be: off, start beginning of video, start beginning of loop
- [ ]  looping sections
    - click start loop or end loop while paused at that time. playbar is marked/colored
    - if end is before start, make the video loop
- [ ]  timestamped notes that play in big font while you dance able to be edited and deleted
    - [ ]  while playing: notes fade in on the side with big font and a countdown to their timestamp. you can toggle this option
    - [ ]  while paused: notes are displayed in smaller-font list with their clickable timestamps
    - the main pro of danceit (helps long term dance projects like ballet)

![IMG_4178.jpeg](attachment:b330b2ae-2dae-4128-b73c-6a250f5905b3:a7efd6b6-faf6-4c5a-999b-ab5fcbaad9ef.png)

Correction: Video player in top left corner, controls at small bar on bottom, notes on the left

# Stretch Goals

- [ ]  resizable video size, preferably by user dragging the corner
- [ ]  video zoom in or crop
- [ ]  export button get a video with the note pop ups included
- [ ]  accepts youtube URLs without playing ads every time a setting is changed…
- [ ]  multiple video projects open at once
- [ ]  toggle webcam display to act like an actual mirror
- [ ]  youtube extension version in the future?
    - [ ]  all features included with the notes as well
- [ ]  justdance mode where use edge detection to evaluate dance accuracy
- [ ]  promote danceit
    - [ ]  karina’s dance team
    - [ ]  pitt: fresa, dance clubs
    - [ ]  other dancer friends: patrick upton

# Commands for Development
to create a new project: 
$ npm create vite@latest nameOfProject
$ cd nameOfProject
$ npm install

to run:
$ npm run dev

to build for production:
$ npm build
or something like that

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
