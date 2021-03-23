import {API} from "../../backend"

export const getProducts = () => {

    //fetch gives a promisse.
    // The Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses. It also provides a global fetch() method that provides an easy, logical way to fetch resources asynchronously across the network.
    //this (`${API}product`) is equal to http://localhost:3000/api/product
    return fetch(`${API}project`, {method: "GET"})

    //The .then() method takes up to two arguments; the first argument is a callback function for the resolved case of the promise, and the second argument is a callback function for the rejected case.
    //A .catch() is really just a .then() without a slot for a callback function for the case when the promise is resolved.
    //Response provides multiple promise-based methods to access the body in various formats:
    //response.json() – parse the response as JSON
    .then((response) => {
        return response.json();
    })
    .catch((err )=> console.log(err))

};