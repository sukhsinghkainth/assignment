
---

# Student Search Application

## Overview

This single-page application (SPA) implements a search bar with lazy loading functionality to efficiently search through a dataset of students. Built using React.js, 

- **Lazy Loading**: Search triggers only after typing 3 or more characters.
- **Dynamic Dropdown**: Displays up to 5 matching students as the user types.
- **Highlighted Matches**: Highlights the matching portion of the student's name in the search results.
- **Detailed View**: Displays selected student's details (Name, Class, Roll Number) in a custom UI Card.
- **Case-insensitive Search**: Handles searches irrespective of the case.
- **Edge Cases Handling**: Manages special characters, spaces, and similar prefixes in names.

## Tech Stack

### Frontend
- **React.js**: A JavaScript library for building user interfaces.
- **Ant Design**: A React UI framework used for styling and components (minimal use).
- **Redux Toolkit Query**: For efficient data fetching and caching.

### Backend 
- **Node.js**: A JavaScript runtime for building scalable network applications.
- **Express**: A minimal and flexible Node.js web application framework.
- **JOI** : For Validation Schema
- **Winston** : For logging
  

## Getting Started

### Prerequisites
- Node.js (>= 14.x)
- npm or yarn

### Installation

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd client
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the application**:
    ```bash
    npm run dev
    ```

4. **Access the application**:
    Open your browser and navigate to `http://localhost:9001`.

### Backend Setup 

1. **Navigate to the backend directory**:
    ```bash
    cd server
    ```

2. **Install backend dependencies**:
    ```bash
    npm install
    ```

3. **Run the backend server**:
    ```bash
    npm run dev
    ```

4. **API Endpoints**:
    - `GET http://localhost:9000/api/v1/searchStudents?search=<term>&limit=5&offset=1`:
     Fetch students matching the search term with limit and offset.
    - `GET http://localhost:9000/api/v1/student?rollNumber=<term>`
        Fetch students matching the rollNumber.
    - `http://localhost:9000/api/v1/docs/` Swagger api URL 

## Usage

1. Start typing in the search bar with at least 3 characters.
2. A dropdown will appear with up to 5 matching students.
3. Click on a student's name to view their full details.

## Edge Cases Handled

- Similar prefixes in names (e.g., 'Amritpal Singh' vs. 'Amrita Sharma').
- Case-insensitive search.
- Handling special characters and spaces in search terms.

