#!/bin/bash
set -x

docker-compose -f docker-compose.yml down

sleep 2

docker-compose -f docker-compose.yml up
