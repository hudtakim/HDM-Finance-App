# HDM Finance App

**HDM Finance App** is a simple finance tracking application focused on recording your daily expenses. It provides an easy-to-use interface to add new transactions and view your transaction history.

Unlike traditional finance apps, this application does not use a database. Instead, it integrates directly with **Google Forms** and **Google Spreadsheets**, making setup and data storage free and cloud-based.

---

## 🚀 Features

- ✅ Add new expense transactions
- 📄 View transaction history
- ☁️ No database needed – uses Google Forms and Google Sheets as backend

---

## 📋 Current Form Fields

The current implementation expects the following columns from the linked Google Form or Spreadsheet:

- **User** – the person recording the transaction  
- **Jumlah** – the amount spent  
- **Kategori** – the spending category  
- **Keterangan** – a short description or note

Ensure your Google Form and Spreadsheet match this structure to avoid data issues.

---

## ⚙️ Configuration

Before running the app, you need to configure two endpoints by creating a file called `config.tsx` inside the `/src` folder with the following content:

```ts
export const googleFormUrl = 'https://docs.google.com/forms/d/e/***';  
export const spreadsheetsApi = 'https://script.google.com/macros/s/***';
```

- **`googleFormUrl`**: Embed URL from your Google Form  
- **`spreadsheetsApi`**: Web app URL from your Google Apps Script deployment

---

## 📝 Creating Google Form

1. Go to [Google Forms](https://docs.google.com/forms/u/0/?hl=id)
2. Create a form with fields: **User**, **Jumlah**, **Kategori**, **Keterangan**
3. Click **Send → <> Embed HTML** to get the `googleFormUrl`

---

## 📡 Example Apps Script

To retrieve submitted form data from Google Spreadsheet, use the following Apps Script:

```javascript
function doGet(e) {
  var sheetName = 'FormResponse1'; // Or use e.parameters.sheetName for dynamic access
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var data = sheet.getDataRange().getValues();
  var jsonData = JSON.stringify(data);
  return ContentService.createTextOutput(jsonData).setMimeType(ContentService.MimeType.JSON);
}
```

### 📌 How to Deploy:

1. Open the **Google Spreadsheet** linked to your form
2. Go to **Extensions → Apps Script**
3. Paste the script above
4. Click **Deploy → Manage deployments → New deployment**
5. Choose **Web App**, and set access to "Anyone"
6. Copy the deployment URL and use it as `spreadsheetsApi`

---

## 💻 Installation

1. Clone the repository to your local machine:  
   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```
2. Navigate into the project folder:  
   ```bash
   cd your-repo
   ```
3. Install dependencies using npm or yarn:  
   ```bash
   npm install
   # or
   yarn install
   ```

---

## 🚀 Deployment

To run the app locally for development:

```bash
npm start
# or
yarn start
```

This will start the development server, usually accessible at `http://localhost:3000`.

To build the app for production:

```bash
npm run build
# or
yarn build
```

You can then deploy the contents of the `build` folder to any static hosting service like GitHub Pages, Netlify, Vercel, or your own web server.

---

## 📦 Tech Stack

- React + TypeScript  
- Tailwind CSS  
- Google Forms + Google Sheets + Apps Script  

---

## 🧪 Future Enhancements

- Authentication (user-based transaction filtering)  
- Charts & analytics  
- Export to Excel / PDF  

---

## 📄 License

This project is open-source and free to use under the MIT License.
```

---
