import React from "react";
import DiscountManager from "./DiscountManager";

function VariantEditor({ product, onClose, onApplyDiscount }) {
  return (
    <div className="variant-editor">
      <h3>Edit Variants for {product.title}</h3>
      <ul>
        {product.variants.map((variant) => (
          <li key={variant.id}>
            {variant.title} - ${variant.price}
            <DiscountManager onApply={(discount) => onApplyDiscount(variant.id, discount)} />
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default VariantEditor;



