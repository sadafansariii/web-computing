import React from "react";

function Cart({ cart, removeFromCart }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cart.map((book) => (
            <li key={book.id} style={{ marginBottom: "10px" }}>
              {book.title} - ₹{book.price}
              <button
                onClick={() => removeFromCart(book.id)}
                style={{ marginLeft: "10px" }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
import React from "react";

function Cart({ cart, removeFromCart }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cart.map((book) => (
            <li key={book.id} style={{ marginBottom: "10px" }}>
              {book.title} - ₹{book.price}
              <button
                onClick={() => removeFromCart(book.id)}
                style={{ marginLeft: "10px" }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;