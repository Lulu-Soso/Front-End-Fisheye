function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";

    const closeButton = document.querySelector("img.close");
    closeButton.addEventListener("click", closeModal);

    document.addEventListener("keyup", (event) => {
        if (event.key === "Escape" || event.key === " " && event.target === closeButton) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
