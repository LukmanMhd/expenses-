let expenses = [];
let names = {};

function addExpense() {
    const person = document.getElementById('person').value;
    const expense = parseFloat(document.getElementById('expense').value);

    if (person && !isNaN(expense) && expense > 0) {
        expenses.push({ person, amount: expense });

        // Update list
        const expenseList = document.getElementById('expenseList');
        const listItem = document.createElement('li');
        listItem.textContent = `${person}: $${expense.toFixed(2)}`;
        expenseList.appendChild(listItem);

        // Update summary
        updateSummary();
        
        // Clear input fields
        document.getElementById('person').value = '';
        document.getElementById('expense').value = '';
    } else {
        alert('Please enter valid data.');
    }
}

function updateSummary() {
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const numPeople = new Set(expenses.map(e => e.person)).size;
    const perPerson = totalExpenses / numPeople;

    let summary = `<p>Total Expenses: $${totalExpenses.toFixed(2)}</p>`;
    summary += `<p>Per Person Share: $${perPerson.toFixed(2)}</p>`;

    const summaryDiv = document.getElementById('summary');
    summaryDiv.innerHTML = summary;
}
