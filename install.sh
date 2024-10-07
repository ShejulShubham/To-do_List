echo "Downloading latest NodeJS"
sudo apt update
sudo apt install curl
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs
node -v
npm -v