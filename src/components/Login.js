/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { loginUser, getAllUsers, getCart } from "./api-services";
import { useEffect, useState } from "react";

function Login( { cartEndpoint, setCurrentCart } ) {
    const [success, setSuccess] = useState("");
    const [loginFail, setLoginFail] = useState("");

    const [inputs, setInputs] = useState(null);

    const navigate = useNavigate();
    useEffect(()=>{
        const attemptLogin = async () => {
            const response = await loginUser( inputs );
            if( response.token ) {
                const accounts = await getAllUsers();
                const [matchedAccount] = accounts.filter( user => user.username === inputs.username );

                // get cart to add shopping functionality
                const cart = await getCart( matchedAccount.id );

                // update localStorage to be used to find account on site visit
                localStorage.setItem(cartEndpoint, JSON.stringify(cart) );

                setCurrentCart( cart.products );

                // update user on UI
                setSuccess(`Logged in successfully, welcome ${matchedAccount.name.firstname}`);

                // after successful login, route user to home page
                setTimeout(()=>navigate("/"),3000);
            } else {
                // login failed
                setLoginFail("Incorrect username or password");
            }
        };
        // only attempt login after inputs are received
        if( inputs ) { attemptLogin(); }
    // updates when new input is entered
    },[inputs]);

    const handleSubmit = event => {
        event.preventDefault();

        // reset pass/fail states on new login attempt
        setSuccess("");
        setLoginFail("");

        // get data from form
        const data = new FormData( event.target );

        // update received inputs
        const newLoginAttempt = {
            username:data.get("username"),
            password:data.get("password")
        };
        setInputs( newLoginAttempt );
    };

    return (
        <div id="loginForm-container">
            { success && <p>{success}</p> }
            { loginFail && <p>{loginFail}</p> }
            <form id="loginForm" onSubmit={event => handleSubmit(event) } >
                <label className="loginFormText" htmlFor="username" >Username: </label>
                <input id="username" name="username" className="loginFormInput" />

                <label className="loginFormText" htmlFor="password" >Password: </label>
                <input id="password" name="password" className="loginFormInput" />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;
