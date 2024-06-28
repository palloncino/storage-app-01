// src/utils/formatPrice.ts

export const formatPrice = (price: number): string => {
  return price
    .toFixed(2)  // Ensure two decimal places
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")  // Add periods for thousands
    .replace(".", ",");  // Replace decimal point with comma
};
