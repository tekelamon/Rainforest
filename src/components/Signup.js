import { useState, useEffect } from "react";
import { createUser } from "./api-services";

function Signup() {
    const [user, setUser] = useState({});

    // connect to api to authenticate responses
    useEffect(()=>{
        const testUser = {
            email:'example@gmail.com',
            username:'test',
            password:'testpass',
            firstName:'John',
            lastName:'Doe',
            city:'middle',
            street:'of nowhere',
            zip:'9001',
            phoneNumber:'1-555-555-5555'
        };
        const makeUser = async () => {
            const response = await createUser( testUser );
            setUser( response );
        };
        makeUser();
    },[]);

    // successfully creates but only returns id
    // api documentation states it should contain object with all user data
    console.log( user );

    // TODO update form inputs to match api requirements
    // TODO set form action to create user and send to api
    return (
        <div id="signupForm-container">
            <form id="signupForm">
                <label
                    htmlFor="username"
                    className="signupFormText"
                >Username: </label>
                <input
                    className="signupFormInput"
                    type="text"
                    id="username"
                />
                <label
                    htmlFor="password"
                    className="signupFormText"
                >Password: </label>
                <input
                    className="signupFormInput"
                    type="text"
                    id="password"
                />
                <input id="signupFormSubmit" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Signup;
