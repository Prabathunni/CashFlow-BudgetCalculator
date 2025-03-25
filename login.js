// 

function loginButton(){
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;


  if(username && password){

    // fetch the registerBook object from localStorage
    let registerLog = JSON.parse(localStorage.getItem(username));

    if(registerLog){
      if(registerLog.password === password){
        alert("Login Successfull");
        // add login user to local storage to greet the user
        localStorage.setItem("LoggedInUser",username);
        window.location.href="dashboard.html"
      }
      else{
        blankresult.innerHTML=`
        Wrong Password`
      }
    }
    else{
      blankresult.innerHTML=`
      Invalid Username!`
    }
  }
  else{
    blankresult.innerHTML=`
    Provide Complete Input!`
  }
}