// Function to save user account information
function saveAccountInfo(username, userData) {
    localStorage.setItem(username, JSON.stringify(userData));
}

// Function to retrieve user account information
function getAccountInfo(username) {
    const userData = localStorage.getItem(username);
    return userData ? JSON.parse(userData) : null;
}

// Function to create an account
function createAccount(event) {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate the form fields (you may add more validation)
    if (!firstName || !lastName || !email || !username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Create an object to store user information
    const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password
    };

    // Save user information in localStorage (replace with server-side storage in a real application)
    saveAccountInfo(username, userData);

    // Redirect to the sign-in page or any other page
    window.location.href = 'signin.html';
}

// Function to authenticate user
function authenticateUser(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const userData = getAccountInfo(username);

    if (userData && userData.password === password) {
        // Authentication successful, redirect to the budget page or any other page
        window.location.href = 'budget.html';
    } else {
        alert('Invalid username or password. Please try again.');
    }
}

// Function to save the entered salary for the current month
function saveSalary() {
    const currentMonthSalary = document.getElementById('current-month-salary').value;
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });

    // Save the data in localStorage (you may replace this with server-side storage)
    localStorage.setItem(currentMonth, JSON.stringify({ salary: currentMonthSalary, expenses: [] }));

    // Update the displayed salary list
    updateSalaryList();
}

// Function to update and display the saved salary and expenses for the current month
function updateBudgetInfo() {
    const currentMonthInfo = document.getElementById('current-month-info');
    const remainingAmountValue = document.getElementById('remaining-amount-value');
    const expensesList = document.getElementById('expenses-display');

    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const savedData = JSON.parse(localStorage.getItem(currentMonth));

    // Display the current month and total salary
    currentMonthInfo.innerHTML = `
        <h3>${currentMonth}</h3>
        <p>Total Salary: $${savedData?.salary || 0}</p>
    `;

    // Display the expenses list
    expensesList.innerHTML = '<h3>Expenses</h3>';
    savedData?.expenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.category}: $${expense.amount}`;
        expensesList.appendChild(li);
    });

    // Display and update the remaining amount
    const totalSalary = parseFloat(savedData?.salary || 0);
    const totalExpenses = savedData?.expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0) || 0;
    const remainingAmount = totalSalary - totalExpenses;
    remainingAmountValue.textContent = `$${remainingAmount}`;
}

// Function to add a new expense for the current month
function addExpense() {
    const expenseCategory = document.getElementById('expense-category').value;
    const expenseAmount = document.getElementById('expense-amount').value;

    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const savedData = JSON.parse(localStorage.getItem(currentMonth)) || { salary: 0, expenses: [] };

    savedData.expenses.push({ category: expenseCategory, amount: expenseAmount });
    localStorage.setItem(currentMonth, JSON.stringify(savedData));

    // Update the displayed salary and expenses list
    updateBudgetInfo();
}

// Function to navigate to the previous month
function navigateToPreviousMonth() {
    // You may implement logic to navigate to the previous month
    // For simplicity, this example uses a hardcoded month list
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentIndex = monthList.indexOf(currentMonth);

    if (currentIndex > 0) {
        const previousMonth = monthList[currentIndex - 1];
        // Update the displayed salary and expenses list for the previous month
        updateBudgetInfoForMonth(previousMonth);
    }
}

// Function to add a new month
function addNewMonth() {
    // You may implement logic to add a new month
    // For simplicity, this example uses a hardcoded month list
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentIndex = monthList.indexOf(currentMonth);

    if (currentIndex < 11) {
        const newMonth = monthList[currentIndex + 1];
        // Save initial data for the new month
        localStorage.setItem(newMonth, JSON.stringify({ salary: 0, expenses: [] }));
        // Update the displayed salary and expenses list for the new month
        updateBudgetInfoForMonth(newMonth);
    }
}

// Function to update and display the saved salary and expenses for a specific month
function updateBudgetInfoForMonth(month) {
    const currentMonthInfo = document.getElementById('current-month-info');
    const remainingAmountValue = document.getElementById('remaining-amount-value');
    const expensesList = document.getElementById('expenses-display');

    const savedData = JSON.parse(localStorage.getItem(month));

    // Display the current month and total salary
    currentMonthInfo.innerHTML = `
        <h3>${month}</h3>
        <p>Total Salary: $${savedData?.salary || 0}</p>
    `;

    // Display the expenses list
    expensesList.innerHTML = '<h3>Expenses</h3>';
    savedData?.expenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.category}: $${expense.amount}`;
        expensesList.appendChild(li);
    });

    // Display and update the remaining amount
    const totalSalary = parseFloat(savedData?.salary || 0);
    const totalExpenses = savedData?.expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0) || 0;
    const remainingAmount = totalSalary - totalExpenses;
    remainingAmountValue.textContent = `$${remainingAmount}`;
}

// Function to update and display the saved salary for each month
function updateSalaryList() {
    const salaryList = document.querySelector('.salary-list');
    salaryList.innerHTML = '';

    // Retrieve data from localStorage and update the display
    for (let i = 0; i < 12; i++) {
        const month = new Date(2023, i, 1).toLocaleString('default', { month: 'long' });
        const savedData = JSON.parse(localStorage.getItem(month));

        const monthSalaryDiv = document.createElement('div');
        monthSalaryDiv.classList.add('month-salary');
        monthSalaryDiv.innerHTML = `
            <h3>${month}</h3>
            <p>Total Salary: $${savedData?.salary || 0}</p>
        `;

        salaryList.appendChild(monthSalaryDiv);
    }
}
// Function to get the number of days in a month
function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

// Function to generate calendar days
function generateCalendarDays(month, year) {
    const daysList = document.getElementById('days');
    daysList.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = getDaysInMonth(month, year);

    // Add blank spaces for the days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const li = document.createElement('li');
        li.textContent = '';
        daysList.appendChild(li);
    }

    // Add the actual days of the month
    for (let day = 1; day <= totalDays; day++) {
        const li = document.createElement('li');
        li.textContent = day;

        // Add an input field for each day to allow user input
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Add event';
        input.addEventListener('blur', (event) => saveEvent(month, year, day, event.target.value));
        li.appendChild(input);

        daysList.appendChild(li);
    }
}

// Function to update the displayed month and generate calendar days
function updateCalendar(month, year) {
    const monthYearDisplay = document.getElementById('month-year');
    monthYearDisplay.textContent = `${months[month]} ${year}`;

    generateCalendarDays(month, year);
}

// Function to save user input for a specific day
function saveEvent(month, year, day, eventText) {
    const key = `${months[month]}-${year}`;
    const savedData = JSON.parse(localStorage.getItem(key)) || {};

    if (!savedData[day]) {
        savedData[day] = [];
    }

    savedData[day].push(eventText);
    localStorage.setItem(key, JSON.stringify(savedData));
}

// Function to load events for a specific day
function loadEvents(month, year, day) {
    const key = `${months[month]}-${year}`;
    const savedData = JSON.parse(localStorage.getItem(key)) || {};

    const events = savedData[day] || [];
    const eventInput = document.querySelector(`#days li:nth-child(${day + 1}) input`);

    if (eventInput) {
        eventInput.value = events.join('\n');
    }
}

// Function to navigate to the previous month
function prevMonth() {
    if (currentMonth > 0) {
        currentMonth--;
    } else {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar(currentMonth, currentYear);
}

// Function to navigate to the next month
function nextMonth() {
    if (currentMonth < 11) {
        currentMonth++;
    } else {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar(currentMonth, currentYear);
}

// Initial setup when the page loads
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

updateCalendar(currentMonth, currentYear);
// Function to save the entered annual income
function saveAnnualIncome() {
    const annualIncomeInput = document.getElementById('annual-income');
    let annualIncome = parseFloat(annualIncomeInput.value) || 0;

    // Adjust annual income based on the specified ranges
    if (annualIncome >= 0 && annualIncome <= 5000) {
        annualIncome = 1;
    } else if (annualIncome > 5000 && annualIncome <= 10000) {
        annualIncome = 0.04;
    } else if (annualIncome > 10000) {
        annualIncome = 0.05;
    }

    // Save the adjusted annual income in localStorage (you may replace this with server-side storage)
    localStorage.setItem('annualIncome', annualIncome);

    // Update the total income after taxes
    updateTotalIncome();
    // You can perform additional actions if needed
    alert('Annual income saved successfully!');
}

function saveHourlyRate() {
    const hourlyRateInput = document.getElementById('hourly-rate');
    const hourlyRate = parseFloat(hourlyRateInput.value) || 0;

    // Save the hourly rate in localStorage (you may replace this with server-side storage)
    localStorage.setItem('hourlyRate', hourlyRate);

    // You can perform additional actions if needed
    alert('Hourly rate saved successfully!');
}

// Function to save the entered hours worked
function saveHoursWorked() {
    const hoursWorkedInput = document.getElementById('hours-worked');
    const hoursWorked = parseFloat(hoursWorkedInput.value) || 0;

    // Save the hours worked in localStorage (you may replace this with server-side storage)
    localStorage.setItem('hoursWorked', hoursWorked);

    // You can perform additional actions if needed
    alert('Hours worked saved successfully!');
}

// Function to update the total income after taxes
function updateTotalIncome() {
    const hourlyRate = parseFloat(document.getElementById('hourly-rate').value) || 0;
    const hoursWorked = parseFloat(document.getElementById('hours-worked').value) || 0;
    const annualIncome = parseFloat(localStorage.getItem('annualIncome')) || 0;

    // Calculate the total income after taxes (you may adjust this based on your calculation logic)
    const hourlyIncome = hourlyRate * hoursWorked;
}

// Function to calculate and display total income after taxes
function calculateAndDisplayTotalIncome() {
    // Update the total income after taxes
    updateTotalIncome();

    // Display the total income in the total box
    const totalIncomeInput = document.getElementById('total-income');
    const calculatedTotalIncome = parseFloat(totalIncomeInput.value) || 0;

    // Add the calculated total income to the total income box
    totalIncomeInput.value = calculatedTotalIncome.toFixed(2);
}

// Initial update when the page loads
updateSalaryList();
updateBudgetInfo();

// Optional: Add event listeners to buttons
document.getElementById('create-account-form').addEventListener('submit', createAccount);
document.getElementById('sign-in-form').addEventListener('submit', authenticateUser);
document.getElementById('save-salary-button').addEventListener('click', saveSalary);
document.getElementById('add-expense-button').addEventListener('click', addExpense);
document.getElementById('previous-month-button').addEventListener('click', navigateToPreviousMonth);
document.getElementById('add-new-month-button').addEventListener('click', addNewMonth);
