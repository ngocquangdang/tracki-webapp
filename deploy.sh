#!/usr/bin/env bash

echo "##### Login docker private registry....."
echo "$1" | docker login -u "$2" --password-stdin
echo "##### Stop all running containers and remove old image ....."
docker stop tracki-frontend
docker rmi $(docker images mtrk2021/tracki-frontend -q)
echo "##### Stop all running containers ....."
docker rm tracki-frontend
echo "##### Run image ....."
docker run -d --name tracki-frontend -p 3001:3000 --restart unless-stopped $3
