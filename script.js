document.addEventListener("DOMContentLoaded", function() {
    const orderForm = document.getElementById('orderForm');
    const deliveryForm = document.getElementById('deliveryForm');
    const receiptDiv = document.getElementById('receipt');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting normally

            // Collect form values
            const tagline = document.getElementById('tagline').value.trim();
            const color = document.getElementById('color').value;
            const size = document.getElementById('size').value;
            const quantity = document.getElementById('quantity').value.trim();
            const deliveryDate = document.getElementById('delivery-date').value;

            // Validate the form
            if (!validateOrderForm(tagline, quantity, deliveryDate)) {
                return;
            }

            // Save data to localStorage and redirect
            localStorage.setItem('orderData', JSON.stringify({
                tagline, color, size, quantity, deliveryDate
            }));
            window.location.href = 'delivery.html';
        });
    }

    if (deliveryForm) {
        deliveryForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting normally

            // Collect delivery form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const address = document.getElementById('address').value.trim();
            const instructions = document.getElementById('instructions').value.trim();
            const termsAccepted = document.getElementById('terms').checked;

            // Validate delivery form
            if (!validateDeliveryForm(name, phone, address, termsAccepted)) {
                return;
            }

            // Save delivery details to localStorage and redirect
            const orderData = JSON.parse(localStorage.getItem('orderData'));
            localStorage.setItem('deliveryData', JSON.stringify({
                ...orderData,
                name,
                phone,
                address,
                instructions
            }));
            window.location.href = 'success.html';
        });
    }

    if (receiptDiv) {
        const deliveryData = JSON.parse(localStorage.getItem('deliveryData'));
        if (deliveryData) {
            generateReceipt(deliveryData);
            localStorage.removeItem('orderData');
            localStorage.removeItem('deliveryData');
        }
    }

    function validateOrderForm(tagline, quantity, deliveryDate) {
        if (tagline === "") {
            alert("Tagline is required.");
            return false;
        }

        if (quantity < 1) {
            alert("Quantity must be at least 1.");
            return false;
        }

        if (new Date(deliveryDate) < new Date()) {
            alert("Delivery date cannot be in the past.");
            return false;
        }

        return true;
    }

    function validateDeliveryForm(name, phone, address, termsAccepted) {
        if (name === "") {
            alert("Name is required.");
            return false;
        }

        if (!/^\d{10}$/.test(phone)) {
            alert("Phone number must be 10 digits.");
            return false;
        }

        if (address === "") {
            alert("Address is required.");
            return false;
        }

        if (!termsAccepted) {
            alert("You must accept the terms and conditions.");
            return false;
        }

        return true;
    }

    function generateReceipt(data) {
        const now = new Date();
        const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();

        receiptDiv.innerHTML = `
            <strong>Order Confirmation</strong><br>
            <strong>Date:</strong> ${dateStr}<br>
            <strong>Tagline:</strong> ${data.tagline}<br>
            <strong>Color:</strong> ${data.color}<br>
            <strong>Size:</strong> ${data.size}<br>
            <strong>Quantity:</strong> ${data.quantity}<br>
            <strong>Delivery Date:</strong> ${data.deliveryDate}<br>
            <strong>Delivery Address:</strong> ${data.address}<br>
            <strong>Phone Number:</strong> ${data.phone}<br>
            <strong>Special Instructions:</strong> ${data.instructions}
        `;
    }
});
