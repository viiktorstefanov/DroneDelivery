export function generateOrderStatus(order, customer) {
  const result = document.getElementById("result");
  const orderStatus = document.createElement("p");
  orderStatus.style.marginTop = "1rem";

  orderStatus.textContent = `Order for ${customer.name} has been delivered`;
  result.appendChild(orderStatus);

  setTimeout(() => {
    orderStatus.remove();
  }, 500);

}
