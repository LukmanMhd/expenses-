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

function updateExpenses(person, isAdding) {
    const input = document.getElementById(person).value;
    const amounts = parseAmounts(input);
    
    if (amounts.length === 0) {
        alert('Please enter valid amounts.');
        return;
    }

    const totalChange = amounts.reduce((a, b) => a + b, 0);
    if (isAdding) {
        expenses[person].details.push(...amounts);
        expenses[person].total += totalChange;
    } else {
        expenses[person].details.push(...amounts.map(amount => -amount));
        expenses[person].total -= totalChange;
    }

    document.getElementById(person).value = '';
    displayExpenses();
}

function calculateExpenses() {
    const totalExpense = expenses.person1.total + expenses.person2.total + expenses.person3.total;
    const equalShare = totalExpense / 3;
    
    let result = '';
    ['person1', 'person2', 'person3'].forEach(person => {
        const personName = document.querySelector(`label[for="${person}"]`).innerText;
        const balance = expenses[person].total - equalShare;

        if (balance > 0) {
            result += `${personName} should receive Rs ${balance.toFixed(2)}. `;
        } else if (balance < 0) {
            result += `${personName} owes Rs ${Math.abs(balance).toFixed(2)}. `;
        }
    });

    if (result === '') {
        result = 'No need to pay anyone.';
    }

    document.getElementById('result').innerText = result;
}

function displayExpenses() {
    let result = '';
    
    Object.keys(expenses).forEach(person => {
        const personName = document.querySelector(`label[for="${person}"]`).innerText;
        const { details, total } = expenses[person];

        if (details.length > 0) {
            result += `${personName} - Details: ${details.join(', ')} | Total: Rs ${total.toFixed(2)}. `;
        }
    });

    if (result === '') {
        result = 'No expenses recorded.';
    }
    document.getElementById('result').innerText = result;
}

function clearData() {
    // Reset expenses
    Object.keys(expenses).forEach(person => {
        expenses[person] = { total: 0, details: [] };
    });

    // Clear input fields
    document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');

    // Clear results display
    document.getElementById('result').innerText = 'Data cleared.';
}

// Export to PDF
function exportToPDF() {
    const { person1, person2, person3 } = expenses;
    let doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Expense Tracker Report", 14, 22);
    
    let y = 30;
    ['person1', 'person2', 'person3'].forEach(person => {
        const personName = document.querySelector(`label[for="${person}"]`).innerText;
        const { details, total } = expenses[person];
        
        if (details.length > 0) {
            doc.setFontSize(14);
            doc.text(`${personName}`, 14, y);
            y += 10;
            doc.setFontSize(12);
            doc.text(`Details: ${details.join(', ')}`, 14, y);
            y += 10;
            doc.text(`Total: Rs ${total.toFixed(2)}`, 14, y);
            y += 20;
        }
    });

    doc.save('expense_report.pdf');
}
