// script.js

// Функция для добавления товара
function addProduct() {
    const productName = document.getElementById("product-name").value;
    const productDescription = document.getElementById("product-description").value;
    const productQuantity = document.getElementById("product-quantity").value;
    const productCategory = document.getElementById("product-category").value;

    if (productName && productQuantity && productCategory !== "Выбрать категорию") {
        const product = {
            name: productName,
            description: productDescription,
            quantity: productQuantity,
            category: productCategory,
        };

        // Добавление товара в список и сброс формы
        addProductToUI(product);
        clearForm();
    } else {
        alert("Пожалуйста, заполните все обязательные поля.");
    }
}

// Функция для добавления товара в пользовательский интерфейс
function addProductToUI(product) {
    const productList = document.getElementById("product-list");
    const li = document.createElement("li");
    li.innerHTML = `<h3>${product.name}</h3><p>${product.description}</p><p>Количество: ${product.quantity}</p><p>Категория: ${product.category}</p>`;
    li.addEventListener("click", function () {
        showEditForm(productList.children.length - 1, product);
    });
    productList.appendChild(li);
}

// Функция для очистки формы
function clearForm() {
    document.getElementById("product-name").value = "";
    document.getElementById("product-description").value = "";
    document.getElementById("product-quantity").value = "1";
    document.getElementById("product-category").value = "Выбрать категорию";
}

// Обработчик для добавления товара при отправке формы
document.getElementById("add-product-form").addEventListener("submit", function (e) {
    e.preventDefault();
    addProduct();
});

// Функция для загрузки выпадающего списка категорий из localStorage
function loadCategories() {
    const productCategorySelect = document.getElementById("product-category");
    const selectCategory = document.getElementById("select-category");
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    categories.forEach(function (category) {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        productCategorySelect.appendChild(option);

        const optionSelect = document.createElement("option");
        optionSelect.value = category;
        optionSelect.textContent = category;
        selectCategory.appendChild(optionSelect);
    });
}

// Вызываем функцию загрузки категорий при загрузке страницы
document.addEventListener("DOMContentLoaded", loadCategories);

// Функция для добавления новой категории
function addCategory() {
    const newCategory = document.getElementById("new-category").value.trim();
    if (newCategory) {
        const productCategorySelect = document.getElementById("product-category");
        const selectCategory = document.getElementById("select-category");

        // Добавить категорию в выпадающий список
        const option = document.createElement("option");
        option.value = newCategory;
        option.textContent = newCategory;
        productCategorySelect.appendChild(option);

        // Добавить категорию в список выбора
        const optionSelect = document.createElement("option");
        optionSelect.value = newCategory;
        optionSelect.textContent = newCategory;
        selectCategory.appendChild(optionSelect);

        // Сохранить новую категорию в localStorage
        const categories = JSON.parse(localStorage.getItem("categories")) || [];
        categories.push(newCategory);
        localStorage.setItem("categories", JSON.stringify(categories));

        // Сброс полей ввода
        document.getElementById("new-category").value = "";
        document.getElementById("select-category").value = newCategory;
    }
}

// Функция для удаления категории
function deleteCategory() {
    const selectedCategory = document.getElementById("select-category").value;
    if (selectedCategory) {
        const productCategorySelect = document.getElementById("product-category");
        const selectCategory = document.getElementById("select-category");

        // Удалить категорию из выпадающего списка
        const option = productCategorySelect.querySelector(`option[value="${selectedCategory}"]`);
        productCategorySelect.removeChild(option);

        // Удалить категорию из списка выбора
        const optionSelect = selectCategory.querySelector(`option[value="${selectedCategory}"]`);
        selectCategory.removeChild(optionSelect);

        // Удалить категорию из localStorage
        const categories = JSON.parse(localStorage.getItem("categories")) || [];
        const index = categories.indexOf(selectedCategory);
        if (index !== -1) {
            categories.splice(index, 1);
            localStorage.setItem("categories", JSON.stringify(categories));
        }

        // Сброс поля выбора категории
        document.getElementById("select-category").value = "";
    }
}

// Функция для отображения формы редактирования товара
function showEditForm(index, product) {
    const editProductForm = document.getElementById("edit-product-form");
    const editProductIndex = document.getElementById("edit-product-index");
    const editProductName = document.getElementById("edit-product-name");
    const editProductDescription = document.getElementById("edit-product-description");
    const editProductQuantity = document.getElementById("edit-product-quantity");
    const editProductCategory = document.getElementById("edit-product-category");

    editProductForm.style.display = "block";
    editProductIndex.value = index;
    editProductName.value = product.name;
    editProductDescription.value = product.description;
    editProductQuantity.value = product.quantity;
    editProductCategory.value = product.category;
}

// Функция для редактирования товара в пользовательском интерфейсе
function editProductInUI(product, index) {
    const productList = document.getElementById("product-list");
    const items = productList.getElementsByTagName("li")[index];
    items.innerHTML = `<h3>${product.name}</h3><p>${product.description}</p><p>Количество: ${product.quantity}</p><p>Категория: ${product.category}</p>`;
}

// Функция для очистки формы редактирования товара
function clearEditForm() {
    document.getElementById("edit-product-form").style.display = "none";
    document.getElementById("edit-product-index").value = "";
    document.getElementById("edit-product-name").value = "";
    document.getElementById("edit-product-description").value = "";
    document.getElementById("edit-product-quantity").value = "1";
    document.getElementById("edit-product-category").value = "Выбрать категорию";
}

// Обработчик для редактирования товара
document.getElementById("edit-product-form").addEventListener("submit", function (e) {
    e.preventDefault();
    editProduct();
});

// Функция для редактирования товара
function editProduct() {
    const editProductIndex = document.getElementById("edit-product-index").value;
    const productName = document.getElementById("edit-product-name").value;
    const productDescription = document.getElementById("edit-product-description").value;
    const productQuantity = document.getElementById("edit-product-quantity").value;
    const productCategory = document.getElementById("edit-product-category").value;

    if (productName && productQuantity && productCategory !== "Выбрать категорию") {
        const product = {
            name: productName,
            description: productDescription,
            quantity: productQuantity,
            category: productCategory,
        };

        // Редактирование товара в списке и сброс формы
        editProductInUI(product, editProductIndex);
        clearEditForm();
    } else {
        alert("Пожалуйста, заполните все обязательные поля.");
    }
}

// Функция для экспорта данных в Excel
function exportToExcel() {
    const productList = document.getElementById("product-list");
    const items = productList.getElementsByTagName("li");
    const data = [];

    for (let item of items) {
        const name = item.querySelector("h3").textContent;
        const description = item.querySelector("p:nth-of-type(2)").textContent;
        const quantity = item.querySelector("p:nth-of-type(3)").textContent;
        const category = item.querySelector("p:nth-of-type(4)").textContent;
        data.push({ "Название": name, "Описание": description, "Количество": quantity, "Категория": category });
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Товары");
    const wopts = { bookType: "xlsx", type: "array" };
    const excelBuffer = XLSX.write(wb, wopts);
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "товары.xlsx");
}

// Обработчик для кнопки "Экспорт в Excel"
document.getElementById("export-button").addEventListener("click", function () {
    exportToExcel();
});
