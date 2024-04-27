# XมดllรJທำโປSlจຄ

# Installation
We have 2 ways to install
## 1. Docker
1. Install [docker](https://www.docker.com/products/docker-desktop/) and [Docker Compose](https://docs.docker.com/compose/install/) if you don't have them already.
2. Run docker compose (-d is for detach)
    ```sh
      docker compose up
    ```
  
3. (optional) if you want to **rebuild** it
    ```sh
      docker compose down
      docker compose up --build
    ```

## 2. NPM
### Frontend
1. Navigate to frontend directory
    ```sh
      cd Frontend
    ```
2. Install depencies
    ```sh
      npm install
    ```

### Backend
1. Navigate to backend directory
    ```sh
      cd Backend 
    ```
2. Install depencies
    ```sh
      npm install
    ```

## Usage
### Frontend
1. Start the frontend development server
    ```sh
      npm start
    ```
2. Open your browser and visit http://localhost:3000

### Backend
1. Start the backend server
    ```sh
      npm start
    ```
2. Open your browser and visit http://localhost:5000 and `document on`: http://localhost:5000/api-docs


[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/nj0X2aoJ)
