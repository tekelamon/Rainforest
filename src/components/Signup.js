import { useState, useEffect } from "react";
import { createUser } from "./api-services";

function Signup() {
    const [user, setUser] = useState({});

    // connect to api to authenticate responses
    useEffect(()=>{
        const testUser = {
            firstName:'John',
            lastName:'Doe',

            email:'example@gmail.com',
            phoneNumber:'1-555-555-5555',

            city:'middle',
            street:'of nowhere',
            zip:'9001',

            username:'test',
            password:'testpass'
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

    // TODO set form action to create user and send to api
    return (
        <div id="signupForm-container">
            <form id="signupForm">
                <p>Nice to meet you! Your name is?</p>
                {/* Name */}
                <label
                    htmlFor="firstName"
                    className="signupFormText"
                >First Name: </label>
                <input
                    className="signupFormInput"
                    type="text"
                    id="firstName"
                />
                <label
                    htmlFor="lastName"
                    className="signupFormText"
                >Last Name: </label>
                <input
                    className="signupFormInput"
                    type="text"
                    id="lastName"
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
                />
                <label
                    htmlFor="street"
                    className="signupFormText"
                >Street: </label>
                <input
                    className="signupFormInput"
                    type="text"
                    id="street"
                />
                <label
                    htmlFor="zip"
                    className="signupFormText"
                >Zip Code: </label>
                <input
                    className="signupFormInput"
                    type="text"
                    id="zip"
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
                />
                <label
                    htmlFor="phoneNumber"
                    className="signupFormText"
                >Phone Number: </label>
                <input
                    className="signupFormInput"
                    type="text"
                    id="phoneNumber"
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
