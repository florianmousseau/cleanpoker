FROM golang:1.25-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY cmd/ cmd/
COPY internal/ internal/
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o cleanpoker-server ./cmd/server

FROM alpine:3.21
RUN addgroup -S app && adduser -S app -G app && mkdir -p /data && chown app:app /data
COPY --from=builder /app/cleanpoker-server /cleanpoker-server
USER app
EXPOSE 8080
ENTRYPOINT ["/cleanpoker-server"]
