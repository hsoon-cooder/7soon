document.addEventListener("DOMContentLoaded", function () {
    const cart = [];
    const cartItemsElement = document.querySelector("#cart-items");
    const cartTotalElement = document.querySelector("#cart-total");

    function updateCart() {
        cartItemsElement.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsElement.innerHTML = '<tr><td colspan="4">Your cart is empty</td></tr>';
            return;
        }

        cart.forEach((item, index) => {
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
        renderPayPalButton(total);
    }

    function renderPayPalButton(total) {
        const paypalContainer = document.querySelector("#paypal-button-container");
        paypalContainer.innerHTML = ""; // Clear previous button

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
                });
            },
            onError: function (err) {
                console.error(err);
                alert("An error occurred during the payment process.");
            }
        }).render("#paypal-button-container");
    }

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

    updateCart();
});