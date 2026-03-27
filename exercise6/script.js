// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Connect the HTML elements to variables
    var costInput = document.getElementById('cost');
    var litersInput = document.getElementById('liters');
    var btn = document.getElementById('calc-btn');
    var display = document.getElementById('total-text');

    // When the button is clicked
    btn.onclick = function() {
        
        // Get the values
        var price = parseFloat(costInput.value);
        var amount = parseFloat(litersInput.value);

        // Simple Math
        var total = price * amount;

        // Show the result with 2 decimal places
        display.innerText = "£" + total.toFixed(2);
    };
});