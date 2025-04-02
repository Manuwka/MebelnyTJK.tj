document.addEventListener("DOMContentLoaded", function () {
    const addOrderBtn = document.getElementById("add-order");
    const searchInput = document.getElementById("search-order");
    const ordersList = document.getElementById("orders-list");
    const modal = document.getElementById("order-modal");
    const modalContent = document.getElementById("order-details");
    const closeModal = document.querySelector(".close");

    addOrderBtn.addEventListener("click", function () {
        const name = document.getElementById("order-name").value;
        const type = document.getElementById("order-type").value;
        const amount = document.getElementById("order-amount").value;
        
        if (name && type && amount) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${name}</td>
                <td>${type}</td>
                <td>${amount}</td>
                <td class="status">Ожидание</td>
                <td><button class="receipt">📃</button></td>
            `;
            ordersList.appendChild(row);
            
            document.getElementById("order-name").value = "";
            document.getElementById("order-type").value = "";
            document.getElementById("order-amount").value = "";
        }
    });

    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.toLowerCase();
        const rows = ordersList.getElementsByTagName("tr");
        
        for (let row of rows) {
            const orderName = row.cells[0].textContent.toLowerCase();
            row.style.display = orderName.includes(searchValue) ? "" : "none";
        }
    });

    ordersList.addEventListener("click", function (e) {
        if (e.target.classList.contains("receipt")) {
            const row = e.target.parentElement.parentElement;
            const name = row.cells[0].textContent;
            const type = row.cells[1].textContent;
            const amount = row.cells[2].textContent;
            const status = row.cells[3].textContent;
            const orderTime = new Date().toLocaleString();
            
            modalContent.textContent =`Заказ: ${name} | Вид: ${type} | Количество: ${amount} | Время: ${orderTime} | Статус: ${status}`;
            modal.style.display = "block";
        }
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});