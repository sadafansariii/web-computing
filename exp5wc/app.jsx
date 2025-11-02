import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => setCart([...cart, book]);
  const removeFromCart = (id) => setCart(cart.filter((book) => book.id !== id));

  return (
    <Router>
      <div
        style={{
          minHeight:"100%",
          minHeight: "100vh",
          backgroundImage:
            "url('https://images.adsttc.com/media/images/573c/90c0/e58e/ce1e/1600/0007/large_jpg/Here_is_a_theater_to_unfold_an_outstanding_drama__and_the_characters_are_book_lovers_sitting_on_the_soft_couch_or_standing_beside_the_bookshelves._0004.jpg?1463587001)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          color: "#222", // text color
        }}
      >
        {/* Navigation Menu */}
        <nav
          style={{
            padding: "10px",
            background: "rgba(255,255,255,0.8)", // semi-transparent nav
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <ul style={{ display: "flex", gap: "15px", listStyle: "none" }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/cart">Cart ({cart.length})</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Page Content Wrapper */}
        <div style={{ padding: "20px", backgroundColor: "rgba(255,255,255,0.7)", margin: "20px", borderRadius: "10px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;