#!/bin/bash

set -ev

ng build --target=production --environment=staging --aot;
firebase deploy --project=staging --token "$FIREBASE_TOKEN" --non-interactive

exit 0;
