/*
    Used to help Signup.js look a bit cleaner by abstracting out ideas
    Just a container for data where specifics are not as useful as the idea they represent
*/

const FormText = ( {makeUser} ) => { 
    // single control used for input length in form
    const MAX_LENGTH = 50;

    return (
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
                maxLength={MAX_LENGTH}
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

            <button type="submit">Submit</button>
        </form>
    )
};

const validate = ({email, phoneNumber, password}) => {
    // name and address will be skipped, they could theoretically be anything
    // username is up to the user
    // ensure email, phone number, and password fit pattern
    // for contact and security

    let validEmail = false;
    // '@' and '.' will be used to verify an email address
    // matches anything in the form text@example.com where
    // the length of each string may vary but at least 1 char is required
    const emailRequirements = /^\w+@\w+\.\w+$/;

    let validPhone = false;
    // matches any string in the form +1(555)-555-5555 where the +1, (, ) and -'s are optional
    // assumes 10 digit U.S. phone number
    const phoneRequirements = /^(\+1)?\(?\d{3}\)?-?\d{3}-?\d{4}$/;

    let validPassword = false;
    // matches any string that is at least 8 characters and all alphanumeric or symbols
    const passwordRequirements = /^(\w|[^\w\s]){8,}$/;

    if( email.match( emailRequirements ) ) { validEmail = true; }

    if( phoneNumber.match( phoneRequirements ) ) { validPhone = true; }

    if( password.match( passwordRequirements ) ) { validPassword = true; }

    return {validEmail, validPhone, validPassword};
};

export {
    FormText,
    validate
}
