#!/bin/bash

echo "Generating Docker Compose Env file"
sed -e "s;%USERNAME%;$1;g" -e "s;%PASSWORD%;$2;g" \
    -e "s;%DATABASE%;$3;g" -e "s;%PATH%;$5;g" \
    env.template > .env

echo "Generating API Config"
sed -e "s;%BASE_PATH%;$4;g" \
    api.config.ts.template > src/app/client/api.config.ts
