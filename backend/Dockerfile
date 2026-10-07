FROM golang:1.27.1-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY cmd/ cmd/
COPY internal/ internal/
# The commit /health serves and judges against main. A build without it says
# "inconnu", which the probe reports rather than passing for up to date.
ARG COMMIT=inconnu
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w -X main.commit=${COMMIT}" -o cleanpoker-server ./cmd/server

FROM alpine:3.24
RUN addgroup -S app && adduser -S app -G app && mkdir -p /data && chown app:app /data
COPY --from=builder /app/cleanpoker-server /cleanpoker-server
USER app
EXPOSE 8080
ENTRYPOINT ["/cleanpoker-server"]
