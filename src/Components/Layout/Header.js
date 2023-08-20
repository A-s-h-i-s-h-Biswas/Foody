import { Fragment } from "react";
import styles from "./Header.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cart from "../Cart/Cart";
import { useState, useContext } from "react";
import Badge from "@mui/material/Badge";

import CartContext from "../../Storage/Cart-Context";
import SignUp from "../UI/SignUp";
import SignIn from "../UI/SignIn";
import AuthContext from "../../Storage/Auth-Context";

const Header = (props) => {
  const cartCntx = useContext(CartContext);
  const authCtnx = useContext(AuthContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  const toggleHandler = (type) => {
    if (type === "signup") {
      setSignUpOpen(true);
      setSignInOpen(false);
    } else if (type === "signin") {
      setSignUpOpen(false);
      setSignInOpen(true);
    }
  };

  const modalCloseHandler = () => {
    setModalOpen(false);
    setSignInOpen(false);
    setSignUpOpen(false);
    document.body.style.overflow = "unset";
  };
  const modalOpenHandler = () => {
    setModalOpen(true);
  };
  const openSignInHandler = () => {
    setSignInOpen(true);
  };
  const logoutHandler = () => {
    authCtnx.logout();
    cartCntx.removeAllFromCart();
  };

  return (
    <Fragment>
      <header className={styles.header__control}>
        <div className={styles.header__component}>
          <h2 className={styles["header__component-title"]}>Foody</h2>
        </div>
        <div className={styles.header__component}>
          {modalOpen && <Cart modalCloseHandler={modalCloseHandler} />}
          <span className={styles.innerComp} onClick={modalOpenHandler}>
            <Badge
              badgeContent={cartCntx.noOfItems}
              color="success"
              fontSize="small"
            >
              <ShoppingCartIcon sx={{ fontSize: 30 }} />
            </Badge>
            Cart
          </span>
          {!authCtnx.isLogin && (
            <span onClick={openSignInHandler} className={styles.innerComp}>
              Sign In
            </span>
          )}
          {authCtnx.isLogin && (
            <span onClick={logoutHandler} className={styles.innerComp}>
              Log Out
            </span>
          )}
          {!authCtnx.isLogin && signInOpen && (
            <SignIn
              onToggle={toggleHandler}
              modalCloseHandler={modalCloseHandler}
            />
          )}
          {!authCtnx.isLogin && signUpOpen && (
            <SignUp
              onToggle={toggleHandler}
              modalCloseHandler={modalCloseHandler}
            />
          )}
        </div>
      </header>
      <div className={styles.header__banner}>
        <img
          src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
          alt="Foody banner"
        />
      </div>
    </Fragment>
  );
};

export default Header;
