export function showOrderProducts(productList, customerName) {
    const productListArray = Object.entries(productList).map(([item, quantity]) => `${quantity} ${item}`);
    console.log(
      `Order for ${customerName} is shipped with products:`
    );
    console.table(productListArray);
}