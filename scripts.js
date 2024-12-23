document.addEventListener("DOMContentLoaded", function () {
    const certButton = document.querySelector("#cert-button");
    const modalCert = document.querySelector("#cert-modal");
    const closeButtons = document.querySelectorAll(".close-button");

    // فتح نافذة Cert (Modal) عند الضغط على الزر
    certButton.addEventListener("click", function () {
        modalCert.style.display = "block"; // عرض نافذة Cert
    });

    // إغلاق نافذة Cert عند الضغط على زر الإغلاق "X"
    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            modalCert.style.display = "none"; // إغلاق نافذة Cert
        });
    });

    // إغلاق نافذة Cert عند الضغط خارج النافذة
    window.addEventListener("click", function(event) {
        if (event.target === modalCert) {
            modalCert.style.display = "none"; // إغلاق نافذة Cert عند الضغط خارجها
        }
    });
});document.addEventListener("DOMContentLoaded", function () {
    const certButton = document.querySelector("#cert-button");
    const modalCert = document.querySelector("#cert-modal");
    const closeButtons = document.querySelectorAll(".close-button");

    // فتح نافذة Cert (Modal) عند الضغط على الزر
    certButton.addEventListener("click", function () {
        modalCert.style.display = "block"; // عرض نافذة Cert
    });

    // إغلاق نافذة Cert عند الضغط على زر الإغلاق "X"
    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            modalCert.style.display = "none"; // إغلاق نافذة Cert
        });
    });

    // إغلاق نافذة Cert عند الضغط خارج النافذة
    window.addEventListener("click", function(event) {
        if (event.target === modalCert) {
            modalCert.style.display = "none"; // إغلاق نافذة Cert عند الضغط خارجها
        }
    });
});
