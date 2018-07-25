#!/bin/bash

set -e -x

npm run build
node ./script/fetch-issues.js
