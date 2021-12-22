<h1 align="center">Lecturna Quizbuilder</h1>

<p align="center">A webapp for creating and taking quizzes online, a simplified version of the assessments portion of an online Course Management System. Currently enables users to write and take quizzes, which the program then grades automatically.</p>

## Screenshots

### Desktop

<img src="https://user-images.githubusercontent.com/73432960/132585738-5213db62-84b4-4963-addb-f6759479743b.JPG" alt="login" width="500"/>
<img src="https://user-images.githubusercontent.com/73432960/132585690-57cfcd57-ef63-4432-802d-93c880f98f76.JPG" alt="find legislators" width="500"/>
<img src="https://user-images.githubusercontent.com/73432960/132585745-93b61dd1-6618-4647-ae40-a24b7149f2bb.JPG" alt="recent bills" width="500"/>


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
- [ ] Make UX responsive to mobile devices.
- [ ] Improve quiz writing interface.
 
## Author

**Patrick Lang**

- [Profile](https://github.com/patricklang87 "Patrick Lang")
- [Email](mailto:patricklang87@gmail.com?subject=Lecturna "Lecturna")
