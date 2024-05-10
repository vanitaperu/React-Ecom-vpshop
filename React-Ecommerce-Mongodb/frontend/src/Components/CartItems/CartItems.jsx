import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import PaypalCheckoutButton from "../../Pages/PaypalCheckoutButton.jsx";

const CartItems = () => {
  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
  } = useContext(ShopContext);

  const handleIncrement = (itemId) => {
    addToCart(itemId);
  };

  const handleDecrement = (itemId) => {
    removeFromCart(itemId);
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((product) => {
        const { id, image, name, new_price } = product;

        const quantity = cartItems[id];
        if (quantity > 0) {
          return (
            <div key={id}>
              <div className="cartitems-format cartitems-format-main ">
                <img src={image} alt="" className="carticon-product-icon" />
                <p>{name}</p>
                <p>${new_price}</p>
                <div className="quantity-container">
                  <button onClick={() => handleDecrement(id)}>-</button>
                  <button className="cartitems-quantity">{quantity}</button>
                  <button onClick={() => handleIncrement(id)}>+</button>
                </div>
                <p>${new_price * quantity}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-items">
              <p>Total Items</p>
              <p>{getTotalCartItems()}</p>
            </div>
            <hr />
            <div className="cartitems-total-items">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>

          <div className="separator"></div>
          <div className="paypal">
            <p className="checkout-title">PAY WITH PAYPAL</p>
            <div className="paypal-button-container">
              <PaypalCheckoutButton product={getTotalCartAmount()} />
            </div>
          </div>

          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have any promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
