"use client"

import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import  { toast } from 'react-hot-toast'


const Context = createContext<any>(undefined);

export const StateContext = ({ children }:any) => {
    const [showCart, setShowCart] = useState (false);






    
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalQuantities, setTotalQuantities] =  useState<number>(0);
    const [qty , setQty] = useState(1)
    



// Cart
const onAdd = (product: { _id: any; price: number; quantity: any; name: any; }, quantity: number) => {
    console.log('Added to cart:', product, quantity);
    const checkProductCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkProductCart){
        const updateCartItems = cartItems.map((cartProduct) => {
            if(cartProduct._id === product._id) return {
                ...cartProduct,
                quantity: cartProduct.quantity + quantity
            }
        })

        setCartItems(updateCartItems);
    }else {
        product.quantity = quantity;
        
        setCartItems([...cartItems,  { ...product }])
    }
    toast.success(`${qty} ${product.name} added to cart.`)
} 
const onRemove = (product: any) => {
    const foundProduct = cartItems.find((item) => item._id === product._id); // Locate the item
    const newCartItems = cartItems.filter((item) => item._id !== product._id); // Filter out the item
  
    // Update the total price and quantities
    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
  
    // Update the cart items
    setCartItems(newCartItems);
  };
  

// Quantity
const toggleCartItemQuantity = (id: any, value: string) => {
    const foundProduct = cartItems.find((item) => item._id === id); // Locate the item
    const newCartItems = cartItems.map((item) => {
      if (item._id === id) {
        // Handle increment or decrement
        if (value === "inc") {
          return { ...item, quantity: item.quantity + 1 };
        } else if (value === "dec" && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item; // Return unchanged items
    });
  
    // Update state immutably
    setCartItems(newCartItems);
  
    // Adjust total price and quantity
    if (value === "inc") {
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec" && foundProduct.quantity > 1) {
      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
    }
  };
  



    // Qty
    const decQty = () => {
        if (qty > 1) {
            setQty((prevQty) => prevQty - 1);
        }
    };
    
    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    };

    return (
        <Context.Provider 
        value ={
            {
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove
            }
        }
        >
        {children}
        </Context.Provider>
    )
}
export const useStateContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useStateContext must be used within a StateContext provider!");
    }
    console.log(context);  // Log context to see if values are correctly passed
    return context;
  };
  