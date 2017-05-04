#!/bin/bash

set -ev

ng build --target=production --environment=prod --aot;
firebase deploy --project=prod --token "$FIREBASE_TOKEN"

exit 0;
