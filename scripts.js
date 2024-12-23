document.addEventListener("DOMContentLoaded", function () {
    const cart = [];
    const cartItemsElement = document.querySelector("#cart-items");
    const cartTotalElement = document.querySelector("#cart-total");
    const cartCountElement = document.querySelector("#cart-count");
    const cartButton = document.querySelector("#cart-button");
    const modal = document.querySelector("#cart-modal");
    const closeButton = document.querySelector(".close-button");

    // تحديث السلة
    function updateCart() {
        cartItemsElement.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsElement.innerHTML = '<tr><td colspan="4">Your cart is empty</td></tr>';
            cartCountElement.textContent = '0';
            return;
        }

        cart.forEach((item) => {
            const itemTotal = (item.price * item.quantity).toFixed(2);
            total += parseFloat(itemTotal);

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${itemTotal}</td>
            `;
            cartItemsElement.appendChild(row);
        });

        cartTotalElement.textContent = total.toFixed(2);
        cartCountElement.textContent = cart.length;
        renderPayPalButton(total); // عرض زر PayPal بعد تحديث السلة
    }

    // عرض زر PayPal
    function renderPayPalButton(total) {
        const paypalContainer = document.querySelector("#paypal-button-container");

        if (total > 0) {
            paypalContainer.innerHTML = ""; // Clear any existing button
            paypal.Buttons({
                createOrder: function (data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: total.toFixed(2)
                            }
                        }]
                    });
                },
                onApprove: function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        alert("Transaction completed by " + details.payer.name.given_name);
                        cart.length = 0; // Clear the cart after successful payment
                        updateCart(); // Update cart display
                    });
                },
                onError: function (err) {
                    console.error(err);
                    alert("An error occurred during the payment process.");
                }
            }).render(paypalContainer); // Render the PayPal button
        } else {
            paypalContainer.innerHTML = ""; // Hide PayPal button if total is 0
        }
    }

    // فتح نافذة السلة (Modal)
    cartButton.addEventListener("click", function () {
        modal.style.display = "block"; // فتح النافذة
        updateCart(); // تحديث محتوى السلة
    });

    // إغلاق نافذة السلة (Modal)
    closeButton.addEventListener("click", function () {
        modal.style.display = "none"; // إغلاق النافذة
    });

    // إضافة منتج إلى السلة
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", function () {
            const productElement = this.parentElement;
            const id = productElement.getAttribute("data-id");
            const name = productElement.getAttribute("data-name");
            const price = parseFloat(productElement.getAttribute("data-price"));

            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            updateCart();
            alert(`${name} has been added to your cart.`);
        });
    });

    updateCart(); // Initial cart update
});
