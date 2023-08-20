import styles from "./MealItem.module.css";
import Container from "../UI/Container";
import StarsIcon from "@mui/icons-material/Stars";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useContext ,useState} from "react";
import CartContext from "../../Storage/Cart-Context";
import AuthContext from "../../Storage/Auth-Context";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-store/firebase-config";

// import SignIn from "../UI/SignIn";

const MealItem = (props) => {
  const cartCntx = useContext(CartContext);
  const authCntx=useContext(AuthContext);
  const [show,setShow]=useState(true);
  const { userId } = authCntx;

  const updateCartInDataBase = async (updatedCart) => {
    await setDoc(doc(db, "carts", `${userId}`), updatedCart);
  };
  const addCartHandler = () => {
    if(!authCntx.isLogin){
      alert("Please Sign In to add meal !!!");
      return ;
    }
    const mealItem = {
      quantity: 1,
      id: props.id,
      img: props.img,
      name: props.name,
      price: props.price,
    };
    cartCntx.addToCart(mealItem);
    updateCartInDataBase({
      mealItems: cartCntx.mealItems,
      noOfItems: cartCntx.noOfItems,
      totalPrice: cartCntx.totalPrice,
    });
  };
  const hideHandler=(x)=>{
    setShow(false);
    // console.log(x);
  }
  const showHandler=(y)=>{
    setShow(true);
    // console.log(y);
  }
  return (
    <Container  className={styles.item_control}>
      <div onMouseOverCapture={hideHandler} className={`${styles.item_logo} ${!show ? styles.hide : ""}`}>
        <span>
          <img src={props.img} alt="Food img" />
        </span>
      </div>
      {/* for add item effect */}
      <div onClick={addCartHandler} onMouseOutCapture={showHandler} className={`${styles.item_logo} ${show ? styles.hide : ""}`}>
        <span>
          <img src='https://static.vecteezy.com/system/resources/thumbnails/007/227/569/small/add-to-cart-icon-design-illustration-vector.jpg' alt="Food img" />
        </span>
      </div>
      <div className={styles.item_info}>
        <div className={styles.item_info_comp}>
          <h3>{props.name}</h3>
          <p>{props.description}</p>
        </div>
        <div className={styles.item_info_comp}>
          <p className={styles.item_info_align}>
            <StarsIcon color="success" />
            {props.rating}
          </p>
          <p className={styles.item_info_align}>
            <CurrencyRupeeIcon />
            {props.price}
          </p>
        </div>
      </div>
    </Container>
  );
};
export default MealItem;
