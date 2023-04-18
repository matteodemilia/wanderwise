import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhzOapGVBOPyq2mmJb5IVLLpjK0TEE5lY",
  authDomain: "wanderwise-f21a9.firebaseapp.com",
  databaseURL: "https://wanderwise-f21a9-default-rtdb.firebaseio.com",
  projectId: "wanderwise-f21a9",
  storageBucket: "wanderwise-f21a9.appspot.com",
  messagingSenderId: "799016861840",
  appId: "1:799016861840:web:1403232429bfe801249815"
};

//Initialize Database
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);



//Logging in
const login = document.getElementById("login-button");
if (login) {
  login.addEventListener("click", function() {
    const loginEmail = document.getElementById("login-email").value;
    const loginPassword = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        document.getElementById("result-box").style.display = "inline";
        document.getElementById("login-div").style.display = "none";
        document.getElementById("result").innerHTML =
          "Welcome Back!<br>" + loginEmail + " was Login Successfully";
        //stores log in status if user login successful
        localStorage.setItem("isLoggedIn", "true");

        //update user login details in RT DB
        const date = new Date()
        update(ref(database, 'users/'+ user.uid),{
          last_login: date,
        
        })

        setTimeout(() => {
          //on success, redirect back to home page
          window.location.replace("\index.html");
        }, 3000);

      })
      //error logging in
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        document.getElementById("result-box").style.display = "inline";
        document.getElementById("login-div").style.display = "none";
        document.getElementById("result").innerHTML =
          "Sorry ! <br>" + errorMessage;

        setTimeout(() => {
          //displays error then sends user back to login
          document.getElementById("result-box").style.display = "none";
          document.getElementById("login-div").style.display = "inline";
        }, 3000);

      });

      
  });
  
}

//Registering
const register = document.getElementById("register-button");
register.addEventListener("click", function(){
  const regEmail = document.getElementById("register-email").value;
  const regPassword = document.getElementById("register-password").value;
  const regFirst = document.getElementById("register-first").value;
  const regLast = document.getElementById("register-last").value;

  createUserWithEmailAndPassword(auth, regEmail, regPassword, regFirst, regLast).then((userCredential)=>{
    const user=userCredential.user;
    document.getElementById("result-box").style.display="inline";
    document.getElementById("reg-div").style.display="none";
    document.getElementById("result").innerHTML="Welcome!<br>"+regEmail+", your account has been created";

    //save signup details in RT DB
    set(ref(database, 'users/'+ user.uid),{
      FirstName: regFirst,
      LastName: regLast,
      Email: regEmail

    })

    setTimeout(()=>{ //on success, redirect back to login page
      window.location.replace("\login.html")
    }, 3000)

  })

  .catch((error)=> {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(errorMessage);
  });

});


