document.addEventListener('DOMContentLoaded', () => {
    const transactionForm = document.getElementById('transaction-form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const transactionList = document.getElementById('transaction-list');
    const totalIncome = document.getElementById('total-income');
    const totalExpenses = document.getElementById('total-expenses');
    const balance = document.getElementById('balance');

    let transactions = [];

    transactionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTransaction();
    });

    function addTransaction() {
        const description = descriptionInput.value;
        const amount = parseFloat(amountInput.value);

        if (description && !isNaN(amount)) {
            const transaction = {
                id: Date.now(),
                description,
                amount
            };

            transactions.push(transaction);
            updateTransactions();
            descriptionInput.value = '';
            amountInput.value = '';
        }
    }

    function updateTransactions() {
        transactionList.innerHTML = '';

        let income = 0;
        let expenses = 0;

        transactions.forEach(transaction => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${transaction.description} <span>${transaction.amount < 0 ? '-' : '+'}$${Math.abs(transaction.amount).toFixed(2)}</span>
                <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button>
            `;

            transactionList.appendChild(li);

            if (transaction.amount > 0) {
                income += transaction.amount;
            } else {
                expenses += transaction.amount;
            }
        });

        totalIncome.textContent = `$${income.toFixed(2)}`;
        totalExpenses.textContent = `$${Math.abs(expenses).toFixed(2)}`;
        balance.textContent = `$${(income + expenses).toFixed(2)}`;
    }

    window.deleteTransaction = function (id) {
        transactions = transactions.filter(transaction => transaction.id !== id);
        updateTransactions();
    };
});
