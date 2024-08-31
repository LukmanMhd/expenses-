// Initialize expense tracking
const expenses = {
    person1: 0,
    person2: 0,
    person3: 0
};

function addExpense(person) {
    const amount = parseFloat(document.getElementById(person).value) || 0;
    expenses[person] += amount;
    document.getElementById(person).value = '';
    displayExpenses();
}

function subtractExpense(person) {
    const amount = parseFloat(document.getElementById(person).value) || 0;
    expenses[person] -= amount;
    document.getElementById(person).value = '';
    displayExpenses();
}

function calculateExpenses() {
    const totalExpense = expenses.person1 + expenses.person2 + expenses.person3;
    const equalShare = totalExpense / 3;
    
    const person1Balance = expenses.person1 - equalShare;
    const person2Balance = expenses.person2 - equalShare;
    const person3Balance = expenses.person3 - equalShare;
    
    let result = '';
    if (person1Balance > 0) {
        result += `Person 1 should receive $${person1Balance.toFixed(2)}. `;
    } else if (person1Balance < 0) {
        result += `Person 1 owes $${Math.abs(person1Balance).toFixed(2)}. `;
    }
    
    if (person2Balance > 0) {
        result += `Person 2 should receive $${person2Balance.toFixed(2)}. `;
    } else if (person2Balance < 0) {
        result += `Person 2 owes $${Math.abs(person2Balance).toFixed(2)}. `;
    }
    
    if (person3Balance > 0) {
        result += `Person 3 should receive $${person3Balance.toFixed(2)}. `;
    } else if (person3Balance < 0) {
        result += `Person 3 owes $${Math.abs(person3Balance).toFixed(2)}. `;
    }

    document.getElementById('result').innerText = result;
}

function displayExpenses() {
    document.getElementById('result').innerText = `Person 1: $${expenses.person1.toFixed(2)}, Person 2: $${expenses.person2.toFixed(2)}, Person 3: $${expenses.person3.toFixed(2)}`;
}

function clearData() {
    // Reset expenses
    expenses.person1 = 0;
    expenses.person2 = 0;
    expenses.person3 = 0;

    // Clear input fields
    document.getElementById('person1').value = '';
    document.getElementById('person2').value = '';
    document.getElementById('person3').value = '';

    // Clear results display
    document.getElementById('result').innerText = 'Data cleared.';
}
