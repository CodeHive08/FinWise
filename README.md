# FinWise- Expense Tracker

FinWise is a web application designed to help you manage your finances effectively. It provides a user-friendly interface to track your income and expenses, offering insights into your spending habits through visualizations. Additionally, it features an AI-powered travel planner to help you plan your trips within a budget.
 
## Features

- **User Authentication:** Secure signup and login functionality.
- **Dashboard:** An overview of your financial status, including total income, total expenses, and recent transactions.
- **Income and Expense Tracking:** Easily add, view, and manage your income and expenses.
- **Data Visualization:** Interactive charts to visualize your financial data, helping you understand where your money goes.
- **Transaction History:** A complete history of all your transactions.
- **Data Export:** Export your financial data to CSV or PDF formats.
- **AI Travel Planner:** Get assistance from an AI to plan your travels based on your budget.

## Tech Stack

### Frontend

- **React:** A JavaScript library for building user interfaces.
- **React Router:** For navigation within the application.
- **Axios:** For making HTTP requests to the backend.
- **Styled Components:** For styling the application.
- **Chart.js:** For creating interactive charts.
- **Moment.js:** For date formatting.

### Backend

- **Node.js:** A JavaScript runtime environment.
- **Express.js:** A web framework for Node.js.
- **MongoDB:** A NoSQL database for storing application data.
- **Mongoose:** An ODM library for MongoDB.
- **JWT:** For user authentication.
- **OpenAI API:** For the AI Travel Planner feature.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/CodeHive08/FinWise.git
    ```

2.  **Setup the Backend:**

    - Navigate to the `Backend` directory:
      ```sh
      cd Backend
      ```
    - Install the dependencies:
      ```sh
      npm install
      ```
    - Create a `.env` file in the `Backend` directory and add the following environment variables:
      ```
      PORT=5000
      MONGO_URL=<YOUR_MONGODB_CONNECTION_STRING>
      OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
      ```
    - Start the backend server:
      ```sh
      npm start
      ```

3.  **Setup the Frontend:**

    - Open a new terminal and navigate to the `Frontend` directory:
      ```sh
      cd Frontend
      ```
    - Install the dependencies:
      ```sh
      npm install
      ```
    - Start the frontend development server:
      ```sh
      npm start
      ```

The application should now be running at `http://localhost:3000`.

## Screenshots

![image](https://github.com/user-attachments/assets/84b40cbc-c1be-47e0-8286-fe8ee786cf34)

![image](https://github.com/user-attachments/assets/6ba3084b-6bea-45c1-bbd5-355eea4d8060)


![image](https://github.com/user-attachments/assets/fad7047f-50b1-4a89-84fd-cb09e1c7a9ce)

![image](https://github.com/user-attachments/assets/755ea39b-b61a-41e7-9978-3375c645588b)


![image](https://github.com/user-attachments/assets/99dc3aa4-45ad-49cb-a473-0910021a3c11)

![image](https://github.com/user-attachments/assets/0583ed74-4fad-42c8-b7bd-b9fb97ea873a)


## Future Scope

- Implement more detailed financial reports.
- Add support for multiple currencies.
- Enhance the AI Travel Planner with more features.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- [Create React App](https://github.com/facebook/create-react-app)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- And all the amazing npm packages used in this project. 
