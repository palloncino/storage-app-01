import { DocumentDataType } from "../types/index.ts";

export const calculateSubtotal = (documentData: DocumentDataType): number => {
  if (!documentData?.data?.addedProducts) return 0;

  const products = documentData.data.addedProducts;

  const subtotal = products.reduce((total, product) => {
    // Calculate the discounted product price if a discount is applied
    const discount = product.discount || 0;
    const productPrice = parseFloat(product.price) || 0;
    const discountedProductPrice = productPrice - (productPrice * discount) / 100;

    // Calculate the total price of included components, accounting for their own discounts
    const componentsPrice = product.components?.reduce((componentTotal, component) => {
      if (component.included) {
        const componentPrice = parseFloat(component.price.toString()) || 0;
        const componentDiscount = component.discount || 0;
        const discountedComponentPrice = componentPrice - (componentPrice * componentDiscount) / 100;
        return componentTotal + discountedComponentPrice;
      }
      return componentTotal;
    }, 0) || 0;

    // Add the discounted product price and the total components price to the total
    return total + discountedProductPrice + componentsPrice;
  }, 0);

  return subtotal;
};
