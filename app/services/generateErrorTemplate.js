export const generateErrorTemplate = (error) => {
  const inputSection = document.getElementById("input-card");

  const errorSpan = document.createElement("span");
  errorSpan.classList = "error";
  errorSpan.textContent = `${error}`;

  inputSection.appendChild(errorSpan);

    setTimeout(() => errorSpan.remove(), 1500);
};
