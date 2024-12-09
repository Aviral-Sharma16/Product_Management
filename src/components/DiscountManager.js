import React, { useState } from "react";

function DiscountManager({ onApplyDiscount }) {
  const [discountValue, setDiscountValue] = useState("");
  const [discountType, setDiscountType] = useState("flat");

  const handleApplyDiscount = () => {
    if (discountValue === "") {
      alert("Please enter a discount value.");
      return;
    }
    onApplyDiscount({ value: discountValue, type: discountType });
  };

  return (
    <div className="discount-manager">
      <h4>Apply Discount</h4>
      <div>
        <input
          type="number"
          placeholder="Enter discount value"
          value={discountValue}
          onChange={(e) => setDiscountValue(e.target.value)}
        />
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="discountType"
            value="flat"
            checked={discountType === "flat"}
            onChange={(e) => setDiscountType(e.target.value)}
          />
          Flat Discount
        </label>
        <label>
          <input
            type="radio"
            name="discountType"
            value="percentage"
            checked={discountType === "percentage"}
            onChange={(e) => setDiscountType(e.target.value)}
          />
          Percentage Discount
        </label>
      </div>
      <button onClick={handleApplyDiscount}>Apply Discount</button>
    </div>
  );
}

export default DiscountManager;