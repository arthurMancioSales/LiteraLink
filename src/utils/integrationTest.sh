#!/bin/bash
WEB_SERVER_HOST="web-test"
WEB_SERVER_PORT="6060"
TIMEOUT=20

SECONDS=0

until curl -sSf "http://${WEB_SERVER_HOST}:${WEB_SERVER_PORT}" >/dev/null; do
    if [ $SECONDS -ge $TIMEOUT ]; then
        echo 'Timeout: Web server did not become available within $TIMEOUT seconds.'
        exit 1
    fi

    echo 'Waiting for the web server to start...'
    sleep 1
    SECONDS=(${SECONDS} + 1)
done

npm run test
