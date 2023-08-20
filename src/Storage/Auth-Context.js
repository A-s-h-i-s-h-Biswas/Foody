import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase-store/firebase-config";

const AuthContext = React.createContext({
  token: "",
  userId: "",
  login: (data) => {},
  logout: () => {},
  isLogin: false,
});
export default AuthContext;

export const AuthProvider = (props) => {
  const [userToken, setUserToken] = useState();
  const [userId, setUserId] = useState();
  // const [user, setUserId] = useState();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const isAlreadyLoggedIn = localStorage.getItem("token");
    if (isAlreadyLoggedIn) {
      setIsLogin(true);
      setUserId(localStorage.getItem("userId"));
      setUserToken(localStorage.getItem("token"));
    }
  }, []);

  const authenticUser = (data) => {
    // const auth = getAuth();
    data
      .type(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);
        setIsLogin(true);
        setUserId(user.uid);
        setUserToken(user.accessToken);

        // store in localstorage to hold the auth state
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("userId", user.uid);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  };
  const loginHandler = (userData) => {
    //check credintial of user from firebase
    if (userData.type === "signup") {
      authenticUser({
        type: createUserWithEmailAndPassword,
        email: userData.email,
        password: userData.password,
      });
    } else {
      authenticUser({
        type: signInWithEmailAndPassword,
        email: userData.email,
        password: userData.password,
      });
    }
    //..........................................
    //if success save credintial to localstorage to keep the auth state
    //................hanle by function itselt........................................
    //if request success made this
    
  };
  const logoutHandler = () => {
    //remove use credintial from local-storage/clint site
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLogin(false);
    setUserToken("");
    setUserId("");
  };

  return (
    <AuthContext.Provider
      value={{
        userId: userId,
        token: userToken,
        isLogin: isLogin,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
