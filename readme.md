
# Rock-n-review-backend

The Rock-n-review-backend is the backend server for the Rock-n-Review Music Review Site. It serves as the database and handles various functionalities such as user authentication, database operations, and providing API endpoints for seamless interaction with the frontend.

## Project Overview

Rock-n-Review is a music review platform where users can search for their favorite albums or songs by an artist, rate them, and share their reviews. Additionally, users can engage in discussions by starting comment sections on existing reviews.

## Contributors

C-jay Solly at https://github.com/Csolly89 --
Thomas McCullough at https://github.com/tamccullough88 --
Lin Zorrilla at https://github.com/NeNeZoRr --
Charles D. at https://github.com/Cwdrian --

## Getting Started

To set up and run the backend server, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/tamccullough88/Rock-n-review-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Rock-n-review-backend
   ```

3. Install dependencies:

   ```bash
   npm install cors express dotenv mongoose bcrypt helmet
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

The backend server should now be running at http://localhost:8080.

## Connecting to the Frontend

For the backend to function correctly, it needs to be connected to the frontend server. The frontend server for this project can be found at [Rock-n-reviews frontend](https://github.com/NeNeZoRr/rock-n-reviews/). Refer to the instructions in the frontend repository to set up and run the frontend server.

## API Endpoints

The backend exposes the following API endpoints:

- `GET /albums`: Retrieve a list of albums.
- `GET /albums/:id`: Retrieve details of a specific album.
- `POST /albums`: Add a new album.
- `PUT /albums/:id`: Update details of a specific album.
- `DELETE /albums/:id`: Delete a specific album.

- `GET /artists`: Fetch a list of artists.
- `GET /artists/:id`: Fetch details of a specific artist.
- `POST /artists`: Add a new artist.
- `PUT /artists/:id`: Update details of a specific artist.
- `DELETE /artists/:id`: Delete a specific artist.

- `GET /reviews`: Get a list of reviews.
- `GET /reviews/:id`: Get details of a specific review.
- `POST /reviews`: Add a new review.
- `PUT /reviews/:id`: Update details of a specific review.
- `DELETE /reviews/:id`: Delete a specific review.

## Contributing

If you're interested in contributing to this project, please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to the contributors who have contributed to the development of this project.
- Inspirations: [Mention any sources or projects that inspired your work.]

Feel free to tailor the README according to your project specifics and include any additional information you find relevant.
