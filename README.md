# Gallery app

There is a login page with email and password fields.  
A user fills out the fields and clicks on the login button.  
The app sends a POST request to ```https://hjdjs55gol.execute-api.us-east-1.amazonaws.com/api/login```
with user data.

Server sends back a token or an error message.  
The token will be expired after 10 minutes.

After authorization is finished the app sends a GET request to ```https://hjdjs55gol.execute-api.us-east-1.amazonaws.com/api/gallery```  
Server sends back images urls. The app wrap them into html and displays to the user.

# Project structure

The project has the next folders:

- data - contains additional data
- gallery - module that is responsible for getting images from a server and rendering them
- login - module that is responsible for validating user input and login
- services - contains additional services

There are two main modules: gallery and login.

Each module has a handler that uses manager methods.
Manager methods use service methods.

# Launching

Run a local server.
Open login/login.html page.

For example:
```http://127.0.0.1:5500/login/login.html```

Enter a valid email and password and click on the login button.  
A first page of a gallery will be opened:

```http://127.0.0.1:5500/gallery/gallery.html?page=1```