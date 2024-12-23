let cart = [];

function addToCart(productName, price) {
    cart.push({ productName, price });
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById("cart-items-list");
    const cartTotal = document.getElementById("cart-total");
    const paypalButtonContainer = document.getElementById("paypal-button-container");

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.productName} - $${item.price}`;
        cartList.appendChild(listItem);
        total += item.price;
    });

    cartTotal.textContent = `المجموع: $${total}`;

    if (total > 0) {
        paypalButtonContainer.style.display = "block";
        renderPaypalButton(total);
    } else {
        paypalButtonContainer.style.display = "none";
    }
}

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
                cart = [];
                updateCart();
            });
        },
        onCancel: function(data) {
            alert("تم إلغاء الدفع.");
        }
    }).render('#paypal-button-container');
}

function toggleCart() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
}

function closeCert() {
    document.getElementById("cert-modal").style.display = "none";
}
