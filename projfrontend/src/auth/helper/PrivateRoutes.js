//the private routes are meant to restrict the views to some of the users
import React from 'react';
import { Route, Redirect } from 'react-router';
import { isAuthenticated } from "./index"

//this is from documentation row137  https://reactrouter.com/web/example/auth-workflow
const PrivateRoutes = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
        
            //fakeAuth.isAuthenticated
            isAuthenticated()     
                
                ? ( 
                    //children
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />    
    );
};
export default PrivateRoutes;


// export default function PrivateRoutes() {
//     return(
//         <div>

//         </div>
//     )
// }