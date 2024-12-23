// إظهار نافذة Cert
document.addEventListener("DOMContentLoaded", function () {
    const certButton = document.querySelector("#cert-button");
    const modalCert = document.querySelector("#cert-modal");
    const closeButtons = document.querySelectorAll(".close-button");
    const languageToggleButton = document.querySelector("#language-toggle");

    certButton.addEventListener("click", function () {
        modalCert.style.display = "block"; // عرض نافذة Cert
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            modalCert.style.display = "none"; // إغلاق نافذة Cert
        });
    });

    window.addEventListener("click", function(event) {
        if (event.target === modalCert) {
            modalCert.style.display = "none"; // إغلاق نافذة Cert عند الضغط خارجها
        }
    });

    // تغيير اللغة عند الضغط على زر تغيير اللغة
    languageToggleButton.addEventListener("click", function () {
        const currentLang = document.documentElement.lang;
        if (currentLang === "ar")
