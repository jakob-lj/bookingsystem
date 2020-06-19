#! /bin/bash

docker kill pg-docker-bb
docker rm pg-docker-bb

docker run --rm --name pg-docker-bb -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data  postgres