# Project Title: Form Management System

This project is a Form Management System similar to Google Forms. It is built using React for the frontend and a Node.js server for the backend. The system allows users to create, share, and manage forms.

## Features

- User Registration and Login
- Create new forms with various field types (text, number, radio options, rating)
- Edit and delete existing forms
- Share forms with others
- View and manage form responses

## Screenshots
![image](https://github.com/Ashesh3Projects/formy/assets/3626859/8ff01798-d643-41ef-978a-4976ecf6804a)
![image](https://github.com/Ashesh3Projects/formy/assets/3626859/4c3cadbc-54a1-4930-85b1-031ba259c141)
![image](https://github.com/Ashesh3Projects/formy/assets/3626859/f77465e8-b573-44c8-9299-1a841d61827b)
![image](https://github.com/Ashesh3Projects/formy/assets/3626859/bc4cf2c5-5ac1-4ee0-ad65-8b0d645cdeb3)

## Setup and Installation

### Prerequisites

- Node.js (version 16 or above)
- npm (usually comes with Node.js)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/Ashesh3Projects/formy.git
   ```
2. Navigate into the project directory
   ```
   cd formy
   ```
3. Install the dependencies for the server
   ```
   cd server
   npm install
   ```
4. Install the dependencies for the client
   ```
   cd ../client
   npm install
   ```
5. Create a `.env` file in the server directory and add your environment variables (refer to `.env.example` for required variables)

### Running the Application

1. Start the server
   ```
   cd server
   npm start
   ```
2. In a new terminal, start the client
   ```
   cd client
   npm start
   ```

The application should now be running at `http://localhost:3000`. The server is running at `http://localhost:5000`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
