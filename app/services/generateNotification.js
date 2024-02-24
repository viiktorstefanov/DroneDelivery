export const generateNotification = () => {
  const form = document.getElementById("form");

  const notifyP = document.createElement("p");
  notifyP.classList = "notify";
  notifyP.textContent = "The program has been launched successfully.";

  form.appendChild(notifyP);

  setTimeout(() => notifyP.remove(), 2000);
};
