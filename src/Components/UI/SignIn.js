import styles from "./SignUp.module.css";
import Button from "./Button";
import Modal from "./Modal";
import Container from "./Container";
import { useState, useRef ,useContext} from "react";
import AuthContext from "../../Storage/Auth-Context";
const SignIn = (props) => {
  //   const [signup, setSignup] = useState(false);
  const enteredEmail = useRef();
  const enteredPassword = useRef();
  const [isValid, setIsValid] = useState(true);
  const authCntx = useContext(AuthContext);
  let inValidCode = (
    <p style={{ textAlign: "center", color: "red" }}>Invalid input</p>
  );

  const singInHandler = (event) => {
    event.preventDefault();
    const email = enteredEmail.current.value.trim();
    const password = enteredPassword.current.value.trim();
    if (
      email.length > 10 &&
      email.includes("@gmail.com") &&
      password.length >= 6
    ) {
      //send data to create new user in database
      authCntx.login({ type: "signin", email: email, password: password });
    } else {
      setIsValid(false);
      return;
    }
  };

  const switchPageHandler = () => {
    props.onToggle("signup");
  };
  return (
    <div>
      <Modal onClick={props.modalCloseHandler} />
      <Container className={styles.signup_container}>
        <div className={styles.signup}>
          <h3>Sign in</h3>
          <p onClick={switchPageHandler}>or create an account</p>
        </div>

        <form className={styles.signup_form}>
          <div className={styles.signup_form_items}>
            {/* <label>Email</label> */}
            <input type="email" ref={enteredEmail} placeholder="name@gmail.com" />
          </div>
          <div className={styles.signup_form_items}>
            {/* <label>Set Password</label> */}
            <input type="password" ref={enteredPassword} placeholder="Set your password" />
          </div>
          <Button
            className={styles.action}
            name={"Sign In"}
            onClick={singInHandler}
          />
          {!isValid && inValidCode}
        </form>
      </Container>
    </div>
  );
};
export default SignIn;
