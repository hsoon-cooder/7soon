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
        renderPaypalButton();
    }
}

// التبديل بين إظهار وإخفاء السلة
function toggleCart() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
}

// عرض زر بايبال
function renderPaypalButton() {
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: document.getElementById("cart-total").textContent
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert("تم الدفع بنجاح! مرحباً " + details.payer.name.given_name);
            });
        }
    }).render('#paypal-button-container');
}

// إغلاق نافذة Cert
function closeCert() {
    document.getElementById("cert-modal").style.display = "none";
}

// تفعيل السلة عند الضغط على زر السلة
document.getElementById("cartButton").addEventListener("click", toggleCart);
