# Use an official PHP runtime as a base image
FROM php:7.4-fpm

# Set the working directory in the container
WORKDIR /var/www/html

# Install required dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy the Laravel application files
COPY . .

# Install Laravel dependencies
RUN composer install

# Run migrations during the container build
RUN php artisan migrate

# Expose the port on which the app runs
EXPOSE 80

# Define the command to run your app
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=80"]
