import React from 'react';
import ImageHelper from './helper/ImageHelper';
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";


//TODO: deal with this later
const isAuthenticated = true;



const Card = ({
    //project is coming from Home.js project={project} and initially from Python folder "api/project"
    project,
    addtoCart = true,
    removeFromCart = false
}) => {

    const cartTitle = project ? project.description : "A photo from Finnabee"
    const cartDescription = project ? project.borrower_surname : "Default borrower name"
    const cartPrice = project ? project.price : "Default price"

    //create a method to just allow the add to cart function if the user is logged in
    const addToCart = () => {
        if (isAuthenticated) {
            addItemToCart(project, () => {})
            console.log("Added to cart")
        } else {
            console.log("Login first")
        }
    }
    //create another method to redirect the user to the cart
    const getAredirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    };

    const showAddToCart = (addToCart) => {
        return (

            // if the user is authenticated show add to cart button
            addToCart && (
                <button
                    onClick={addToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                    >
                Add to Cart
              </button>
            )
        );
    };
    
    const showRemoveFromCart = (removeFromCart) => {
        return(
            removeFromCart && (
                <button
                    onClick={() => {
                       
                        removeItemFromCart(project.id)
                        console.log("product removed from card")
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                    >
                    Remove from cart
              </button>
            )

        )
    }



    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cartTitle}</div>
        <div className="card-body">

        <ImageHelper project={project}/>

          {/* <div className="rounded border border-success p-2">
            <img
              src="https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="photo"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-3 rounded"
            />
          </div> */}
          <p className="lead bg-success font-weight-normal text-wrap">
            {cartDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
          <div className="row">
            <div className="col-12">
            
                {/* this part btw brackets (showAddToCart) is to conditionaly render the button add to cart */}
                {showAddToCart(addToCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Card;