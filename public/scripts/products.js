
//TODO dovrsiti ovu funkciju
function generateProductsHTML(category,cartItems) {

    let output = [];
    if (!category) return;
    //console.log(category);

    for (let item of category["products"]) {

        let span_class = "no-text";
        //console.log(JSON.stringify(cartItems));
        let quantity = cartItems.find(el => el.id === item.id)?.count || 0;
        //console.log(`quantiti = ${quantity}`);

        if (quantity > 0) {            
            span_class = "has-text";
        }

        let temp = `<div>
        <button onclick="addToCart('${item.id}')">
        </button>
        <span id = ${item.id} class = "${span_class}">${quantity}</span>
        <img src="${item.image}" alt="${item.name}">
        <p>${item.name}</p>
        </div>`;
            output.push(temp);
    }

    return output;

}

function appendProductsHTML(productsHTML){

    const container = document.querySelector("#product-items");
    container.innerHTML = "";

    for(const itemHTML of productsHTML){

        const child = document.createElement("li");
        child.innerHTML = itemHTML;
        container.appendChild(child);

    }
}


//changes the category, sends a request and gets a response for which items to display
async function sendCategoryRequest(url) {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const resJSON = await res.json();
    //console.log(`sendCategoryRequest response : ${JSON.stringify(resJSON)}`);

    const productsHTML = generateProductsHTML(resJSON.products,resJSON.cart);
    appendProductsHTML(productsHTML);

}


//used in buttons to add an item to the cart
async function addToCart(itemID) {

    const response = await fetch(`/home/getProducts/${itemID}`, {
        method: "POST",
        body: JSON.stringify({
            id: itemID,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    const status = await response.json();

    //console.log(`status ${status.success}`);


    const span = document.getElementById(itemID);
    span.innerHTML++;
    span.classList.remove("no-text")
    span.classList.add("has-text")
    

}




