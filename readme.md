- `npm start` &mdash; start server in (production)
- `npm run start:dev` &mdash;start server in  (development)
- `npm run lint` &mdash; start checking code eslint,necessary execute before each  PR and fix all mistakes linter 
- `npm lint:fix` &mdash; same check linter but with auto fix simple mistakes 
!Vital*,You can use SiriniServer.postman_collection.json from this app to add ready config to your Postman

- `npx sequelize-cli db:migrate` &mdash; invoke migrations 
 settings to create your own MySQL and connect to The server : {
    "username": "root",
    "password": "1996",
    "database": "my_db",
    "host": "localhost",
    "dialect": "mysql",
    "operatorsAliases": false
  },
