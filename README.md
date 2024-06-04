

# Standard Package API

This Node.js application provides an API for uploading files and fetching JSON data from files stored on the server. It utilizes Express.js for routing, multer for handling file uploads, cors for enabling cross-origin resource sharing, and fs for file system operations.

## Installation

1. Clone this repository:

   ```
   git clone <repository_url>
   ```

2. Install dependencies:

   ```
   npm install
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. The server will start running on port 3000 by default. You can also specify a custom port using the `PORT` environment variable.

## Endpoints

### 1. File Upload Endpoint

- **URL**: `/upload`
- **Method**: POST
- **Description**: Endpoint to handle both form data and binary data uploads.
- **Parameters**: None
- **Request Body**: Form data or binary data
- **Response**:
  - Success: `{ "msg": "File Uploaded Successfully" }`
  - No file uploaded: `{ "msg": "No File Uploaded" }`
  - Error: `{ "msg": "Error Occurred" }`

### 2. JSON Data Endpoints

- **URL**: `/emporixFlow`, `/elasticPathFlow`, `/shopifyPlusFlow`, `/contentfulFlow`, `/strapiFlow`, `/algoliaFlow`, `/typesenseFlow`
- **Method**: GET
- **Description**: Fetch JSON data related to specific entities.
- **Response**: JSON data related to the specified entity.

## Storage

Uploaded files are stored in the `Storage` directory relative to the project root.

## Dependencies

- `express`: Web framework for Node.js
- `cors`: Middleware for enabling CORS
- `multer`: Middleware for handling file uploads
- `fs`: Node.js file system module
- `path`: Node.js path module

## Configuration

- The application uses the `PORT` environment variable for defining the server port. If not set, it defaults to port 3000.
- Uploaded files are stored in the `Storage` directory. If the directory doesn't exist, it will be created automatically.

## Contributors

- Ramanand Tiwari - Role

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README further based on your project's specific details and requirements!
