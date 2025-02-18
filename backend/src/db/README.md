## Main commands for working with typeORM

The project has implemented commands for working with database migrations and data.
Please use the commands below to work with the TypeORM.

## Generate new migration

Used to create a migration when we modified anything on our entities.
From the official documentation - you need to specify the full path to the migration directory.
For example, 'src/db/migrations/MigrationName'

```bash
$ yarn run migration:generate src/db/migrations/MigrationName
```

## Run migrations

Used to update our database if it’s not done automatically.

```bash
$ yarn run migration:run
```

## Run seed

Used to add default or other data to the tables.
Note. The seeder files will be executed alphabetically.

```bash
$ yarn run seed
```
