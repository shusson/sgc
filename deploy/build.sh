#!/bin/bash

set -ev

ng build --target=production --environment=staging --aot;
tar -cvzf stag.tar.gz dist

ng build --target=production --environment=prod --aot;
tar -cvzf prod.tar.gz dist

exit 0;
