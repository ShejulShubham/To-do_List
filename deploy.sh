# Start the server
# cd $HOME/To-do_List/todo_list-server/
cd todo_list-server/
npm install
pm2 start server.js --name my-server

# Build the React app
# cd $HOME/To-do_List/todo_list
cd ../todo_list/
npm install
npm run build
yarn start


# Optional: Using pm2
# npm install -g pm2
# pm2 start server.js --name my-express-server
# pm2 startup
# pm2 save
