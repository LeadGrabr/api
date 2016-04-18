# api


# Transfer data from dev to prod:

sudo mongodump --host=127.0.0.1 -d leadgrabr-dev -u leadgrabr-dev -p <password> --verbose
sudo mongorestore --host=127.0.0.1 -d leadgrabr-prod -u leadgrabr-prod -p <password> --verbose --drop dump/leadgrabr-dev/
