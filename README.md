# Ruin Manga Readme

## Project Overview

Ruin Manga is an ambitious project that aims to provide a feature-rich and user-friendly platform for reading manga while also managing user accounts seamlessly. It leverages various technologies and microservices to achieve its goals.

## Frontend Technology Stack

The frontend of Ruin Manga is built using TypeScript, Tailwind CSS, and Next.js. This modern and responsive web application offers an intuitive user interface for manga enthusiasts. It allows users to browse, search for, and read manga titles, all while offering a delightful user experience.

## Backend Microservices

### MangaData Microservice [ruinManga](https://github.com/tyrell-snyders/ruinManga)

- **Technology Stack:** Java Spring Boot
- **Purpose:** This microservice is responsible for fetching manga data from the MangaDex API. It acts as a bridge between the frontend and the external MangaDex API, providing a standardized and optimized interface for retrieving manga content. This microservice ensures that users can access the latest manga titles, summaries, and other metadata efficiently.

### User Management Microservice [rnManga-fastify](https://github.com/tyrell-snyders/rnManha-fastify)

- **Technology Stack:** TypeScript, Fastify, Swagger, MySQL
- **Purpose:** The User Management Microservice is designed to handle user-related operations. It allows users to create accounts, log in, manage their profiles, and perform other essential actions. It leverages TypeScript for type safety, Fastify for efficient API routing, Swagger for clear API documentation, and MySQL for robust data storage. This microservice ensures user data privacy, security, and a seamless registration and login process.

## Key Features

- **Manga Search:** Users can search for manga titles based on various criteria, such as genre, author, or title keywords.
- **Reading Experience:** The platform provides a reader-friendly interface for manga viewing, supporting smooth scrolling and user-customizable settings.
- **User Registration and Authentication:** Users can create accounts, log in, and securely manage their profiles.
- **Favorites and Bookmarks:** Users can mark their favorite manga titles and bookmark specific pages for quick access.
- **Social Features:** Users can rate and review manga titles, share recommendations, and engage with a community of manga enthusiasts.
- **User Dashboard:** Users can access their reading history, preferences, and account settings in a centralized dashboard.

## Project Scope

Ruin Manga will focus on manga reading and user management in its initial phase. Future enhancements may include personalized recommendations, user-generated content, and additional integrations with external manga sources.
