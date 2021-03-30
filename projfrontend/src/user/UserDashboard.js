import React from 'react';

//2nd we import the base
import Base from '../core/Base'

//1st we create this function component
const UserDashboard = () => {
    return (

        //3rd we include the <Base> tags
        //4th we go to the file Routes.js 
        <Base title="User dashboard">
            <h1>Welcome to user dashboard</h1>
        </Base>
        
    )
}

export default UserDashboard;