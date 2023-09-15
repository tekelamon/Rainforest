function Signup() {
    // connect to api to authenticate responses
    // although actual accounts will not be made
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
