import React, {useState, useEffect} from 'react';
import {getProducts} from "./helper/coreapicalls";
import Base from "./Base";

import "../styles.css";
import Card from "./Card";

export default function Home() {

    //the [products, setProducts] are like to boxes. The "products" would be like what do you want to put inside and 
    // the "setProducts" would be how do we want to get access to that.
    //useState enables us to add state to function components. 
    const [products, setProducts] = useState([]);

    // we are setting (false) as default assuming that there is no error.
    const [error, setError] = useState(false)

    //now we need to be able to load all above information from the "const"
    const loadAllProducts = () => {
        getProducts()

        //check if the data was successfuly received
        .then(data => {

            //if we have an error on the data received
            if(data.error) {
                setError(data.error)
                console.log(error)

            // if the data was successfuly received    
            } else {
                setProducts(data)              
            }
        });
    };

    //The useEffect Hook lets us perform side effects in function components: Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects. 
    // We you can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined.
    useEffect(() => {
        loadAllProducts();
    } , [])

    return (

        //Base is the children defined in the file "Base" and title="..." are the properties
        //title is accessing the "title" propreties defined in the file Base.js in the row 4 and now changing the initial value of "my title" by "Home"
        <Base title="Home" description="Welcome to the Amazon of Healtcare products and services">
            <h1>Home component</h1>
            <div className="row">

                {/*the "products.map" display the products and "index" does not allow to display more than once*/}
                {products.map((project, index) => {
                    return(
                        <div key={index} className="col-4 mb-4">

                        <Card project={project}/>

                            {/* the "project" is the name of the file http://127.0.0.1:8000/api/project/ and "description" is the name of one column created in the database within models in python*/}
                            {/*<h1>{project.description}</h1>*/}
                        </div>
                    )
                })}
            </div>
        </Base>
    )
}
