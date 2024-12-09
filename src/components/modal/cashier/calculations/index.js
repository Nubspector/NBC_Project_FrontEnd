// calculations.js

export function calculateProductTotal(products) {
  return products.reduce(
    (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1),
    0
  );
}

export function calculateTreatmentTotal(treatments) {
  return treatments.reduce((sum, treatmentData) => {
    const originalPrice = parseFloat(treatmentData.treatment?.price || 0);
    return sum + originalPrice;
  }, 0);
}

export function calculatePromoDiscount(
  selectedPromo,
  treatments,
  productTotal,
  treatmentTotal
) {
  if (!selectedPromo || !selectedPromo.discount) return 0;

  if (selectedPromo.treatment_id) {
    return treatments.reduce((sum, treatmentData) => {
      if (selectedPromo.treatment_id === treatmentData.treatment?.id) {
        const discountAmount =
          (parseFloat(treatmentData.treatment?.price || 0) *
            selectedPromo.discount) /
          100;
        return sum + discountAmount;
      }
      return sum;
    }, 0);
  }

  return (productTotal + treatmentTotal) * (selectedPromo.discount / 100);
}

export function calculateFinalAmount(
  productTotal,
  treatmentTotal,
  pointsInput,
  promoDiscount
) {
  const subtotal = productTotal + treatmentTotal;
  return Math.max(0, subtotal - pointsInput - promoDiscount);
}
