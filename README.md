# Album Manager Client

This is a simple web application for managing albums using React, TypeScript, Redux Toolkit, React Query, Tailwind CSS, Vite, and Framer Motion. 

The application allows users to view, add, delete, and upload photos and interact with photo albums from the [JSON Placeholder API](https://jsonplaceholder.typicode.com/).


## Screenshots
![App Screenshot](https://github.com/zivab/AlbumManager/assets/30836588/eb781d1c-1328-4548-a8a7-95d2bb735039)


## Features

- **Display 50 Photo Cards**: Present a collection of 50 photo cards from a selected album, showcasing thumbnails and titles.

- **State Management with Redux**: Utilize Redux for effective management of the album's current state.

- **Image Preview**: Enable users to view full-sized images in a modal by clicking on them.

- **Album Navigation**: Provide the ability to switch between different albums effortlessly.

- **Edit Photo Titles**: Allow users to modify the titles of photos using the PUT API, triggering an update in the store and refreshing the page with the latest response.

- **Delete Photos**: Empower users to remove any photo with ease using the DELETE API, leading to an automatic update of the store and page content.

- **Upload New Photos**: Facilitate the addition of new photos to the album through the POST API, ensuring real-time updates in the store and on the page.

- **Performance Optimization**: Leveraged Redux Toolkit Query and Redux Toolkit to refine performance, ensuring components are rendered only when necessary, thereby enhancing the overall user experience.

## Technologies Used

-   [ReactJS](https://reactjs.org)
-   [Vite](https://vitejs.dev)
-   [TypeScript](https://www.typescriptlang.org)
-   [Tailwind](https://tailwindcss.com/)
-   [headlessui](https://headlessui.com/)
-   [Redux Toolkit](https://redux-toolkit.js.org/)
-   [Redux Toolkit Query](https://redux-toolkit.js.org/)
-   [ESLint](https://eslint.org)
-   [Prettier](https://prettier.io/)
-   [Farmer Motion](https://www.framer.com/motion/)
## Demo

[Album Manager](https://album-manager-z.netlify.app/)


## Installation

To run this application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/zivab/AlbumManager
2. Access the project.

   ```bash
   cd AlbumManager

3. Install dependencies.

   ```bash
    npm i
   
4. Start the development server.
   ```bash
   npm run dev

5. Build for production.
   ```bash
   npm run build
## Authors

- [@zivab](https://github.com/zivab)

