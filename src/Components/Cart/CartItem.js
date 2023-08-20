import CartButton from "./CartButton";
import styles from "./CartItem.module.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useContext } from "react";
import CartContext from "../../Storage/Cart-Context";
// import AuthContext from "../../Storage/Auth-Context";

// import { db } from "../../firebase-store/firebase-config";

const CartItem = (props) => {
  const cartCntx = useContext(CartContext);
  // const authCntx = useContext(AuthContext);
  

  const itemRemoveHandler = () => {
    cartCntx.removeFromCart(props.id);

    props.onUpdateDatabase({
      mealItems: cartCntx.mealItems,
      noOfItems: cartCntx.noOfItems,
      totalPrice: cartCntx.totalPrice,
    });
  };
  const itemAddHandler = () => {
    const item = {
      quantity: 1,
      id: props.id,
      img: props.img,
      name: props.name,
      price: props.price,
    };
    cartCntx.addToCart(item);
    props.onUpdateDatabase({
      mealItems: cartCntx.mealItems,
      noOfItems: cartCntx.noOfItems,
      totalPrice: cartCntx.totalPrice,
    });
  };
  return (
    <div className={styles.cart_item}>
      <div className={styles.cart_food}>
        <div className={styles.cart_food_logo}>
          <img src={props.img} alt="Your Food" />
        </div>
        <div className={styles.cart_food_info}>
          <h3>{props.name}</h3>
          <p>
            <span className={styles.align}>
              <CurrencyRupeeIcon />
              {props.price}
            </span>
            <span>
              <CartButton label="x1">{`x${props.quantity}`}</CartButton>
            </span>
          </p>
        </div>
      </div>
      <div className={styles.cart_button}>
        <span>
          <CartButton label="-" onClick={itemRemoveHandler}>
            <RemoveIcon />
          </CartButton>
        </span>
        <span>
          <CartButton label="+" onClick={itemAddHandler}>
            <AddIcon color="success" />
          </CartButton>
        </span>
      </div>
      {/* <div className={styles.line_thro} ></div> */}
    </div>
  );
};
export default CartItem;
