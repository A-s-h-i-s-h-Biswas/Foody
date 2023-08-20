import styles from "./CartButton.module.css";

const CartButton=props=>{
    return <button className={styles.cart_button} onClick={props.onClick}>{props.children}</button>
}
export default CartButton;