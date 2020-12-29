docker run --name postgres_ew -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=heroes -p 5432:5432 -d postgres
docker exec -it postgres_ew /bin/bash

docker run --name adminer_ew -p 8080:8080 --link postgres_ew:postgres_ew -d adminer

docker run --name mongodb_ew -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=123456 -d mongo:4
docker exec -it mongodb_ew mongo --host localhost -u admin -p 123456 --authenticationDatabase admin --eval "db.getSiblingDB('heroes').createUser({user: 'aplicacao', pwd: '123456', roles: [{role: 'readWrite', db: 'heroes'}]})"
                                               
docker run --name mongoclient_ew -p 3000:3000 --link mongodb_ew:mongodb_ew -d mongoclient/mongoclient
