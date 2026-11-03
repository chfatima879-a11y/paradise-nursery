import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const totalCartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1599593975765-b7b51f0b093f?auto=format&fit=crop&q=80&w=300", cost: "$15", description: "Produces oxygen at night." },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-34301d3a4771?auto=format&fit=crop&q=80&w=300", cost: "$12", description: "Great for removing toxins." },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593482834493-02f1f0a2df36?auto=format&fit=crop&q=80&w=300", cost: "$18", description: "Beautiful white blooms." },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=300", cost: "$20", description: "Adds lush green texture." },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&q=80&w=300", cost: "$25", description: "Shiny, large leaves." },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&q=80&w=300", cost: "$10", description: "Healing gel properties." }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&q=80&w=300", cost: "$14", description: "Calming floral scent." },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592417817098-8f3d691a4bf5?auto=format&fit=crop&q=80&w=300", cost: "$16", description: "Sweet evening fragrance." },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=300", cost: "$11", description: "Herbaceous aroma." },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&q=80&w=300", cost: "$8", description: "Refreshing fragrance." },
        { name: "Lemon Balm", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=300", cost: "$9", description: "Citrus scent." },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&q=80&w=300", cost: "$22", description: "Refreshing minty aroma." }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207579275-0d603a18359a?auto=format&fit=crop&q=80&w=300", cost: "$22", description: "Thrives in low light." },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1572688484438-34301d3a4771?auto=format&fit=crop&q=80&w=300", cost: "$13", description: "Hardy trailing vine." },
        { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=300", cost: "$19", description: "Nearly indestructible." },
        { name: "Succulent Mix", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=300", cost: "$10", description: "Requires minimal water." },
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&q=80&w=300", cost: "$15", description: "Symbol of good luck." },
        { name: "Agave", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&q=80&w=300", cost: "$28", description: "Architectural desert plant." }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prevState => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <span onClick={() => setShowCart(false)}>Paradise Nursery</span>
        </div>
        <div className="navbar-links">
          <button onClick={() => setShowCart(false)}>Home / Plants</button>
          <button onClick={() => setShowCart(true)} className="cart-icon-btn">
            🛒 Cart ({totalCartItemsCount})
          </button>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid-container">
          <h2>Our Houseplants</h2>
          {plantsArray.map((categoryObj, index) => (
            <div key={index} className="category-section">
              <h3>{categoryObj.category}</h3>
              <div className="plant-grid">
                {categoryObj.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-img" />
                    <h4>{plant.name}</h4>
                    <p>{plant.cost}</p>
                    <p className="plant-desc">{plant.description}</p>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
