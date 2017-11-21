#!/bin/bash

set -ev

ng build --target=production --environment=prod;
firebase deploy --project=prod --token "$FIREBASE_TOKEN" --non-interactive

exit 0;
