import { useState, useEffect } from "react";
import { createUser } from "./api-services";

function Signup() {
    const [user, setUser] = useState({});

    // send user data to api for creation
    useEffect(()=>{
        const sendUserData = async () => {
            const response = await createUser( user );
            // output response status from api
            console.log( {response} );
        };
        sendUserData();
    // updates when a user is created
    },[user]);

    const validate = inputs => {
        // TODO validate each field
        const data = {isValid:true} // temp response for testing
        return data;
    };

    const makeUser = event => {
        event.preventDefault();

        // get formData
        const data = new FormData( event.target );

        // create user with data
        const inputs = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),

            email: data.get("email"),
            phoneNumber: data.get("phoneNumber"),

            city: data.get("city"),
            street: data.get("street"),
            zip: data.get("zip"),

            username: data.get("username"),
            password: data.get("password")
        };

        // validate each field
        const fields = validate( inputs );
        if( fields.isValid ) {
            // send user data to api
            setUser( inputs );
            // send update to user
        } else {
            // TODO send message for each failing field and their requirements
        }
    };

    return (
        <div id="signupForm-container">
            <form id="signupForm" onSubmit={ event => makeUser( event ) } >
                {/* Name */}
                <p>Nice to meet you! Your name is?</p>
                <label
                    htmlFor="firstName"
                    className="signupFormText"
                >First Name: </label>
                <input
                    className="signupFormInput"
                    type="text"
                    id="firstName"
                    name="firstName"
                />
                <label
                    htmlFor="lastName"
                    className="signupFormText"
                >Last Name: </label>
                <input
                    className="signupFormInput"
                    type="text"
                    id="lastName"
                    name="lastName"
                />

                {/* Shipping info */}
                <p>Where did you want us to send the goods?</p>
                <label
                    htmlFor="city"
                    className="signupFormText"
                >City: </label>
                <input
                    className="signupFormInput"
                    type="text"
                    id="city"
                    name="city"
                />
                <label
                    htmlFor="street"
                    className="signupFormText"
                >Street: </label>
                <input
                    className="signupFormInput"
                    type="text"
                    id="street"
                    name="street"
                />
                <label
                    htmlFor="zip"
                    className="signupFormText"
                >Zip Code: </label>
                <input
                    className="signupFormInput"
                    type="text"
                    id="zip"
                    name="zip"
                />

                {/* Contact info */}
                <p>And how can we reach you?</p>
                <label
                    htmlFor="email"
                    className="signupFormText"
                >Email: </label>
                <input
                    className="signupFormInput"
                    type="text"
                    id="email"
                    name="email"
                />
                <label
                    htmlFor="phoneNumber"
                    className="signupFormText"
                >Phone Number: </label>
                <input
                    className="signupFormInput"
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                />

                {/* Account info */}
                <p>Lastly, how do you want to sign in?</p>
                <label
                    htmlFor="username"
                    className="signupFormText"
                >Username: </label>
                <input
                    className="signupFormInput"
                    type="text"
                    id="username"
                    name="username"
                />
                <label
                    htmlFor="password"
                    className="signupFormText"
                >Password: </label>
                <input
                    className="signupFormInput"
                    type="text"
                    id="password"
                    name="password"
                />

                <input id="signupFormSubmit" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Signup;
