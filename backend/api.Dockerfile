# Build environment
# -----------------
    FROM golang:1.16-alpine as builder

    ENV GO111MODULE=on \
        CGO_ENABLED=0 \
        GOOS=linux \
        GOARCH=amd64
    
    WORKDIR /app
    COPY go.mod .
    COPY go.sum .
    RUN go mod download
    
    COPY . .
    
    RUN go build -o main .
    
    
    # ----------------------
    FROM alpine:latest as runner
    
    RUN apk --no-cache add ca-certificates
    
    #WORKDIR /app
    COPY --from=builder /app/main .
    COPY --from=builder /app/.env ./.env
    COPY --from=builder /app/static ./static/
    COPY --from=builder /app/config/ ./config/
    
    EXPOSE 8080
    CMD ["/main"]
    