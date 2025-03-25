
// globally declared user details
let loggedInAccount = localStorage.getItem("LoggedInUser");


// // welcome user
window.onload = function(){

    if(loggedInAccount){

        let registerLog = JSON.parse(localStorage.getItem(loggedInAccount));
        welcomeuser.innerHTML=`
        Welcome ${registerLog.name}` 
          
    }
    else{
        welcomeuser.innerHTML=`
        Welcome User` 
    }
      
}

// 88888888888888888888888888888888    ADD Income Event   8888888888888888
function addIncome(){

    let incometype = document.getElementById('inctype').value;
    let incomeamount = parseFloat(document.getElementById('incamount').value);

    if(!incometype || !incomeamount){
        incomewarning.innerHTML=`
        Enter all Input Fields`
        return;
    }

    // retrieving the user data object from localstorage
    let userData = JSON.parse(localStorage.getItem(loggedInAccount));
    
    // date and time 
    let dateTime = new Date().toLocaleString('en-IN', {  
        day: '2-digit', month: 'short', year: 'numeric',  
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true  
    }); // Format: 24 Mar 2025, 10:15:30 PM


    // ensure balance a valid number-----------------
    userData.incomeBalence = userData.incomeBalence ? parseFloat(userData.incomeBalence) : 0;

    // update the balence
    userData.incomeBalence += parseFloat(incomeamount);

    // created object for income section--------------------------
    let incomeEntry = {
        type: incometype,
        amount: incomeamount,
        balence:userData.incomeBalence,
        date:dateTime
    }



    // pushing the object to the income array 
    userData.incomeArray.push(incomeEntry);

    
    // loading the new data values back to localstorage
    localStorage.setItem(loggedInAccount,JSON.stringify(userData));

    // message,refresh,clearinputfield,display
    alert("Income Added successfully");

    location.reload(); // Refresh UI

    document.getElementById('inctype').value="";
    document.getElementById('incamount').value="";

    displayIncomeDetails();

}


// 8888888888888888888   Add Expense Event 88888888888888888888

function addExpense(){

    let expensetype= document.getElementById('exptype').value;
    let expenseamount = parseFloat(document.getElementById('expamount').value);

    if( !expensetype || !expenseamount){
        expensewarning.innerHTML=`Enter all Input fields`;
        return;
    }

    let userData = JSON.parse(localStorage.getItem(loggedInAccount));


 if(userData.incomeBalence>expenseamount){

          // dateandtime (Format: 24 Mar 2025, 10:15:30 PM)
            let dateTime = new Date().toLocaleString('en-IN', {  
                 day: '2-digit', month: 'short', year: 'numeric',  
                 hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true  
            });

            // update the expense balance
             userData.expenseBalence += parseFloat(expenseamount);

             // update should be done to incomebalence:
             userData.incomeBalence -=expenseamount 

              // creating object for expense

            let expenseEntry = {
                type:expensetype,
                amount:expenseamount,
                balance:userData.expenseBalence,
                date:dateTime
            }
    
            // udate the expense object to expense array
             userData.expenseArray.push(expenseEntry)

            // local storage update
            localStorage.setItem(loggedInAccount,JSON.stringify(userData));

            // message,refresh,clearinputfield,display
            alert("Expense Added successfully");

            location.reload(); // Refresh UI

            document.getElementById('inctype').value="";
            document.getElementById('incamount').value="";

             displayIncomeDetails();
    }

else{
    expensewarning.innerHTML=`Insufficient Balence!`;
    alert("Insufficient Balence!");
}


}


// ----------------------------------display details section------------------- //function is for both income and expense displaying!!

function displayIncomeDetails(){ 
    let userData = JSON.parse(localStorage.getItem(loggedInAccount)); 

    // diplay total income
    totalincomeBalance.innerHTML = `&#8377; ${parseFloat(userData.incomeBalence).toLocaleString('en-IN')}/-`;

    // display total expense
    totalexpenseBalance.innerHTML = `&#8377; ${parseFloat(userData.expenseBalence).toLocaleString('en-IN')}/-`;


    // diplay income table 
    incomeresult.innerHTML = userData.incomeArray.map(income =>`
        <tr>
            <td>${income.type}</td>
            <td>+ ${parseFloat(income.amount).toLocaleString('en-IN')}/-</td>
            <td>&#8377; ${parseFloat(income.balence).toLocaleString('en-IN')}/-</td>
            <td>${income.date}</td>
        </tr>`
    ).join("");

    // display the expense table
    expenseresult.innerHTML= userData.expenseArray.map(expense => `
        <tr>
            <td>${expense.type}</td>
            <td>- ${parseFloat(expense.amount).toLocaleString('en-IN')}/-</td>
            <td>&#8377; ${parseFloat(userData.incomeBalence).toLocaleString('en-IN')}/-</td>
            <td>${expense.date}</td>
        </tr>
   `).join("");

}

// -----------------------Display income and expense when page loads
document.addEventListener("DOMContentLoaded",displayIncomeDetails);



// -------------------------pie-chart section----------------------------- 
function showPieChart() {
    let userData = JSON.parse(localStorage.getItem(loggedInAccount));

    if (!userData) {
        alert("User data not found.");
        return;
    }

    let incomeBalance = userData.incomeBalence;
    let expenses = userData.expenseArray;

    if (expenses.length === 0) {
        alert("No expenses recorded.");
        return;
    }

    // Prepare data for the chart
    let expenseCategories = {};
    
    expenses.forEach(expense => {
        if (expenseCategories[expense.type]) {
            expenseCategories[expense.type] += expense.amount;
        } else {
            expenseCategories[expense.type] = expense.amount;
        }
    });

    let labels = Object.keys(expenseCategories);
    let data = Object.values(expenseCategories);

    // Add Remaining Balance to Chart
    labels.push("Remaining Balance");
    data.push(incomeBalance);

    // Destroy existing chart if present
    if (window.expenseChart) {
        window.expenseChart.destroy();
    }

    // Create a Pie Chart
    let ctx = document.getElementById("expensePieChart").getContext("2d");
    window.expenseChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    "#FF5733", // Bright Orange
                    "#33FF57", // Neon Green
                    "#3357FF", // Bright Blue
                    "#FF33A8", // Hot Pink
                    "#FFD700", // Bright Yellow
                    "#00FFFF", // Cyan
                    "#FF4500", // Red-Orange
                    "#8A2BE2", // Bright Purple
                    "#00FF00", // Lime Green
                    "#FF1493"  // Deep Pink
                ]
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false
        }
    });
}





// ----------------------------clear the income and expense data of the current user---------------------------------------
function clearUserData() {

    if (!loggedInAccount) {
        alert("No user is currently logged in.");
        return;
    }

    let confirmation = confirm("Are you sure you want to clear your income and expense data?");

    if (confirmation) {
        let userData = JSON.parse(localStorage.getItem(loggedInAccount));

        if (userData) {
            // Reset only financial-related fields
            userData.incomeBalence = 0;
            userData.expenseBalence = 0;
            userData.incomeArray = [];
            userData.expenseArray = [];

            // Save updated data back to localStorage
            localStorage.setItem(loggedInAccount, JSON.stringify(userData));

            alert("Your financial data has been cleared successfully.");
            location.reload(); // Refresh the page to reflect changes
        }
    }
}


// -------------------------------------Logout the user
function logoutUser() {
    let confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
        window.location.href = "index.html";
    }
}


// -------------------------------------download pdf
async function downloadPDF() {
    if (typeof html2canvas === "undefined") {
        console.error("html2canvas is not loaded properly!");
        return;
    }

    const { jsPDF } = window.jspdf;
    if (!jsPDF) {
        console.error("jsPDF is not loaded properly!");
        return;
    }

    const tableSection = document.getElementById('tableSection');
    const messageElement = document.getElementById('errorMessage'); // The <p> tag for showing the error

    // Check if income or expense tables have data
    const tables = tableSection.getElementsByTagName('table');
    let hasData = false;

    for (let table of tables) {
        if (table.rows.length > 1) { // Assuming the first row is the header
            hasData = true;
            break;
        }
    }

    if (!hasData) {
        messageElement.textContent = "No data available to download the PDF.";
        messageElement.style.color = "red"; // Styling for visibility
        return;
    } else {
        messageElement.textContent = ""; // Clear any previous message
    }

    // Capture tables as image
    const canvas = await html2canvas(tableSection, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    // Generate PDF
    let doc = new jsPDF("p", "mm", "a4");
    doc.addImage(imgData, 'PNG', 10, 10, 190, 0);
    doc.save("Income_Expense_Report.pdf");
}






