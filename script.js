const contract =
  "0x0eC78ED49C2D27b315D462d43B5BAB94d2C79bf8";

document.addEventListener("DOMContentLoaded", () => {

  const button = document.getElementById("copyContract");

  if (!button) return;

  button.addEventListener("click", async () => {

    try {

      await navigator.clipboard.writeText(contract);

      button.innerHTML = `
        <code>Copied!</code> ✓
      `;

      setTimeout(() => {

        button.innerHTML = `
          <code>${contract}</code> ⧉
        `;

      }, 2000);

    } catch (error) {

      alert("Contract address: " + contract);

    }

  });

});
