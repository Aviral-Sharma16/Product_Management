import React, { useState, useEffect, useRef } from "react";
import DiscountManager from "./DiscountManager";

function ProductList({ products, onEditProduct, onRemoveProduct, onApplyDiscount }) {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [expandedProducts, setExpandedProducts] = useState({});
  const [selectedVariants, setSelectedVariants] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const productContainerRef = useRef(null);

  const PRODUCTS_PER_PAGE = 10;

  // Load initial products
  useEffect(() => {
    setDisplayedProducts(products.slice(0, PRODUCTS_PER_PAGE));
  }, [products]);

  // Function to load more products when scrolling
  const loadMoreProducts = () => {
    const nextPage = currentPage + 1;
    const start = currentPage * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    const nextProducts = products.slice(start, end);

    if (nextProducts.length > 0) {
      setDisplayedProducts((prevProducts) => [...prevProducts, ...nextProducts]);
      setCurrentPage(nextPage);
    }
  };

  // Scroll Event Listener
  useEffect(() => {
    const handleScroll = () => {
      if (productContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = productContainerRef.current;

        if (scrollTop + clientHeight >= scrollHeight - 5) {
          loadMoreProducts();
        }
      }
    };

    const container = productContainerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, products]);

  const toggleVariants = (productId) => {
    setExpandedProducts((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  const handleVariantSelection = (productId, variant) => {
    setSelectedVariants((prevState) => ({
      ...prevState,
      [productId]: variant,
    }));
  };

  return (
    <div
      ref={productContainerRef}
      style={{
        maxHeight: "540px",
        overflowY: "auto",
      }}
    >
      {displayedProducts.map((product, index) => (
        <div key={product?.id || index} className="product-item">
          {/* Ensure the image exists before rendering */}
          {product?.image?.src ? (
            <img src={product.image.src} alt={product?.title || "Untitled Product"} className="product-image" />
          ) : (
            <div className="placeholder-image">No Image Available</div>
          )}
          <div className="product-info">
            <h3>{product?.title || "Untitled Product"}</h3>
            <div className="button-group">
              <button onClick={() => onEditProduct(index)}>Edit Product</button>
              {product?.variants?.length > 1 ? (
                <button onClick={() => toggleVariants(product.id)}>
                  {expandedProducts[product.id] ? "Hide Variants" : "Show Variants"}
                </button>
              ) : (
                <p className="no-variants">No variants available</p>
              )}
              <button onClick={() => onRemoveProduct(index)}>Remove</button>
            </div>

            <DiscountManager
              onApplyDiscount={(discount) => onApplyDiscount(index, discount)}
            />

            {expandedProducts[product?.id] && product?.variants?.length > 0 && (
              <div className="variant-list">
                <h4>Variants:</h4>
                {product.variants.map((variant) => (
                  <div key={variant.id} className="variant-item">
                    <input
                      type="radio"
                      id={`variant-${variant.id}`}
                      name={`variant-${product.id}`}
                      value={variant.id}
                      checked={selectedVariants[product.id]?.id === variant.id}
                      onChange={() => handleVariantSelection(product.id, variant)}
                    />
                    <label htmlFor={`variant-${variant.id}`}>
                      {variant.title} - ${variant.price}
                    </label>
                  </div>
                ))}
              </div>
            )}

            <div className="selected-variant">
              {product?.variants?.length > 1 ? (
                selectedVariants[product.id] ? (
                  <p>
                    <strong>Selected Variant:</strong> {selectedVariants[product.id].title} - $
                    {selectedVariants[product.id].price}
                  </p>
                ) : (
                  <p>No variant selected</p>
                )
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;

