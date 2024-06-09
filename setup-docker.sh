#!/bin/bash
sudo docker-compose down
sudo docker stop $(docker ps -q) && docker rm $(docker ps -aq)
sudo docker-compose up -d
