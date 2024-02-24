export function generateTableTemplate(data, div) {
    const table = document.createElement('table');

    const headerRow = document.createElement('tr');
    const headers = ['Capacity', 'Quantity'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.style.textAlign = 'center'
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    data.forEach(item => {
        const row = document.createElement('tr');
        Object.values(item).forEach(val => {
            const td = document.createElement('td');
            td.style.textAlign = 'center'
            td.textContent = val;
            row.appendChild(td);
        });
        table.appendChild(row);
    });

    div.appendChild(table);
}