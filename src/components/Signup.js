import { useState, useEffect } from "react";
import { createUser } from "./api-services";

function Signup() {
    const [user, setUser] = useState({});

    const MAX_LENGTH = 50;

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

    const validate = ({email, phoneNumber, password}) => {
        // name and address will be skipped, they could theoretically be anything
        // username is up to the user
        // ensure email, phone number, and password fit pattern
        // for contact and security

        let validEmail = false;
        // matches anything in the form text@example.com where each char_str can be up to 50 characters
        const emailRequirements = /^\w{1,50}@\w{1,50}\.\w{1,50}$/;

        let validPhone = false;
        // matches any string in the form +1(555)-555-5555 where the +1, (, ) and -'s are optional
        const phoneRequirements = /(\+1)?\(?\d{3}\)?-?\d{3}-?\d{4}/;

        let validPassword = false;
        // matches any string that is 8 to 16 characters and all alphanumeric or symbols
        const passwordRequirements = /(\w|[^\w\s]){8,16}/;

        if( email.match( emailRequirements ) ) { validEmail = true; }

        if( phoneNumber.match( phoneRequirements ) ) { validPhone = true; }

        if( password.match( passwordRequirements ) ) { validPassword = true; }

        return {validEmail, validPhone, validPassword};
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

        // validate required inputs
        const {validEmail, validPhone, validPassword} = validate( inputs );
        if( validEmail && validPhone && validPassword ) {
            // send user data to api
            setUser( inputs );
            // send update to user
            console.log( "user created successfully" );
        } else {
            // TODO conditionally render requirements for each failing field
            console.log( "failed to make user" )
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
                    required
                    className="signupFormInput"
                    type="text"
                    id="firstName"
                    name="firstName"
                    maxLength={MAX_LENGTH}
                />
                <label
                    htmlFor="lastName"
                    className="signupFormText"
                >Last Name: </label>
                <input
                    required
                    className="signupFormInput"
                    type="text"
                    id="lastName"
                    name="lastName"
                    maxLength={MAX_LENGTH}
                />

                {/* Shipping info */}
                <p>Where did you want us to send the goods?</p>
                <label
                    htmlFor="city"
                    className="signupFormText"
                >City: </label>
                <input
                    required
                    className="signupFormInput"
                    type="text"
                    id="city"
                    name="city"
                    maxLength={MAX_LENGTH}
                />
                <label
                    htmlFor="street"
                    className="signupFormText"
                >Street: </label>
                <input
                    required
                    className="signupFormInput"
                    type="text"
                    id="street"
                    name="street"
                    maxLength={MAX_LENGTH}
                />
                <label
                    htmlFor="zip"
                    className="signupFormText"
                >Zip Code: </label>
                <input
                    required
                    className="signupFormInput"
                    type="text"
                    id="zip"
                    name="zip"
                    maxLength={MAX_LENGTH}
                />

                {/* Contact info */}
                <p>And how can we reach you?</p>
                <label
                    htmlFor="email"
                    className="signupFormText"
                >Email: </label>
                <input
                    required
                    className="signupFormInput"
                    type="email"
                    id="email"
                    name="email"
                    maxLength={MAX_LENGTH}
                />
                <label
                    htmlFor="phoneNumber"
                    className="signupFormText"
                >Phone Number: </label>
                <input
                    required
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
                    required
                    className="signupFormInput"
                    type="text"
                    id="username"
                    name="username"
                    maxLength={MAX_LENGTH}
                />
                <label
                    htmlFor="password"
                    className="signupFormText"
                >Password: </label>
                <input
                    required
                    className="signupFormInput"
                    type="password"
                    id="password"
                    name="password"
                    maxLength={MAX_LENGTH}
                />

                <input id="signupFormSubmit" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Signup;
