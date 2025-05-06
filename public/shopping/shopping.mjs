const PRODUCTS = [
    {
        name: "Elder Chocolate Truffles, 2oz",
        description: "The best of the best in chocolate truffles.",
        imageSrc: "https://placehold.co/200x200",
        price: 10,
        numInCart: 2
    },
    {
        name: "Jelly Belly Jelly Beans, 100 count",
        description: "Not for planting.",
        imageSrc: "https://placehold.co/200x200",
        price: 5,
        numInCart: 1
    },
    {
        name: "Kettle Chips, 8oz",
        description: "Delicious and unhealthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 3,
        numInCart: 0
    },
    {
        name: "Carrots, 2lb",
        description: "Delicious and healthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 2,
        numInCart: 0
    }
];

function renderProductCard(product) {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.src = product.imageSrc;
    img.alt = product.name;

    const details = document.createElement("div");
    details.className = "product-details";

    const title = document.createElement("h3");
    title.textContent = product.name;

    const desc = document.createElement("p");
    desc.textContent = product.description;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = `$${product.price}`;

    const btnDiv = document.createElement("div");
    const btn = document.createElement("button");
    btn.className = "buy-button";
    btn.textContent = "Add to cart";
    btn.addEventListener("click", () => {
        product.numInCart++;
        rerenderAllProducts();
        rerenderCart();
    });

    btnDiv.appendChild(btn);

    if (product.numInCart > 0) {
        const span = document.createElement("span");
        span.className = "num-in-cart";
        span.textContent = `${product.numInCart} in cart`;
        btnDiv.appendChild(document.createTextNode(" "));
        btnDiv.appendChild(span);
    }

    details.append(title, desc, price, btnDiv);
    article.append(img, details);
    return article;
}

function rerenderAllProducts() {
    const section = document.querySelector(".product-list");
    section.innerHTML = "<h2>Search results</h2>";

    for (const product of PRODUCTS) {
        if (shouldProductBeVisible(product)) {
            const card = renderProductCard(product);
            section.appendChild(card);
        }
    }
}

function rerenderCart() {
    const container = document.querySelector(".cart-items");
    container.innerHTML = "";

    for (const product of PRODUCTS) {
        if (product.numInCart > 0) {
            const p = document.createElement("p");
            p.textContent = `${product.name} x${product.numInCart}`;

            const btn = document.createElement("button");
            btn.className = "remove-button";
            btn.textContent = "Remove";
            btn.addEventListener("click", () => {
                product.numInCart = 0;
                rerenderAllProducts();
                rerenderCart();
            });

            container.append(p, btn);
        }
    }
}

const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");

function shouldProductBeVisible(product) {
    const min = Number.parseFloat(minPriceInput.value);
    const max = Number.parseFloat(maxPriceInput.value);

    if (!isNaN(min) && product.price < min) return false;
    if (!isNaN(max) && product.price > max) return false;
    return true;
}

// Re-render products when filter values change
minPriceInput.addEventListener("change", rerenderAllProducts);
maxPriceInput.addEventListener("change", rerenderAllProducts);

// Initial render
rerenderAllProducts();
rerenderCart();
