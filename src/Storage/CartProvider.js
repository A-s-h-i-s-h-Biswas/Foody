import CartContext from "./Cart-Context";
import { useReducer, useContext, useEffect } from "react";
import AuthContext from "./Auth-Context";
import { doc, getDoc  } from "firebase/firestore";
import { db } from "../firebase-store/firebase-config";

const cartReducer = (state, action) => {
  if (action.type === "ADD_ALL") {
    return action.value;
  }
  if (action.type === "ADD_ITEM") {
    const addItem = action.value;
    const totalPrice = state.totalPrice + addItem.price * addItem.quantity;
    const noOfItems = state.noOfItems + addItem.quantity;

    const index = state.mealItems.findIndex(
      (mealItem) => mealItem.id === addItem.id
    );

    const itemExist = state.mealItems[index];

    let newMealItems;
    if (itemExist) {
      addItem.quantity += itemExist.quantity;
      newMealItems = [...state.mealItems];
      newMealItems[index] = addItem;
    } else {
      newMealItems = state.mealItems.concat(addItem);
    }

    const updatedState = {
      mealItems: newMealItems,
      noOfItems,
      totalPrice,
    };
    return updatedState;
  } else if (action.type === "REMOVE_ITEM") {
    const removeItemIndex = state.mealItems.findIndex(
      (mealItem) => mealItem.id === action.value
    );
    const removeItem = state.mealItems[removeItemIndex];

    let updatedMealItems;
    if (removeItem.quantity === 1) {
      updatedMealItems = state.mealItems.filter(
        (mealItem) => mealItem.id !== action.value
      );
    } else {
      const updatedMeal = { ...removeItem, quantity: removeItem.quantity - 1 };
      updatedMealItems = [...state.mealItems];
      updatedMealItems[removeItemIndex] = updatedMeal;
    }
    const noOfItems = state.noOfItems - 1;
    const totalPrice = state.totalPrice - removeItem.price;
    const updatedState = {
      mealItems: updatedMealItems,
      noOfItems,
      totalPrice,
    };
    return updatedState;
  }
  return defaultCart;
};
let defaultCart = {
  mealItems: [],
  noOfItems: 0,
  totalPrice: 0,
};

const CartProvider = (props) => {
  const authCntx = useContext(AuthContext);
  const { userId, isLogin } = authCntx;
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCart);

  

  const addToCartHandler = (item) => {
    dispatchCart({ type: "ADD_ITEM", value: item });
    
    // update cart in firebase
  };
  const removeFromCartHandler = (id) => {
    dispatchCart({ type: "REMOVE_ITEM", value: id });
    
    // update cart in firebase
  };
  const removeAllFromCart = () => {
    dispatchCart({});
    
    // update cart in firebase
  };
  const addAllToCart = (data) => {
    dispatchCart({ type: "ADD_ALL", value: data });
   
    // update cart in firebase
  };

  useEffect(() => {
    const getStoredCart = async () => {
      const docRef = doc(db, "carts", `${userId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        // setData();
        addAllToCart(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    isLogin && getStoredCart();
  }, [userId, isLogin]);

  return (
    <CartContext.Provider
      value={{
        mealItems: cartState.mealItems,
        noOfItems: cartState.noOfItems,
        totalPrice: cartState.totalPrice,
        addToCart: addToCartHandler,
        removeFromCart: removeFromCartHandler,
        removeAllFromCart,
        addAllToCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;


