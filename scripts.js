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
// تخزين محتويات السلة
let cart = [];

// إضافة منتج إلى السلة
function addToCart(productName, price) {
    cart.push({ productName, price });
    updateCart();
}

// تحديث السلة
function updateCart() {
    const cartList = document.getElementById("cart-items-list");
    const cartTotal = document.getElementById("cart-total");
    const paypalButtonContainer = document.getElementById("paypal-button-container");

    cartList.innerHTML = "";  // مسح السلة الحالية
    let total = 0;

    // إضافة العناصر إلى السلة
    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.productName} - $${item.price}`;
        cartList.appendChild(listItem);
        total += item.price;
    });

    // تحديث المجموع
    cartTotal.textContent = total;

    // تفعيل زر بايبال إذا كان المجموع أكبر من 0
    if (total > 0) {
        paypalButtonContainer.style.display = "block";  // إظهار زر بايبال
        renderPaypalButton(total);
    } else {
        paypalButtonContainer.style.display = "none";  // إخفاء زر بايبال إذا كانت السلة فارغة
    }
}

// عرض زر بايبال
function renderPaypalButton(totalAmount) {
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: totalAmount.toString()
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert("تم الدفع بنجاح! مرحباً " + details.payer.name.given_name);
                // إفراغ السلة بعد الدفع
                cart = [];
                updateCart();
            });
        },
        onCancel: function(data) {
            alert("تم إلغاء الدفع.");
        }
    }).render('#paypal-button-container');
}

// التبديل بين إظهار وإخفاء السلة
function toggleCart() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
}

// إغلاق نافذة Cert
function closeCert() {
    document.getElementById("cert-modal").style.display = "none";
}

// تفعيل السلة عند الضغط على زر السلة
document.getElementById("cartButton").addEventListener("click", toggleCart);
