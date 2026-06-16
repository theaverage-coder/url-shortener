# URL Shortener

A simple URL Shortener application that allows users to convert long URLs into short, shareable links. The application generates unique short codes and redirects users to the original URL when the shortened link is accessed. Additionally, it tracks visitors for URLs and displays usage trends such as total clicks, unique visitors and trends over time.

## Features

* Shorten long URLs into compact links
* Users can create custom aliases
* Automatic redirection to original URLs
* Track user clicks and display activity analytics
* RESTful API support
* JWT authentication and login/register system

## Technologies Used

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

## Installation

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB

### Clone the Repository

```bash
git clone https://github.com/theaverage-coder/url-shortener.git
cd url-shortener
```

### Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000
```

### Run the Application

#### Start Backend

```bash
cd backend
npm run dev
```

#### Start Frontend

```bash
cd frontend
npm run dev
```

The application will be available at:

* Frontend: `http://localhost:5173`
* Backend: `http://localhost:5000`

## API Endpoints

### Create Custom URL

**POST** `/url/shortenUrl`

Request Body:

```json
{
  "originalUrl": "https://www.example.com",
  "customCode": "abc123"
}
```

Response:

```json
{
  "shortUrl": "http://localhost:5000/abc123"
}
```

### Redirect to Original URL

**GET** `/url/display/:code`

Redirects the user to the original URL associated with the provided short code.

### Get Analytics
**GET** `/url/analytics/:code`

Retrieves information about total clicks, clicks per day and unique visitors given a URL code

### Login User
**POST**  `/users/login`
Logins an existing user and returns a JWT token to be stored in the frontend for protected API calls

## Project Structure

```text
url-shortener/
│
├── frontend/
|   ├── src/
|   │   ├── components/
│   │   |── pages/
│   │   |── App.jsx
│   |   └── main.jsx
|   |── index.html
|   └── package.json
|
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
|   ├── .env
|   └── package.json
│
├── .env
└── README.md
```

## Future Improvements

* QR code generation
* Expiration dates for links
* Admin dashboard


