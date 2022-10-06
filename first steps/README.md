# first steps
run 'npm start' here to run the fullstack

You will need to set up your own MongoDB cluster and put the connection string in a '.env' file in the backend folder.

E.g.  
PORT=2000  
NODE_ENV=development  
DB_URI=mongodb+srv://\<username\>:\<password\>@cluster0.2dbpd.mongodb.net/Ancestry?retryWrites=true&w=majority

A dummy data generator is enabled by default so there is no need for your own data.  
Turn off the generator here:   
backend/bin/www -> line 28

Control dummy data size here:   
backend/data/people.data.js -> line 5