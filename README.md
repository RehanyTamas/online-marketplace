# Online marketplace

This project aims to create a webshop, where people can sell and buy items from each other. 

It includes functional front- and backend, user authentication, and invoice creation.  

## Used Technologies

- Laravel
- ReactJs
- MySQL

## How to use

### Method 1

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
5. Create tables in database
  ```sh
  php artisan migrate
  ```
6. Make a copy of the ".env.example" file, and fill it with the information of your own database. Name the file as ".env".
7. Start backend
  ```sh
  php artisan serve --port=8081
  ```
8. Open new terminal and navigate to the project directory
9. Move to frontend folder
  ```sh
   cd frontend
  ```
10. Install dependencies(frontend)
  ```sh
   npm install
  ```
11. Start frontend
  ```sh
  npm start
  ```

If you change the url where the backend is running dont forget to change the frontend config file to match.

### Method 2

The project can be run using docker.

1. Download this repository to your machine
2. Navigate to the project directory
3. Move to docker folder
  ```sh
   cd docker
  ```
4. Run the compose file
  ```sh
  docker-compose up
  ```
If you wish to change the default settings (database name, password, backend/frontend port ... etc.) you can do this through the appropriate dockerfile and .env file (the one in the backend container).  

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

