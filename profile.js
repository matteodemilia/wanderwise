import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const auth= getAuth();
const database = getDatabase(app);


//trying to display {user}'s Profile
const user = auth.currentUser;

onAuthStateChanged(auth,(user)=>{
    if(user){
        const userId = user.uid;
        const userRef = child(ref(database), 'users/' + userId);
        //displays user's "username" and their personal info on their profile
        get(userRef).then((snapshot) => {
            if(snapshot.exists()){
                const userData = snapshot.val();
                const firstName = userData.FirstName;
                const lastName = userData.LastName;
                const email = userData.Email;

                // display user information (private info)
                document.getElementById("username").textContent = firstName + "'s Profile:";
                document.getElementById("profile-first-name-box").textContent = firstName;
                document.getElementById("profile-last-name-box").textContent = lastName;
                document.getElementById("profile-email-box").textContent = email;
            }
            else{
                console.log("No data available");
            }
        }).catch((error)=>{
            console.error(error);
        });
        
    }
    
});




