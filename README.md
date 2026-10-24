Project: Daybook, a task manager web application

Overview:
Daybook helps a user plan and track daily work. It is a single-page application with no server dependency. All data is stored in the browser, so it loads instantly and works offline once opened.

Key features:

Full CRUD: add, view, edit and delete tasks.
Categories: Work, Personal and Study, each with its own color.
Due dates, with labels such as Today, Tomorrow and Overdue 2d.
Mark tasks complete with an animated check mark and strike-through.
Filter by status (All, Active, Completed) with live counts, plus text search.
Drag-and-drop reordering, and keyboard reordering with the arrow keys.
A progress bar showing how many tasks are done.
Automatic persistence with the localStorage API, including a safe fallback if storage is blocked.
Responsive layout for phones and desktops, with light and dark themes.

Tech stack:

React 18 (components and hooks), Vite
Tailwind CSS v4
JavaScript (ES6+), DOM events (pointer events for drag and drop)
Browser localStorage API
Git and GitHub

Technical highlights:

The app is split into reusable components (Header, TaskForm, Controls, TaskList, TaskItem, Footer).
A custom usePersistentState hook loads saved data on start and saves it on every change.
Data read from localStorage is validated before use, so corrupted data can’t crash the app.
Accessibility: labeled form controls, keyboard support, visible focus states, and reduced-motion support.

What I learned:
Structuring a React app into components, managing state, persisting data in the browser, building a responsive UI with Tailwind, and publishing a project on GitHub.

Links:

Source code: https://github.com/ayesha-lang/DayBook
Live demo: add your GitHub Pages link here once it’s deployedpt and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# DayBook
