# HDM Finance App

**HDM Finance App** is a simple and lightweight web application designed to help users **record and track their financial transactions**, with a particular focus on **expense management**.

## ✨ Features

* **Add Transaction**: Easily record a new financial transaction.
* **Transaction History**: View a list of previously recorded transactions.

## 🧠 How It Works

Unlike typical finance apps that rely on a database, HDM Finance App leverages the power of **Google Forms** and **Google Spreadsheets** to store and retrieve data. This approach makes the app lightweight and easy to deploy without backend infrastructure.

---

## ⚙️ Configuration

To get started, follow these steps to set up your configuration:

1. **Create a configuration file:**

   Inside your project's `src` folder, create a file named `config.tsx` with the following structure:

   ```tsx
   export const googleFormUrl = 'https://docs.google.com/forms/d/e/***';
   export const spreadsheetsApi = 'https://script.google.com/macros/s/***';
   ```

2. **Set up Google Form:**

   * Go to [Google Forms](https://docs.google.com/forms/u/0/?hl=id).
   * Create a form to collect transaction data (e.g., date, amount, category, etc.).
   * Click on the **Send** button, choose the embed (`<>`) option, and copy the **embed HTML URL**.
   * Use this URL as the value for `googleFormUrl` in your `config.tsx`.

3. **Set up Google Spreadsheet API:**

   * After linking your Google Form to a Google Spreadsheet (via **Responses → Create Spreadsheet**), open the spreadsheet.
   * Go to **Extensions → Apps Script**.
   * Write a script to fetch the spreadsheet data and deploy it as a **Web API**.
   * Copy the deployed web app URL and use it as the value for `spreadsheetsApi` in your `config.tsx`.

---

## 📦 Tech Stack

* **React + TypeScript**
* **Google Forms** (for data input)
* **Google Spreadsheets + Apps Script** (for data storage and retrieval)

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🗬️ Feedback

If you encounter any issues or have suggestions for improvement, feel free to open an issue or contribute via pull requests.
