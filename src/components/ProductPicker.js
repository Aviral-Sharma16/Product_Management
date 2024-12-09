import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductPicker({ onClose, onProductsSelected }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `https://stageapi.monkcommerce.app/task/products/search?search=${search}&page=0&limit=10`,
        {
          headers: { "x-api-key": "72njgfa948d9aS7gs5" },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleProductSelection = (product) => {
    if (selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== product));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleSubmit = () => {
    onProductsSelected(selectedProducts);
    onClose();
  };

  return (
    <div className="product-picker">
      <h3>Select Products</h3>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedProducts.includes(product)}
                onChange={() => handleProductSelection(product)}
              />
              {product.title}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Confirm Selection</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ProductPicker;
