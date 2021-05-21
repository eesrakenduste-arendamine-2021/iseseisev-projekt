import React, {useRef} from 'react'
import {auth} from '../firebase/config';
import './Login.css'

const Login = () => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const signIn = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then(user => {
            console.log(user)
        }).catch(err => {
            console.log(err)
        })
    }


return (
    <div className="login">
    <form action="">
            <h1>Logi sisse härra</h1>
            <input ref={emailRef} type="email"/>
            <input ref={passwordRef} type="password"/>
            <button onClick={signIn}>Logi sisse</button>
        </form>
    </div>
)
}
export default Login