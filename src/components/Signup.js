import { FormText, validate } from "./signupFormHelpers";

import { useState, useEffect } from "react";
import { createUser } from "./api-services";

function Signup( { userEndpoint, cartEndpoint } ) {
    const [user, setUser] = useState(null);
    const [success, setSuccess] = useState("");
    const [createError, setCreateError] = useState("");

    // toggles for account creation help
    const [showEmailRequirements, setShowEmailRequirements ] = useState(false);
    const [showPhoneNumberRequirements , setShowPhoneNumberRequirements  ] = useState(false);
    const [showPasswordRequirements , setShowPasswordRequirements  ] = useState(false);

    // send user data to api for creation
    useEffect(()=>{
        const sendUserData = async () => {
            const response = await createUser( user );

            // api limitations mean existence of an id is a successful response 
            if( response.id ) {
                // update localStorage
                localStorage.setItem(userEndpoint, JSON.stringify(user) );
                localStorage.setItem(cartEndpoint, JSON.stringify({
                    id:0,
                    userId:0,
                    products:[]
                })); // empty cart to begin shopping with

                setSuccess("Account successfully created. Happy shopping!");
            } else {
                setCreateError("Trouble creating account, please try again.");
            }
        };
        // only send api call if data is present
        if( user ) { sendUserData(); }
    // updates when a user is created
    },[user]);

    const makeUser = event => {
        event.preventDefault();

        // reset state in case of multiple retries
        setSuccess("");
        setCreateError("");

        // get form data
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
            // turn off help flags when successful inputs are received
            setShowEmailRequirements(false);
            setShowPhoneNumberRequirements(false);
            setShowPasswordRequirements(false);

            // update user data
            setUser( inputs );
        } else {
            // update flags for inputs
            validEmail ? setShowEmailRequirements(false) : setShowEmailRequirements(true);
            validPhone ? setShowPhoneNumberRequirements(false) : setShowPhoneNumberRequirements(true);
            validPassword ? setShowPasswordRequirements(false) : setShowPasswordRequirements(true);
        }
    };

    return (
        <div id="signupForm-container">
            {/* pass/fail for api endpoint */}
            { success && <p id="accCreateSuccess">{success}</p>}
            { createError && <p id="accCreateError">{createError}</p>}

            {/* Help for user when creating account */}
            { showEmailRequirements && <p>Email requirements</p>}
            { showPhoneNumberRequirements && <p>Phone number requirements</p>}
            { showPasswordRequirements && <p>Password requirements</p>}

            <FormText makeUser={makeUser} />
        </div>
    )
}

export default Signup;
