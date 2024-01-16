# Use an official MariaDB image as a base
FROM mariadb:10.5

# Set environment variables for MariaDB
ENV MYSQL_ROOT_PASSWORD=rootpassword \
    MYSQL_DATABASE=mydatabase \
    MYSQL_USER=myuser \
    MYSQL_PASSWORD=mypassword

# Copy the database initialization script
COPY ./my-database.sql /docker-entrypoint-initdb.d/
