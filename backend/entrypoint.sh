
echo $DATABASE_HOST
echo $DATABASE_PORT

wait-for "${DATABASE_HOST}:${DATABASE_PORT}" -- "$@"

ls /app

echo "server is ready"

/app/main

# Watch your .go files and invoke go build if the files changed.
# CompileDaemon --build="go build -o main main.go"  --command=./main