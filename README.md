## jwt sample

`
node bootstrap.js
npm start
`

##### mongo stuff

`
docker run -d --name mongo-database -p 27017:27017 mongo
docker run -it --link mongo-database:mongo --rm mongo sh -c 'exec mongo "$MONGO_PORT_27017_TCP_ADDR:$MONGO_PORT_27017_TCP_PORT"'

`

# Get Token
`
curl -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Cache-Control: no-cache" \
  -d 'username=admin&password=password' \
  "http://localhost:3000/login"
`

# Use Token
`
curl -X GET \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlciIsInBlcm1pc3Npb25zIjpbImFwaTpyZWFkIiwiYXBpOndyaXRlIl0sImlhdCI6MTQ3OTg5ODgyN30.z8wTuZXqohpRCDIImWB3Ji8tSKGn8ss32x1atpZStHY" \
  -H "Cache-Control: no-cache" \
  "http://localhost:3000/api"

curl -X GET \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlciIsInBlcm1pc3Npb25zIjpbImFwaTpyZWFkIiwiYXBpOndyaXRlIl0sImlhdCI6MTQ3OTg5ODgyN30.z8wTuZXqohpRCDIImWB3Ji8tSKGn8ss32x1atpZStHY" \
  -H "Cache-Control: no-cache" \
  "http://localhost:3000/admin/pong"
`

