#!/bin/bash

set -e -x

npm run-script dev-build

npm run-script test:only
