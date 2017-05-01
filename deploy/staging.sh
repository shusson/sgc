#!/bin/bash

set -ev

ng build --target=production --environment=staging --aot;
firebase deploy --project=staging --token "$FIREBASE_TOKEN"
protractor --baseUrl=https://sgc-staging-bbdf9.firebaseapp.com

exit 0;
