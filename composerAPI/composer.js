const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require("cors");
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS
app.use(cors());

app.use(express.json()); // Middleware to parse JSON bodies

// Ensure the directory exists
const uploadDirectory = path.join(__dirname, "Storage");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Endpoint to handle both form data and binary data uploads
app.post("/upload", upload.any(), (req, res) => {
  // req.files contains the uploaded files
  // req.body contains the form data
  try {
    if (req.files && req.files.length > 0) {
      console.log(req.files);
      res.status(200).json({ msg: "File Uploaded Successfully" });
    } else {
      res.status(400).json({ msg: "No File Uploaded" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error Occurred" });
  }
});

// Define routes to fetch JSON data for Vendure, Strapi, and Typesense
app.get('/emporixFlow', (req, res) => {
  fetchData('emporix', res);
});

app.get('/elasticPathFlow', (req, res) => {
  fetchData('elasticPath', res);
});

app.get('/shopifyPlusFlow', (req, res) => {
  fetchData('shopifyPlus', res);
});

app.get('/contentfulFlow', (req, res) => {
  fetchData('contentful', res);
});

app.get('/strapiFlow', (req, res) => {
  fetchData('strapi', res);
});

app.get('/algoliaFlow', (req, res) => {
  fetchData('algolia', res);
});

app.get('/typesenseFlow', (req, res) => {
  fetchData('typesense', res);
});

// Function to fetch JSON data from file
function fetchData(filename, res) {
  const filePath = path.join(__dirname, './Storage/', `${filename}.json`);

  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    // Read the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error', msg: err.message });
        return;
      }
      // Parse and send JSON data
      try {
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData);
      } catch (parseError) {
        res.status(500).json({ error: 'Error parsing JSON data' });
      }
    });
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
