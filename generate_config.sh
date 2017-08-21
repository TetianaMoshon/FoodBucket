#!/bin/bash

echo "Generating Docker Compose Env file"
sed -e "s;%USERNAME%;$1;g" -e "s;%PASSWORD%;$2;g" \
    -e "s;%DATABASE%;$3;g" \
    env.template > .env
