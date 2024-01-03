# Online marketplace

This project aims to create a webshop, where people can sell and buy items from each other. 

It includes functional front- and backend, user authentication, and invoice creation.  

## Used Technologies

- Laravel
- ReactJs
- MySQL

## Installation

This project requires that your machine is able run Laravel and ReactJs projects.
(The following instructions are for running the app on localhost, but it can be hosted with other technologies too (i.e. Apache), in which case you should change the in-built endpoints).
(The current version now relies on an already existing database). 

1. Download this repository to your machine
2. Navigate to the project directory
3. Move to backend folder
  ```sh
   cd backend
  ```
4. Install dependencies(backend)
  ```sh
  composer update && composer install
  ```
5. Install more dependencies(backend)
  ```sh
   npm install
  ```
6. Start backend
  ```sh
  php artisan serve
  ```
7. Open new terminal and navigate to the project directory
8. Move to frontend folder
  ```sh
   cd frontend
  ```
9. Install dependencies(frontend)
  ```sh
   npm install
  ```
9. Start frontend
  ```sh
  php start
  ```

## Implemented features

- User authentication
- Selling and buying items
- Invoice creation
- Database inerfacing

## Features to be implemented

- Automatic database creation
- Improved user experience
- Containerization

## Contributors

- Milan Egri ([@MilanEgri](https://github.com/MilanEgri))
- Levente Molnar([@molnarlevi19 ](https://github.com/molnarlevi19))
- Csaba Katona ([@Treev13](https://github.com/Treev13))
- Tamas Rehany ([@RehanyTamas](https://github.com/RehanyTamas))

