import React from "react";

function About() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>About Us</h1>
      <p>We are passionate about bringing the best books to readers everywhere.</p>
    </div>
  );
}

export default About;
BBook.jsx
import React from "react";

const books = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 299,
    image: "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 399,
    image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg"
  },
  {
    id: 3,
    title: "Ikigai",
    author: "Héctor García",
    price: 249,
    image: "https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg"
  },
  {
    id: 4,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: 350,
    image: "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg"
  },
];

function Books({ addToCart }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Books Collection</h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {books.map((book) => (
          <div
            key={book.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              width: "200px",
              textAlign: "center",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={book.image}
              alt={book.title}
              style={{ width: "150px", height: "200px", objectFit: "cover", marginBottom: "10px" }}
            />
            <h3>{book.title}</h3>
            <p><b>Author:</b> {book.author}</p>
            <p><b>Price:</b> ₹{book.price}</p>
            <button
              onClick={() => addToCart(book)}
              style={{
                padding: "5px 10px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;