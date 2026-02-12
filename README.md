# 💰 Financial Planner

A systematic, simple, and customizable web application to track monthly expenses, debts, and income. Designed with the Indian context in mind (₹), it features forecasting capabilities to help you visualize your future financial health.

## ✨ Features

-   **Dashboard**: Real-time snapshot of your current balance and monthly cash flow.
-   **Expense Tracking**: Log daily expenses and incomes with categories.
-   **Debt Management**: Visualize and track your debt repayment progress.
-   **Forecasting**: Add planned future events (e.g., "Tuition Fees", "Vacation") and see their impact on your balance for the next 6 months.
-   **Smart Insights**: Get alerts when you exceed budget limits for categories like Food or Shopping.
-   **Indian Context**: Fully localized with Rupee (₹) symbols.

## 🚀 Getting Started

### Prerequisites

-   **Node.js**: Ensure you have Node.js installed (v16 or higher recommended).
-   **Git**: To clone the repository.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/shanmukhkoya/financial-planner.git
    cd financial-planner
    ```

2.  **Install Backend Dependencies**:
    ```bash
    cd server
    npm install
    ```

3.  **Install Frontend Dependencies**:
    Open a new terminal window/tab:
    ```bash
    cd client
    npm install
    ```

## 🛠 Usage

To run the application, you need to start both the Backend (API) and Frontend (UI).

1.  **Start the Server**:
    In the `server` directory:
    ```bash
    npm run dev
    ```
    *Server runs on http://localhost:3001*

2.  **Start the Client**:
    In the `client` directory:
    ```bash
    npm run dev
    ```
    *Client runs on http://localhost:5173 (or similiar)*

## 📚 Documentation

For a detailed walkthrough of all features and how to use them effectively, please read the **[User Guide](USER_GUIDE.md)** included in this repository.

## 🧹 Data Management

-   **Clear All Data**: To reset the application and delete all data, run:
    ```bash
    # From server or client directory
    npm run reset
    ```

-   **Add Demo Data**: To fill the app with example data for testing:
    ```bash
    # From server directory
    npm run seed
    ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
