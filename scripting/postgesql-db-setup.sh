# !/bin/bash
# ------------------------------------------------------------------
VERSION=0.1.0
USAGE="Usage: sudo bash postgresql-db-setup.sh <your-password>"

# --- Options processing -------------------------------------------
if [ $# != 1 ] ; then
    echo "Error: Need to enter a new password for postgres db to proceed!"
    echo $USAGE
    exit 1;
fi

param1=$1

echo "Setting up postgres database..."

echo "Installing postgres db..."
sudo apt update
sudo apt install postgresql postgresql-contrib
echo "Installation finished!"

echo "Starting postres datatbase service..."
sudo service postgresql start

echo "Setting password..."
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '$param1';"

echo "Finished"

echo "Current postgres database status: "
service postgresql status

