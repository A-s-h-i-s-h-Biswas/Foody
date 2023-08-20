import React from "react";

const CartContext=React.createContext({
    mealItems:[],
    noOfItems:0,
    totalPrice:0,
    addToCart:(mealItem)=>{},
    removeFromCart:(id)=>{},
    removeAllFromCart:()=>{},
    addAllToCart:()=>{},
});
export default CartContext;