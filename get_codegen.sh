#!/usr/bin/env bash
if [ -z "$1" ]
  then
    echo "Incorrect usage!"
    echo "please provide URL to swagger-codegen-cli.jar as first argument"
    echo "for example"
    echo "npm run linux-codegen http://some-website.com/swagger-codegen-cli.jar"
    echo "."
    echo "."
    echo "you can find the latest SNAPSHOT version of swagger 2.3.0 at:"
    echo "https://oss.sonatype.org/content/repositories/snapshots/io/swagger/swagger-codegen-cli/2.3.0-SNAPSHOT/"
    exit 1
fi
wget $1 -O api/swagger-codegen-cli.jar
