import Container from "./Container";
import Modal from "./Modal";
import styles from "./SignUp.module.css";
import Button from "./Button";
import { useContext, useRef, useState } from "react";
import AuthContext from "../../Storage/Auth-Context";


const SignUp=props=>{

    const enteredEmail=useRef();
    const enteredPassword=useRef();
    const enteredConfPassword=useRef();
    const [isValid,setIsValid]=useState(true);
    const authCntx=useContext(AuthContext);
    let inValidCode=<p style={{textAlign:"center",color:"red"}}>Invalid password</p>
    const singUpHandler=(event)=>{
        event.preventDefault();
        const email=enteredEmail.current.value.trim();
        const password=enteredPassword.current.value.trim();
        if(password !== enteredConfPassword.current.value.trim()){
            setIsValid(false);
            return;
        }
        if(email.length>10 && email.includes('@gmail.com') && password.length>=6){
            //send data to create new user in database
            authCntx.login({type:"signup", email:email, password:password});
        }
        else{
            setIsValid(false);
            inValidCode=<p style={{textAlign:"center",color:"red"}}>Invalid email</p>
            return;
        }
    }
    const switchPageHandler=()=>{
        props.onToggle("signin");
    }

    return(
        <div>
            <Modal onClick={props.modalCloseHandler}/>
            {document.body.style.overflow="hidden"}
            <Container className={styles.signup_container}>
                <div className={styles.signup}>
                    <h3>Sign up</h3>
                    <p onClick={switchPageHandler}>or login to your account</p>
                </div>
                
                <form className={styles.signup_form}>
                    <div className={styles.signup_form_items}>
                        {/* <label>Username</label> */}
                        <input type="text"  placeholder="ashish@"/>
                    </div>
                    <div className={styles.signup_form_items}>
                        {/* <label>Email</label> */}
                        <input type="email"  ref={enteredEmail}  placeholder="name@gmail.com" required/>
                    </div>
                    <div className={styles.signup_form_items}>
                        {/* <label>Set Password</label> */}
                        <input type="password" ref={enteredPassword}  placeholder="Set your password" required/>
                    </div>
                    <div className={styles.signup_form_items}>
                        {/* <label>Confirm Password</label> */}
                        <input type="password" ref={enteredConfPassword}  placeholder="Confirm your password" required/>
                    </div >
                    <Button className={styles.action} name={"Agree and Join"} onClick={singUpHandler} style={{with:"100%"}}/>
                    {!isValid && inValidCode}
                </form>
            </Container>
        </div>
    )
}
export default SignUp;