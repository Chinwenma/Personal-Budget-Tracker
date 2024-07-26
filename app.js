document.addEventListener('DOMContentLoaded', () => {
    const transactionForm = document.getElementById('transaction-form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const transactionList = document.getElementById('transaction-list');
    const totalIncome = document.getElementById('total-income');
    const totalExpenses = document.getElementById('total-expenses');
    const balance = document.getElementById('balance');
    const submitBtn = document.getElementById('submit-btn');
    const updateBtn = document.getElementById('update-btn');

    let transactions = [];
    let editingTransactionId = null;

    transactionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (editingTransactionId) {
            updateTransaction();
        } else {
            addTransaction();
        }
    });

    updateBtn.addEventListener('click', updateTransaction);

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
            clearForm();
        }
    }

    function editTransaction(id) {
        const transaction = transactions.find(trans => trans.id === id);
        if (transaction) {
            descriptionInput.value = transaction.description;
            amountInput.value = transaction.amount;
            editingTransactionId = id;
            submitBtn.style.display = 'none';
            updateBtn.style.display = 'inline';
        }
    }

    function updateTransaction() {
        const description = descriptionInput.value;
        const amount = parseFloat(amountInput.value);

        if (description && !isNaN(amount)) {
            const transaction = transactions.find(trans => trans.id === editingTransactionId);
            if (transaction) {
                transaction.description = description;
                transaction.amount = amount;
                updateTransactions();
                clearForm();
            }
        }
    }

    function deleteTransaction(id) {
        transactions = transactions.filter(transaction => transaction.id !== id);
        updateTransactions();
    }

    function updateTransactions() {
        transactionList.innerHTML = '';

        let income = 0;
        let expenses = 0;

        transactions.forEach(transaction => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${transaction.description} <span>${transaction.amount < 0 ? '-' : '+'}$${Math.abs(transaction.amount).toFixed(2)}</span>
                <button class="edit-btn" onclick="editTransaction(${transaction.id})">Edit</button>
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

        submitBtn.style.display = 'inline';
        updateBtn.style.display = 'none';
        editingTransactionId = null;
    }

    function clearForm() {
        descriptionInput.value = '';
        amountInput.value = '';
    }

    window.editTransaction = editTransaction;
    window.deleteTransaction = deleteTransaction;
});
