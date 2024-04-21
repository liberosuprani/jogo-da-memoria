function showMobileNavbar() {
    let x = document.getElementById("mobileNavbar");
    let y = document.getElementById("hamburgerButton");

    if (x.style.display === "flex") {
        x.style.display = "none";
        y.src = "./img/hamburger-svgrepo-com.svg";
    } else {
        x.style.display = "flex";
        y.src = "./img/hamburger-svgrepo-com-active.svg";
    }
}

