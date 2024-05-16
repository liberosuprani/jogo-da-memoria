/* Grupo nº28 PL23
Duarte Alberto - 62235
Libero Suprani - 62220
Ravi Mughal - 62504 
*/

function showMobileNavbar() {
    let x = document.getElementById("mobileNavbar");
    let y = document.getElementById("hamburgerButton");

    if (x.style.display == "flex") {
        x.style.display = "none";
        y.src = "./img/hamburger-svgrepo-com.svg";
    } else {
        x.style.display = "flex";
        y.src = "./img/hamburger-svgrepo-com-active.svg";
    }
}

