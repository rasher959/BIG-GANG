const transitionScreen = document.querySelector(".transition-screen");

function showTransition() {
    transitionScreen.style.opacity = "1";
    transitionScreen.style.visibility = "visible";
}

function hideTransition() {
    transitionScreen.style.opacity = "0";
    transitionScreen.style.visibility = "hidden";
}



// ПЕРЕХОДЫ МЕЖДУ РАЗДЕЛАМИ

const navigationLinks = document.querySelectorAll(".navigation a");



navigationLinks.forEach(link => {
    link.addEventListener("click", event => {
        const href = link.getAttribute("href");

        // ПЕРЕХОД НА ОТДЕЛЬНУЮ СТРАНИЦУ КОРЗИНЫ
        if (href === "cart.html") {
            event.preventDefault();

            showTransition();

            setTimeout(() => {
                window.location.href = href;
            }, 1500);

            return;
        }

        // ОБЫЧНЫЕ ПЕРЕХОДЫ МЕЖДУ РАЗДЕЛАМИ
        if (!href || !href.startsWith("#")) {
            return;
        }

        const target = document.querySelector(href);

        if (!target) return;

        event.preventDefault();

        showTransition();

        setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth" });

            setTimeout(() => {
                hideTransition();
            }, 500);

        }, 1500);
    });
});




// КАТАЛОГ ТОВАРОВ

const products = [
    {
        id: 1,
        brand: "ABUSE",
        name: "Футболка чёрная",
        category: "ФУТБОЛКИ",
        price: 3000,
        image: "images/abuse-tshirt-black.webp"
    },
    {
        id: 2,
        brand: "BALENCIAGA",
        name: "Худи серое",
        category: "ХУДИ",
        price: 94300,
        image: "images/balenciaga-hoodie-gray.jpg"
    },
    {
        id: 3,
        brand: "BALENCIAGA",
        name: "Куртка чёрная",
        category: "КУРТКИ",
        price: 208888,
        image: "images/balenciaga-jacket-black.jpg"
    },
    {
        id: 4,
        brand: "BALENCIAGA",
        name: "Футболка белая",
        category: "ФУТБОЛКИ",
        price: 52400,
        image: "images/balenciaga-tshirt-white.jpg"
    },
    {
        id: 5,
        brand: "BIG GANG",
        name: "Худи BIG GANG",
        category: "ХУДИ",
        price: 5000,
        image: "images/big-gang-hoodie.png"
    },
    {
        id: 6,
        brand: "BIG GANG",
        name: "Брюки BIG GANG",
        category: "БРЮКИ",
        price: 5000,
        image: "images/big-gang-pants.png"
    },
    {
        id: 7,
        brand: "CASHER",
        name: "Худи чёрное",
        category: "ХУДИ",
        price: 8000,
        image: "images/casher-hoodie-black.webp"
    },
    {
        id: 8,
        brand: "CASHER",
        name: "Джерси Racing",
        category: "ДЖЕРСИ",
        price: 5555,
        image: "images/casher-jacket-racing.webp"
    },
    {
        id: 9,
        brand: "CASHER",
        name: "Джерси Pink",
        category: "ДЖЕРСИ",
        price: 4250,
        image: "images/casher-jersey-pink.webp"
    },
    {
        id: 10,
        brand: "CASHER",
        name: "Пуховик чёрный",
        category: "КУРТКИ",
        price: 17000,
        image: "images/casher-puffer-black.webp"
    },
    {
        id: 11,
        brand: "GAP",
        name: "Худи бежевое",
        category: "ХУДИ",
        price: 2400,
        image: "images/gap-hoodie-beige.jpeg"
    },
    {
        id: 12,
        brand: "GUCCI",
        name: "Футболка чёрная",
        category: "ФУТБОЛКИ",
        price: 45500,
        image: "images/gucci-tshirt-black.jpg"
    },
    {
        id: 13,
        brand: "GUCCI",
        name: "Футболка белая",
        category: "ФУТБОЛКИ",
        price: 50000,
        image: "images/gucci-tshirt-white.jpg"
    },
    {
        id: 14,
        brand: "GLORY SEASON",
        name: "Дублёнка коричневая",
        category: "КУРТКИ",
        price: 12000,
        image: "images/russia-jacket-brown.jpeg"
    },
    {
        id: 15,
        brand: "СЕЗОН СЛАВЫ",
        name: "Футболка чёрная",
        category: "ФУТБОЛКИ",
        price: 3000,
        image: "images/sezon-slavy-tshirt-black.png"
    },
    {
        id: 16,
        brand: "SWAGCLUB",
        name: "Семейники",
        category: "НИЖНЕЕ БЕЛЬЁ",
        price: 3200,
        image: "images/swagclub-shorts-pink.jpg"
    },
    {
        id: 17,
        brand: "SWAGCLUB",
        name: "Жилет чёрный",
        category: "ЖИЛЕТЫ",
        price: 4444,
        image: "images/swagclub-vest-black.jpg"
    }
];

// ВЫВОД ТОВАРОВ НА СТРАНИЦУ

const productsList = document.querySelector("#products-list");

if (productsList) {
    productsList.innerHTML = products.map((product, index) => {
        const priceLabel = product.price === null
            ? "ЦЕНА УТОЧНЯЕТСЯ"
            : `${product.price.toLocaleString("ru-RU")} ₽`;

        return `
            <div class="product-card">
                <div class="product-image">
                    <img
                        class="product-photo"
                        src="${product.image}"
                        alt="${product.brand} ${product.name}"
                    >

                    <span class="product-number">
                        ${String(index + 1).padStart(2, "0")}
                    </span>
                </div>

                <div class="product-info">
                    <p class="product-category">${product.category}</p>
                    <h3>${product.brand} ${product.name}</h3>

                    <div class="product-bottom">
                        <span class="product-price">${priceLabel}</span>

                        <button
                            class="product-button"
                            data-product-id="${product.id}"
                        >
                            СМОТРЕТЬ →
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}


// ОТКРЫТИЕ КАРТОЧКИ ТОВАРА И РАБОТА КОРЗИНЫ

const productModal = document.querySelector("#product-modal");
const modalImage = document.querySelector("#modal-image");
const modalCategory = document.querySelector("#modal-category");
const modalTitle = document.querySelector("#modal-title");
const modalPrice = document.querySelector("#modal-price");
const sizeOptions = document.querySelector("#size-options");
const addToCartButton = document.querySelector("#add-to-cart-button");
const modalMessage = document.querySelector("#modal-message");

const cartContainer = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const checkoutButton = document.querySelector("#checkout-button");

let activeProduct = null;
let selectedSize = null;


// ЗАГРУЗКА СОХРАНЁННОЙ КОРЗИНЫ

let cartItems = [];

try {
    const savedCart = JSON.parse(
        localStorage.getItem("bigGangCart") || "[]"
    );

    if (Array.isArray(savedCart)) {
        cartItems = savedCart;
    }
} catch (error) {
    cartItems = [];
}

// СОХРАНЕНИЕ КОРЗИНЫ

function saveCart() {
    localStorage.setItem(
        "bigGangCart",
        JSON.stringify(cartItems)
    );
}

// ФОРМАТИРОВАНИЕ ЦЕНЫ
function formatPrice(price) {
    return price.toLocaleString("ru-RU") + " ₽";
}

// ОТКРЫТИЕ КАРТОЧКИ
function openProduct(product) {
    activeProduct = product;
    selectedSize = null;

    modalImage.src = product.image;
    modalImage.alt = product.brand + " " + product.name;

    modalCategory.textContent = product.category;
    modalTitle.textContent = product.brand + " " + product.name;
    modalPrice.textContent = formatPrice(product.price);

    modalMessage.textContent = "";

    sizeOptions.querySelectorAll("button").forEach(button => {
        button.classList.remove("selected");
    });

    productModal.hidden = false;
    document.body.style.overflow = "hidden";
}

// ЗАКРЫТИЕ КАРТОЧКИ
function closeProductModal() {
    productModal.hidden = true;
    document.body.style.overflow = "";
}

// НАЖАТИЕ НА КНОПКУ СМОТРЕТЬ
productsList.addEventListener("click", event => {
    const button = event.target.closest(".product-button");

    if (!button) return;

    const productId = Number(button.dataset.productId);

    const product = products.find(item => item.id === productId);

    if (product) {
        openProduct(product);
    }
});

// ЗАКРЫТИЕ ПО КРЕСТИКУ ИЛИ ФОНУ
productModal.addEventListener("click", event => {
    if (event.target.closest("[data-close-modal]")) {
        closeProductModal();
    }
});

// ЗАКРЫТИЕ ПО КЛАВИШЕ ESC
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !productModal.hidden) {
        closeProductModal();
    }
});

// ВЫБОР РАЗМЕРА
sizeOptions.addEventListener("click", event => {
    const button = event.target.closest("button[data-size]");

    if (!button) return;

    selectedSize = button.dataset.size;

    sizeOptions.querySelectorAll("button").forEach(sizeButton => {
        sizeButton.classList.remove("selected");
    });

    button.classList.add("selected");

    modalMessage.textContent = "";
});

// ОТОБРАЖЕНИЕ КОРЗИНЫ
function renderCart() {
    if (cartItems.length === 0) {
        cartContainer.innerHTML =
            '<p class="cart-empty">КОРЗИНА ПОКА ПУСТА</p>';
    } else {
        cartContainer.innerHTML = cartItems.map((item, index) => {
            const product = products.find(
                product => product.id === item.productId
            );

            return `
                <div class="cart-item">
                    <img
                        class="cart-item-photo"
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <div class="cart-item-details">
                        <p class="cart-item-brand">${product.brand}</p>
                        <h3>${product.name}</h3>
                        <p>РАЗМЕР: ${item.size}</p>
                        <strong>${formatPrice(product.price)}</strong>
                    </div>

                    <button
                        class="cart-remove"
                        data-remove-index="${index}"
                    >
                        УДАЛИТЬ
                    </button>
                </div>
            `;
        }).join("");
    }

    const total = cartItems.reduce((sum, item) => {
        const product = products.find(
            product => product.id === item.productId
        );

        return sum + product.price;
    }, 0);

    cartTotal.textContent = formatPrice(total);
    checkoutButton.disabled = cartItems.length === 0;
    const cartCount = document.querySelector("#cart-count");

if (cartCount) {
    cartCount.textContent = cartItems.length;
}
}

// ДОБАВЛЕНИЕ В КОРЗИНУ
addToCartButton.addEventListener("click", () => {
    if (!selectedSize) {
        modalMessage.textContent = "СНАЧАЛА ВЫБЕРИ РАЗМЕР";
        return;
    }

   cartItems.push({
    productId: activeProduct.id,
    size: selectedSize,
    brand: activeProduct.brand,
    name: activeProduct.name,
    image: activeProduct.image,
    price: activeProduct.price
});

saveCart();

    renderCart();
    closeProductModal();
});

// УДАЛЕНИЕ ИЗ КОРЗИНЫ
cartContainer.addEventListener("click", event => {
    const button = event.target.closest(".cart-remove");

    if (!button) return;

    const index = Number(button.dataset.removeIndex);

    cartItems.splice(index, 1);

    renderCart();
    renderCart();
});

// ПЕРВОНАЧАЛЬНОЕ ОТОБРАЖЕНИЕ КОРЗИНЫ
renderCart();



// ОФОРМЛЕНИЕ ЗАКАЗА

const checkoutModal = document.querySelector("#checkout-modal");
const checkoutForm = document.querySelector("#checkout-form");

const checkoutFormWrapper = document.querySelector("#checkout-form-wrapper");
const checkoutSuccess = document.querySelector("#checkout-success");

const successOrderNumber = document.querySelector("#success-order-number");
const finishOrderButton = document.querySelector("#finish-order");

// ОТКРЫТИЕ ОФОРМЛЕНИЯ ЗАКАЗА

checkoutButton.addEventListener("click", () => {
    if (cartItems.length === 0) {
        return;
    }

    checkoutFormWrapper.hidden = false;
    checkoutSuccess.hidden = true;

    checkoutModal.hidden = false;
    document.body.style.overflow = "hidden";
});

// ЗАКРЫТИЕ ОКНА ЗАКАЗА

function closeCheckoutModal() {
    checkoutModal.hidden = true;
    document.body.style.overflow = "";

    checkoutFormWrapper.hidden = false;
    checkoutSuccess.hidden = true;

    checkoutForm.reset();
}

// ЗАКРЫТИЕ ПО КРЕСТИКУ ИЛИ ФОНУ

checkoutModal.addEventListener("click", event => {
    if (event.target.closest("[data-close-checkout]")) {
        closeCheckoutModal();
    }
});

// ЗАКРЫТИЕ ПО ESC

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !checkoutModal.hidden) {
        closeCheckoutModal();
    }
});

// СОЗДАНИЕ ЗАКАЗА

checkoutForm.addEventListener("submit", event => {
    event.preventDefault();

    if (cartItems.length === 0) {
        return;
    }

    // Генерация номера демонстрационного заказа
    const orderNumber = "BG-" + Date.now().toString().slice(-6);

    successOrderNumber.textContent =
        "НОМЕР ВАШЕГО ЗАКАЗА: " + orderNumber;

    // Показываем успешное оформление
    checkoutFormWrapper.hidden = true;
    checkoutSuccess.hidden = false;

    // Очищаем корзину
    cartItems.length = 0;
    saveCart();
    renderCart();
});

// ВОЗВРАТ В МАГАЗИН

finishOrderButton.addEventListener("click", () => {
    closeCheckoutModal();
});

