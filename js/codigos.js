function showMobileNavbar() {
    let x = document.getElementById("mobileNavbar");

    if (x.style.display === "flex") {
        x.style.display = "none";
    } else {
        x.style.display = "flex";
    }
}