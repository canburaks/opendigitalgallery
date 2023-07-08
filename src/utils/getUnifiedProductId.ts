type NumString = number | string;

export const getUnifiedProductId = (
  productType: NumString,
  productId: NumString,
  productOptionId: NumString
) => {
  return `${productType}-${productId}-${productOptionId}`;
};
