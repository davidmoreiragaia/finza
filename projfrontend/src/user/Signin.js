import React, { useState } from 'react';
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";

//we need to bring these methods from the file src/auth/helper/index.js
import { signin, authenticate, isAuthenticated } from '../auth/helper';



const Signin = () => {
    //here we are defining the state
    const [values, setValues] = useState({
        name:"",
        email:"ten@gmail.com",
        password:"1111111111",
        error: "",
        success: false,
        loading: false,
        didRedirect: false,

    })
    const {name, email, password, error, success, loading, didRedirect } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error:false, loading:true});
        
        signin({email, password})
        .then(data => {
            console.log("DATA", data);
            if (data.token) {
                //let sessionToken = data.token;
                authenticate(data, () => {
                    console.log("TOKKEN ADDED")

                    //here we are bringing all the values set in the row 12
                    setValues({
                        ...values,
                        didRedirect: true,
                    });
                });
            } else {
                setValues({
                    ...values,
                    loading: false,

                })
            }
        })
        .catch((e) => console.log(e));
    }


    const performRedirect = () => {
        if (isAuthenticated()) {

            //Rendering a <Redirect> will navigate to a new location. The new location will override the current location in the history stack, like server-side redirects
            return <Redirect to="/" />;
        }
    };

    const loadingMessage = () => {
        return(
            //The || operator returns the first truthy value, and if none are truthy, it returns the last value (which is a falsy value).
            //The && operator returns the first falsy value, and if none are falsy, it return the last value (which is a truthy value).
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        );
    };


    const successMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div 
                    className="alert alert-success"

                    //we will displaay the message below based on the ternary expression to display the message
                    style={{ display: success ? "" : "none" }}
                    >
                        New account created successfully. Please
                        <Link to="/signin"> login now.</Link> 
                    </div>
                </div>
            </div>
        )
    }


    const errorMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div 
                    className="alert alert-danger"

                    //we will displaay the message below based on the ternary expression to display the message
                    style={{ display: error ? "" : "none" }}
                    >
                        Check all fields again.
                    </div>
                </div>
            </div>
        )
    }

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form >
                    
                        <div className="form group">
                            <label className="text-light">Email</label>
                            <input
                            className="form-control"
                            value={email}
                            onChange={handleChange("email")}
                            type="text"/>
                        </div>
                        <div className="form group">
                            <label className="text-light">Password</label>
                            <input
                            className="form-control"
                            value={password}
                            onChange={handleChange("password")}
                            type="password"/>
                        </div>
                        <button
                        onClick={onSubmit}
                        className="btn btn-success btn-block mt-2">Submit</button>
                    </form>
                </div>
            </div>
        )
    }



    return (
        <Base title="Welcome to signin page for you to enter the finza world" description="The Amazon of helthech solutions">
            {loadingMessage()}

            {signInForm()}
            <p className="text-center">{JSON.stringify(values)}</p>
            {performRedirect()}
        </Base>
    )
}

export default Signin;