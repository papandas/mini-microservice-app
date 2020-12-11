set -x

kill -9 $(lsof -i:4002 -t) 2> /dev/null

sleep 2

npm start