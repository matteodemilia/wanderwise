document.addEventListener("DOMContentLoaded", function() {
  if(localStorage.getItem("isLoggedIn") === "true"){
    var profileLink = document.createElement("a");
    profileLink.textContent = "Profile";
    profileLink.href = "profile.html";

    var logoutLink = document.createElement("a");
    logoutLink.textContent = "Logout";

    var loginDropdown = document.getElementById("login-drop");
    var signupDropdown = document.getElementById("signup-drop");
    loginDropdown.textContent="";
    signupDropdown.textContent="";
    loginDropdown.appendChild(profileLink);
    signupDropdown.appendChild(logoutLink);

      //when user clicks logout button
    logoutLink.addEventListener("click", function() {
      localStorage.removeItem("isLoggedIn");
      window.location.replace("\login.html");
});

  }
  else{
      var loginDropdown = document.getElementById("login-drop");
      var signupDropdown = document.getElementById("signup-drop");
      loginDropdown.innerHTML = '<a href="login.html">Login</a>';
      signupDropdown.innerHTML = '<a href="signup.html">Sign up</a>';
  } 
});

