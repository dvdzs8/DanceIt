# Description
A fun project idea I had. Massively a WIP. A website that you upload a video to which plays it back and provides special controls like:
- [ ]  mirroring
- [x]  custom speed presets and increases
- [x]  custom skipping amounts (ie. forwards by 2.7 seconds)
- [ ]  cookies to save setting presets, notes, and the uploaded video
- [ ]  auto video restarting that works for section and full video loops
- [ ]  countdowns
    - pptions: off, start beginning of video, start beginning of loop
- [ ]  looping sections
    - click start loop or end loop while paused at that time. playbar is marked/colored
    - if end is before start, make the video loop
- [ ]  timestamped notes that play in big font while you dance able to be edited and deleted
    - [ ]  while playing: notes fade in on the side with big font and a countdown to their timestamp. you can toggle this option
    - [ ]  while paused: notes are displayed in smaller-font list with their clickable timestamps
    - the main pro of danceit (helps long term dance projects like ballet)
    - if full screen, maybe have a toggle notes to pop up over the screen?

![image](https://github.com/user-attachments/assets/f72294cb-c260-4565-91f8-e2c30a77daa5)
Correction: Volume and fullscreen are first-line controls but on left and right respectively
![image](https://github.com/user-attachments/assets/6638b0ab-bad1-4ec1-b967-e6d097abedc9)
Correction: Video player in top left corner, controls at small bar on bottom, notes at the bottom left. or just check my notepad for better drawing

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
- sort the inputtable areas after entering?

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
