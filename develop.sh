#! /bin/bash

docker kill boatbookcontainer
docker rm boatbookcontainer

./startdb.sh

sleep 5

docker build -t boatbook .
 
id=$(docker run -d --name boatbookcontainer -p 8000:80 -v $(pwd):/app boatbook /start-reload.sh)
echo "id is"
echo $id

echo "Starting logging: "
docker logs -f boatbookcontainer