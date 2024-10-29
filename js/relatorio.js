document.addEventListener("DOMContentLoaded", () => {
    const reportContainer = document.getElementById("report-container");
    const registerLocalStorage = getRegisterLocalStorage();

    const reportData = {};

    registerLocalStorage.forEach(register => {
        const date = register.data;
        if (!reportData[date]) {
            reportData[date] = [];
        }
        reportData[date].push(register);
    });

    for (const date in reportData) {
        const dateDiv = document.createElement("div");
        dateDiv.innerHTML = `<h2>${date}</h2>`;

        const table = document.createElement("table");
        table.innerHTML = `
            <tr>
                <th>Tipo</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Localização</th>
            </tr>
        `;

        reportData[date].forEach((register, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${register.tipo}</td>
                <td>${register.data}</td>
                <td>${register.hora}</td>
                <td>${register.localizacao.latitude}, ${register.localizacao.longitude}</td>
            `;
            table.appendChild(row);
        });

        dateDiv.appendChild(table);
        reportContainer.appendChild(dateDiv);
    }
});

function getRegisterLocalStorage() {
    let registers = localStorage.getItem("register");

    if (!registers) {
        return [];
    }

    return JSON.parse(registers);
}