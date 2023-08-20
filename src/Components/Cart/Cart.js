import styles from "./Cart.module.css";
import Button from "../UI/Button";
import Container from "../UI/Container";
import CartItem from "./CartItem";
import { useContext } from "react";
import CartContext from "../../Storage/Cart-Context";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import emptyImg from "../../Assets/empty.jpg";
import Modal from "../UI/Modal";
import AuthContext from "../../Storage/Auth-Context";
import { doc, setDoc,serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-store/firebase-config";


const Cart = (props) => {
  const cartCntx = useContext(CartContext);
  const authCntx = useContext(AuthContext);
  
  const meals = cartCntx.mealItems;
  const totalPrice = cartCntx.totalPrice.toFixed(2);
  let title = <h3>Order Now! It's Delicious❤</h3>;
  let emptyContent;
  if (cartCntx.noOfItems === 0) {
    title = <h3> Oops! Empty Cart</h3>;
    emptyContent=<div className={styles.empty_logo}>
      <img src={emptyImg}  alt="Empty Content Img"/>
    </div>
  }
  const { userId } = authCntx;
  const updateCartInDataBase = async (updatedCart) => {
    await setDoc(doc(db, "carts", `${userId}`), updatedCart);
  };
  const updateOrdersInDataBase = async (newOrder) => {
    await setDoc(doc(db, "orders", `${userId}`), newOrder);
  };

  const orderHandler = () => {
    props.modalCloseHandler();
    updateCartInDataBase({
      mealItems: [],
      noOfItems: 0,
      totalPrice: 0,
    })
    updateOrdersInDataBase({
      mealItems: cartCntx.mealItems,
      totalPrice: cartCntx.totalPrice,
      timeStamp: serverTimestamp(),
    })
    cartCntx.removeAllFromCart();
    alert("Order Successful");
  };

  return (
    <div className={styles.modal__control}>
      {(document.body.style.overflow = "hidden")}
      <Modal onClick={props.modalCloseHandler} />
      <Container className={styles.modal}>
        <header className={styles.modal__title}>{cartCntx.noOfItems ===0 ?emptyContent:title}</header>
        <div className={styles.main}>
          {meals.map((meal) => (
            <CartItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              price={meal.price}
              img={meal.img}
              quantity={meal.quantity}
              onUpdateDatabase={updateCartInDataBase}
            />
          ))}
        </div>
        {cartCntx.noOfItems > 0 && (
          <div className={styles.amount}>
            <span>Total Amount</span>
            <span className={styles.align_center}>
              <CurrencyRupeeIcon fontSize="large" />
              {totalPrice}
            </span>
          </div>
        )}
        <footer className={styles.action}>
          <Button
            className={styles.action_close}
            onClick={props.modalCloseHandler}
            name={"Close"}
          >
            Close
          </Button>
          {cartCntx.noOfItems > 0 && (
            <Button
              className={styles.action_order}
              name={"Order"}
              onClick={orderHandler}
            >
              Order
            </Button>
          )}
        </footer>
      </Container>
    </div>
  );
};
export default Cart;
