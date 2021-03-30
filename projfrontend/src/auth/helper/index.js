import {API} from "../../backend";
import {cartEmpty} from "../../core/helper/cartHelper";

//We will do now a POST request using the method FormData.append()
//https://developer.mozilla.org/en-US/docs/Web/API/FormData/append

//first we will create the signup. An object containing any HTTP headers that you want to pre-populate your Headers object with. This can be a simple object literal with ByteString values; or an existing Headers object. In the last case, the new Headers object copies its data from the existing Headers object.
//The HTTP POST method sends data to the server. The type of the body of the request is indicated by the Content-Type header.
//now we do the creation of headers containing any HTTP headers that we want to pre-populate our Headers object with. This can be a simple object literal with ByteString values; or an existing Headers object. In the last case, the new Headers object copies its data from the existing Headers object.
//now this indicates what data do we want to send to the server 
//if the data sent to server is correct this return whatever data is in Json format
// otherwise this displays an error.
export const signup = (borrowuser) => {
    return fetch(`${API}borrowuser/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(borrowuser),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };


//now we are writing the signin method using "form" data.
export const signin = (borrowuser) => {

    //FormData.append() The append() method of the FormData interface appends a new value onto an existing key inside a FormData object, or adds the key if it does not already exist.
    const formData = new FormData()

    //the "name" is a field in the database model stored in borrowuser
    for(const name in borrowuser) {
        console.log(borrowuser[name]);
        formData.append(name, borrowuser[name]);
    }
   
    // the destructured code below is equal to the code above
    // const { email, password } = borrowuser;
    // const formData = new formData();
    // formData.append('email', email)
    // formData.append('password', password)

    //The FormData.keys() method returns an iterator allowing to go through all keys contained in this object. 
    for(var key of formData.keys()){
        //this will print all keys from the objects above (key-value)
        console.log("MYKEY: ", key)
    }


    //this is the router API that we need to hit
    return fetch(`${API}borrowuser/login/`, {
        method: "POST",
        body: formData,
    })
    .then((response) => {
        console.log("SUCCESS", response);
        return response.json();
    })
    .catch((err) => console.log(err));
};


//here we create the authentication
export const authenticate = (data, next) => {
    if (typeof window !== undefined) {

        // "jwt" is just a random name
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};


//here we check if the user is authenticated.
//jango REST framework IsAuthenticated is a permission class will deny permission to any unauthenticated user, and allow permission otherwise. 
export const isAuthenticated = () => {
    if(typeof window == undefined) {
        return false;
    }

    //here we are comparing if the authentication is equal to the existing in the backend and then returning if it is true or false.
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};


//create a signout method and save the authenticated user ID in the variable userId
export const signout = (next) => {
    const userId = isAuthenticated() && isAuthenticated().user.id;

    if(typeof window !== undefined) {
        localStorage.removeItem("jwt")
        cartEmpty(() => {});
        //next();

        //here we are creatin the logout event fetching a request to the API using the userId
        return fetch(`${API}borrowuser/logout/${userId}`, {
            method:"GET",
        })
        .then( response => {
            console.log("Signout success");
            next();
        })
        .catch((err) => console.log(err))
    }
};