
//this is to create a method to add items to the local storage
//"next" allows us to do a call back and chain other information
export const addItemToCart = (item, next) => {

    //now to define an empty array for the cart
    let cart = []

    //check is there is some information saved in the cart using "window" object
    if (typeof window !== undefined) {

        //if there is something saved in the localstorage we need to access it in the cart
        if (localStorage.getItem("cart")) {

            //in case there is something in the "cart" we can save it in the array above created "cart"
            cart = JSON.parse(localStorage.getItem("cart")) 
        }

        //otherwise, if there is nothing prior in the cart we will use the method "...item" to add our item in the cart
        cart.push({
            ...item
        });

        //now we want to access the new item saved in the local storage
        localStorage.setItem("cart", JSON.stringify(cart));
        next();
    }
};

//now we have to load all information that was put in the localstorage
export const loadCart = () => {
    if (typeof window !== undefined) {

        //now we want to grab the cart items from localstorage
        if (localStorage.getItem("cart")) {

            //and if items exist in the cart we want to return then with "parse"
            //The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string. An optional reviver function can be provided to perform a transformation on the resulting object before it is returned.
            return JSON.parse(localStorage.getItem("cart"));
        }
    } 
}

//here we create a method to remove the items from the cart
//in this case we will pass the "productId" to identify which product it is
export const removeItemFromCart = (productId) => {

    //first we will create an empty array and check if there is any product there or not
    let cart = []
    if (typeof window !== undefined) {

        //this meand that if is not undefined then it is define therefore it exists a product hence we will garb it using local storage.
        if (localStorage.getItem("cart")) {

            //if there is any item in the cart we are now saving it in the array named "cart"
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        //now we need to identify the IDs of each product. To this purpose we can use any of theses methods: map, slice, filter among others 
        cart.map((project, i) => {
            if (project.id === productId) {

                //"cart.splice(i, 1)" method removes 1 element from the array cart and, returning the deleted elements.
                cart.splice(i, 1)
            }
        });
        // Now we have to update the local storage with the actual number of items after being removed from cart
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    return cart;
};

export const cartEmpty = (next) => {
    if (typeof window !== undefined) {
        localStorage.removeItem("cart")

        //as to clear the cart we need to have some product in the cart otherwise this would give an error
        //we have then the include this method again
        let cart = []
        localStorage.setItem("cart", JSON.stringify(cart));

        //and we end up instructing to proceed with the "next" steps
        next();
        
    }
}