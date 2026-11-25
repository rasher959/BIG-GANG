
// ОТДЕЛЬНАЯ СТРАНИЦА КОРЗИНЫ BIG GANG

const CART_KEY = "bigGangCart";

// ЗАГРУЗКА СОХРАНЁННЫХ ТОВАРОВ

let cartItems = [];

try {
    const savedCart = JSON.parse(
        localStorage.getItem(CART_KEY) || "[]"
    );

    if (Array.isArray(savedCart)) {
        cartItems = savedCart;
    }
} catch (error) {
    console.error("Не удалось загрузить корзину:", error);
}

// ЭЛЕМЕНТЫ СТРАНИЦЫ

const cartContainer = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const cartCount = document.querySelector("#cart-count");
const checkoutButton = document.querySelector("#checkout-button");

// ФОРМАТИРОВАНИЕ ЦЕНЫ

function formatPrice(price) {
    return Number(price).toLocaleString("ru-RU") + " ₽";
}

// СОХРАНЕНИЕ КОРЗИНЫ

function saveCart() {
    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cartItems)
    );
}

// ОТОБРАЖЕНИЕ ТОВАРОВ

function renderCart() {
    if (cartItems.length === 0) {
        cartContainer.innerHTML =
            '<p class="cart-empty">КОРЗИНА ПОКА ПУСТА</p>';
    } else {
        cartContainer.innerHTML = cartItems.map((item, index) => `
            <div class="cart-item">

                <img
                    class="cart-item-photo"
                    src="${item.image || ""}"
                    alt="${item.name || "Товар"}"
                >

                <div class="cart-item-details">
                    <p class="cart-item-brand">${item.brand || "BIG GANG"}</p>

                    <h3>${item.name || "Товар"}</h3>

                    <p>РАЗМЕР: ${item.size}</p>

                    <strong>${formatPrice(item.price || 0)}</strong>
                </div>

                <button
                    class="cart-remove"
                    data-remove-index="${index}"
                >
                    УДАЛИТЬ
                </button>

            </div>
        `).join("");
    }

    const total = cartItems.reduce(
        (sum, item) => sum + Number(item.price || 0),
        0
    );

    cartTotal.textContent = formatPrice(total);

    cartCount.textContent = cartItems.length;

    checkoutButton.disabled = cartItems.length === 0;
}

// УДАЛЕНИЕ ТОВАРА

cartContainer.addEventListener("click", event => {
    const button = event.target.closest(".cart-remove");

    if (!button) return;

    const index = Number(button.dataset.removeIndex);

    cartItems.splice(index, 1);

    saveCart();
    renderCart();
});

// ОКНО ОФОРМЛЕНИЯ ЗАКАЗА

const checkoutModal = document.querySelector("#checkout-modal");
const checkoutForm = document.querySelector("#checkout-form");

const checkoutFormWrapper =
    document.querySelector("#checkout-form-wrapper");

const checkoutSuccess =
    document.querySelector("#checkout-success");

const successOrderNumber =
    document.querySelector("#success-order-number");

const finishOrderButton =
    document.querySelector("#finish-order");

// ОТКРЫТИЕ ОФОРМЛЕНИЯ

checkoutButton.addEventListener("click", () => {
    if (cartItems.length === 0) return;

    checkoutFormWrapper.hidden = false;
    checkoutSuccess.hidden = true;

    checkoutModal.hidden = false;
    document.body.style.overflow = "hidden";
});

// ЗАКРЫТИЕ ОФОРМЛЕНИЯ

function closeCheckoutModal() {
    checkoutModal.hidden = true;
    document.body.style.overflow = "";

    checkoutFormWrapper.hidden = false;
    checkoutSuccess.hidden = true;

    checkoutForm.reset();
}

checkoutModal.addEventListener("click", event => {
    if (event.target.closest("[data-close-checkout]")) {
        closeCheckoutModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !checkoutModal.hidden) {
        closeCheckoutModal();
    }
});

// СОЗДАНИЕ ДЕМОНСТРАЦИОННОГО ЗАКАЗА

checkoutForm.addEventListener("submit", event => {
    event.preventDefault();

    if (cartItems.length === 0) return;

    const orderNumber =
        "BG-" + Date.now().toString().slice(-6);

    successOrderNumber.textContent =
        "НОМЕР ВАШЕГО ЗАКАЗА: " + orderNumber;

    checkoutFormWrapper.hidden = true;
    checkoutSuccess.hidden = false;

    // ОЧИЩАЕМ СОХРАНЁННУЮ КОРЗИНУ

    cartItems = [];

    saveCart();
    renderCart();
});

// ВОЗВРАТ В МАГАЗИН

finishOrderButton.addEventListener("click", () => {
    closeCheckoutModal();
    window.location.href = "index.html";
});

// ПЕРВОНАЧАЛЬНАЯ ЗАГРУЗКА

renderCart();



// ПЕРЕХОД ИЗ КОРЗИНЫ В КАТАЛОГ С АНИМАЦИЕЙ

const pageTransitionScreen = document.querySelector(".transition-screen");

function showPageTransition() {
    pageTransitionScreen.style.opacity = "1";
    pageTransitionScreen.style.visibility = "visible";
}

document.querySelectorAll(
    'a[href="index.html"], a[href^="index.html#"]'
).forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const destination = link.getAttribute("href");

        showPageTransition();

        setTimeout(() => {
            window.location.href = destination;
        }, 1500);
    });
});
