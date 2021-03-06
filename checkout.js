let plusButton = document.querySelectorAll(".fas.fa-plus")
let minusButton = document.querySelectorAll(".fas.fa-minus")
let removeButton = document.querySelectorAll(".remove-product")

// htmlde selector "class" olarak değiştirildi. querySelectorALL dan aratınca Nodelist veriyordu.
// Parent remove ettim, fakat quantity elementinin bulunduğu Nodelistte eleman silinmedi. Dolayısıyla HTML Collection yaptım.
let productQuantity = document.getElementsByClassName("product-quantity")
let productPrice = document.getElementsByTagName("strong")
let linePrice = document.getElementsByClassName("product-line-price")

let cartSubtotal = document.querySelector("#cart-subtotal").children[1]
let cartTax = document.querySelector("#cart-tax").children[1]
let cartShipping = document.querySelector("#cart-shipping").children[1]
let cartTotal = document.querySelector("#cart-total").children[1]


function calculatePrice() {
    let subTotal = 0;
    let numItems = productPrice.length
    for (let i=0; i<numItems; i++) {
        subTotal += parseFloat(productPrice[i].innerHTML) * parseFloat(productQuantity[i].innerHTML)
    }
    if (subTotal == 0) cartShipping.innerHTML = '0.00';
    cartSubtotal.innerHTML = subTotal.toFixed(2);
    let taxTotal = subTotal * 0.18;
    cartTax.innerHTML = taxTotal.toFixed(2);
    let total = parseFloat(cartSubtotal.innerHTML) + parseFloat(cartTax.innerHTML) + parseFloat(cartShipping.innerHTML);
    cartTotal.innerHTML = total.toFixed(2);
}

plusButton.forEach(element => {
    element.addEventListener("click", (e) => {
        let sum = parseInt(e.target.parentElement.parentElement.children[1].innerText);
        sum += 1;
        e.target.parentElement.parentElement.children[1].innerText = sum;
        e.target.parentElement.parentElement.parentElement.children[4].innerHTML = (parseInt(sum) * parseFloat(e.target.parentElement.parentElement.parentElement.children[1].children[0].children[0].innerHTML)).toFixed(2);
        return calculatePrice();
    })
})

minusButton.forEach(element => {
    element.addEventListener("click", (e) => {
        if (parseInt(e.target.parentElement.parentElement.children[1].innerText) > 1) {
            let sum = parseInt(e.target.parentElement.parentElement.children[1].innerText);
            sum -= 1;
            e.target.parentElement.parentElement.children[1].innerText = sum;
            e.target.parentElement.parentElement.parentElement.children[4].innerHTML = (parseInt(sum) * parseFloat(e.target.parentElement.parentElement.parentElement.children[1].children[0].children[0].innerHTML)).toFixed(2);
            return calculatePrice();
        }
        if (parseInt(e.target.parentElement.parentElement.children[1].innerText) == 1) {
            e.target.parentElement.parentElement.children[0].disabled = 'true';
            return calculatePrice();
        }
    })
})

removeButton.forEach(element => {
    element.addEventListener("click", (e) => {
        e.target.parentElement.parentElement.parentElement.remove();
        return calculatePrice();
    })
})