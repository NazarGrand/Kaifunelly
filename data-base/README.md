## Docker

First of all, you must have the Docker app installed on your machine.
Create the "db" folder at the same level as docker-compose.yml file.

## To create Docker container with local Postgres DB

bash
$ docker-compose up -d

## To remove Docker container

bash
$ docker-compose down

## To remove Docker container and clear Volumes

bash
$ docker-compose down --volumes
