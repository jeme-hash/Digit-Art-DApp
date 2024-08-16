# Digit-Art DApp

Welcome to **digit-art**, a JavaScript-based Decentralized Application (DApp) that leverages Cartesi Rollups to manage and showcase digital art in a decentralized environment. With this DApp, users can create, list, and view details of various digital art pieces, ensuring that creativity is both celebrated and securely stored.

## Core Features

- **Create Digital Art**: Easily submit and store details of new digital art pieces, including the title, description, and URI.
- **List Artworks**: Access a complete list of all digital art pieces stored on the platform.
- **View Art Details**: Fetch detailed information about a specific art piece using its unique ID.

## Project Structure

The project is organized as follows:

- **`src/`**
  - **`controller/`**
    - **`artController.js`**: Contains the logic for creating, listing, and retrieving digital art pieces.
  - **`art-piece.js`**: Defines the model for an ArtPiece, including properties like title and URI.
  - **`art-storage.js`**: Manages the storage and retrieval of art pieces within the DApp.
  - **`index.js`**: Acts as the main entry point, facilitating communication with Cartesi Rollups.
  - **`utils.js`**: Provides utility functions for hex-string conversions and other common operations.
- **`dist/`**: Compiled output directory, generated by `esbuild`.
- **`node_modules/`**: Directory containing Node.js dependencies.

## Getting Started

### Prerequisites

Ensure that [Node.js](https://nodejs.org/) is installed on your system. This DApp is compatible with Node.js version 20.x or later.

### Cloning the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/<your-repository>/digit-art.git
cd digit-art
```

### Installing Dependencies

Next, install the necessary packages:

```bash
npm install
```

## Configuration

To configure the DApp, create a `.env` file in the root directory or set the following environment variables directly in your shell:

```env
ROLLUP_HTTP_SERVER_URL=http://127.0.0.1:5004
```

This URL points to your Cartesi Rollup server.

## Running the DApp

### Building the Project

Compile the project using `esbuild`:

```bash
npm run build
```

### Starting the Application

With the build process complete, start the DApp:

```bash
npm start
```

The application will then be ready to handle requests from Cartesi Rollups, processing them according to the defined actions.

## API Overview

The DApp interacts with Cartesi Rollups through several key endpoints:

- **`/notice`**: Handles requests to create new digital art pieces.
- **`/report`**: Manages requests to list all art pieces or retrieve specific details.
- **`/finish`**: Polls for any pending requests that require processing.

## Code Details

### `controller/artController.js`

The `ArtController` class in this file is responsible for:

- **`createArtPiece(data)`**: Accepts data to create a new art piece and stores it.
- **`getArtPieceById(data)`**: Fetches a specific art piece using its ID.
- **`getAllArtPieces()`**: Returns a list of all stored art pieces.

### `art-piece.js`

This file defines the `ArtPiece` class, which includes properties such as `id`, `creator`, `title`, `description`, and `uri`. It also provides a method to format this data for easy retrieval.

### `art-storage.js`

`art-storage.js` handles the storage logic for art pieces, utilizing an in-memory `Map`. It includes methods to:

- **`addOne(artPiece)`**: Adds a new art piece to the storage.
- **`getOneById(id)`**: Retrieves an art piece using its ID.
- **`getAll()`**: Lists all stored art pieces.

### `index.js`

Serving as the main entry point, `index.js` handles incoming requests from Cartesi Rollups, dispatching them to the appropriate functions. It also manages the polling mechanism to check for pending requests.

### `utils.js`

`utils.js` provides essential utility functions, such as converting between hex and string formats, using the `ethers` library.

## Contributing

We welcome contributions from the community! If you spot any issues or have ideas for enhancements, feel free to open an issue or submit a pull request. Your input is valuable and greatly appreciated.

## License

This project is distributed under the MIT License. For more information, refer to the [LICENSE](LICENSE) file.