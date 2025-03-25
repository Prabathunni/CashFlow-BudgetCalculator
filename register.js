// storing the register to localstorage

function registerButton(){
  let name = document.getElementById('name').value;
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  let registerBook = {
    name:name,
    username:username,
    password:password,
    incomeBalence:0,
    expenseBalence:0,
    incomeArray:[],
    expenseArray:[],
  }

  if(name && username && password){
    if(registerBook.username in localStorage){
      nullresult.innerHTML=`
      Username Already Exists
      `
    }
    else{
      localStorage.setItem(registerBook.username,JSON.stringify(registerBook));
      alert("Account Registered Successfully");
      window.location.href="index.html";
    }
  
  }
  else{
    nullresult.innerHTML=`
    Provide Complete Input`
  }

}



function loginButton(){
  window.location.href="index.html";
}