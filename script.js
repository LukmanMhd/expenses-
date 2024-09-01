// Initialize expense tracking
const expenses = {
    person1: { total: 0, details: [] },
    person2: { total: 0, details: [] },
    person3: { total: 0, details: [] }
};

function parseAmounts(input) {
    return input.split(',')
        .map(amount => parseFloat(amount.trim()))
        .filter(amount => !isNaN(amount) && amount > 0);
}

function addExpenses(person) {
    const input = document.getElementById(person).value;
    const amounts = parseAmounts(input);
    
    if (amounts.length > 0) {
        amounts.forEach(amount => expenses[person].details.push(amount));
        expenses[person].total += amounts.reduce((a, b) => a + b, 0);
        document.getElementById(person).value = '';
        displayExpenses();
    }
}

function subtractExpenses(person) {
    const input = document.getElementById(person).value;
    const amounts = parseAmounts(input);
    
    if (amounts.length > 0) {
        amounts.forEach(amount => expenses[person].details.push(-amount));
        expenses[person].total -= amounts.reduce((a, b) => a + b, 0);
        document.getElementById(person).value = '';
        displayExpenses();
    }
}

function calculateExpenses() {
    const totalExpense = expenses.person1.total + expenses.person2.total + expenses.person3.total;
    const equalShare = totalExpense / 3;
    
    const person1Balance = expenses.person1.total - equalShare;
    const person2Balance = expenses.person2.total - equalShare;
    const person3Balance = expenses.person3.total - equalShare;
    
    let result = '';
    if (person1Balance > 0) {
        result += `ISMAIL should receive Rs ${person1Balance.toFixed(2)}. `;
    } else if (person1Balance < 0) {
        result += `ISMAIL owes Rs ${Math.abs(person1Balance).toFixed(2)}. `;
    }
    
    if (person2Balance > 0) {
        result += `AHADHU should receive Rs ${person2Balance.toFixed(2)}. `;
    } else if (person2Balance < 0) {
        result += `AHADHU owes Rs ${Math.abs(person2Balance).toFixed(2)}. `;
    }
    
    if (person3Balance > 0) {
        result += `LUKMAN should receive Rs ${person3Balance.toFixed(2)}. `;
    } else if (person3Balance < 0) {
        result += `LUKMAN owes Rs ${Math.abs(person3Balance).toFixed(2)}. `;
    }

    if (result === '') {
        result = 'No need to pay anyone.';
    }

    document.getElementById('result').innerText = result;
}

function displayExpenses() {
    const { person1, person2, person3 } = expenses;
    let result = '';
    
    if (person1.details.length > 0) {
        result += `ISMAIL - Details: ${person1.details.join(', ')} | Total: Rs ${person1.total.toFixed(2)}. `;
    }
    if (person2.details.length > 0) {
        result += `AHADHU - Details: ${person2.details.join(', ')} | Total: Rs ${person2.total.toFixed(2)}. `;
    }
    if (person3.details.length > 0) {
        result += `LUKMAN - Details: ${person3.details.join(', ')} | Total: Rs ${person3.total.toFixed(2)}. `;
    }
    if (result === '') {
        result = 'No expenses recorded.';
    }
    document.getElementById('result').innerText = result;
}

function clearData() {
    // Reset expenses
    expenses.person1 = { total: 0, details: [] };
    expenses.person2 = { total: 0, details: [] };
    expenses.person3 = { total: 0, details: [] };

    // Clear input fields
    document.getElementById('person1').value = '';
    document.getElementById('person2').value = '';
    document.getElementById('person3').value = '';

    // Clear results display
    document.getElementById('result').innerText = 'Data cleared.';
}
