<h1 align="center">Lecturna Quizbuilder</h1>

<p align="center">A webapp for creating and taking quizzes online, a simplified version of the assessments portion of an online Course Management System. Currently enables users to write and take quizzes, which the program then grades automatically.</p>

## Screenshots

### Desktop

<kbd>
 <img src="https://user-images.githubusercontent.com/73432960/147150414-b1951871-e555-4daf-ab1d-eb4579015d97.JPG" alt="Lecturna Screenshot" width="500"/>
</kbd>\\
<kbd>
<img src="https://user-images.githubusercontent.com/73432960/147150434-402ced05-2039-4cbc-b0dc-599010ec33a6.JPG" alt="Lecturna Screenshot" width="500"/>
</kbd>
<kbd>
<img src="https://user-images.githubusercontent.com/73432960/147150400-197db160-6eff-46bb-aa0e-2068315358c2.JPG" alt="Lecturna Screenshot" width="500"/>
</kbd>
<kbd>
<img src="https://user-images.githubusercontent.com/73432960/147150427-d46573d0-7bf9-496f-bb3d-51832168590e.JPG" alt="Lecturna Screenshot" width="500"/>
</kbd>
<kbd>
<img src="https://user-images.githubusercontent.com/73432960/147150409-a31c5baa-65d0-411c-89ea-0b50c85ddbd4.JPG" alt="Lecturna Screenshot" width="500"/>
</kbd>




### Mobile
The project has not yet been optimized for mobile devices.

## Links

- [Repo](https://github.com/patricklang87/congress_data "LegisTracker Repo") 


## Run the project

To run the project locally:

- Clone the file.
- In the project's root directory, run 'npm install && npm client-install' to install all necessary dependencies.
- Log into the psql CLI and create a local database.
- Create a .env file in the root directory, and create PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DATABASE and JWT_SECRET variables. PG_USER is the username from your local database, PG_PASSWORD is your password, and PG_DATABASE is the name you've given your database. 
- Using the commands from the database.sql file, create the necessary tables in the psql CLI.
- Use 'npm run dev' to run the front end and backend simoultaneously.

## Built with

- JavaScript
- Node
- NPM

### Frontend
- HTML
- SASS
- Axios
- React
- React-Router
- Redux


### Backend
- PostgresSQL
- PG
- JSON Web Token
- Bcryptjs
- Express
- Dotenv
- Concurrently

## Future Updates

- [ ] Restructure database to enable quiz versioning and collaboration.
- [ ] Make UX responsive to mobile screen sizes.
- [ ] Improve quiz writing interface.
 
## Author

**Patrick Lang**

- [Profile](https://github.com/patricklang87 "Patrick Lang")
- [Email](mailto:patricklang87@gmail.com?subject=Lecturna "Lecturna")
