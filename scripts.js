// تبديل حالة الزر بين الإظهار والإخفاء
function toggleCart() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
    
    // تغيير لون الزر عند الضغط عليه (اختياري)
    const cartButton = document.getElementById("cartButton");
    if (cartContainer.style.display === "block") {
        cartButton.style.backgroundColor = "#dc3545";  // تغيير اللون إلى الأحمر
    } else {
        cartButton.style.backgroundColor = "#28a745";  // تغيير اللون إلى الأخضر
    }
}

// إضافة تأثير عند الضغط على رابط التنقل
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        link.style.transform = 'scale(1.05)';
    });
});
