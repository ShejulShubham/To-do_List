# Navigate to the project directory
cd /To-do_List

# Start the server
cd todo_list-server
npm install
node server.js

# Build the React app
cd ../todo_list
npm install
npm run build


# Optional: Using pm2
# npm install -g pm2
# pm2 start server.js --name my-express-server
# pm2 startup
# pm2 save
