#!/bin/bash

set -ev

ng build --target=production --environment=staging;
firebase deploy --project=staging --token "$FIREBASE_TOKEN" --non-interactive

exit 0;
