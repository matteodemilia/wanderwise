import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, ref, child, get, onValue } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

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

        // grab forum data 
        const forumRef = ref(database, "forum");
        const userForumRef = child(forumRef, userId);

        // grab itinerary data 
        const itineraryRef = ref(database, "itinerary");
        const userItineraryRef = child(itineraryRef, userId);

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

        // ITINERARY COLUMN
        onValue(userItineraryRef, (snapshot) => {
            // Get all itinerary items from the snapshot
            const itineraryItems = snapshot.val();
      
            // Sort itinerary items by start date
            const sortedItineraryItems = Object.values(itineraryItems).sort((a, b) => {
              return new Date(a.Startdate) - new Date(b.Startdate);
            });
      
            // Clear the existing itinerary list container
            const itineraryListContainer = document.querySelector(".itinerary-list-container");
            itineraryListContainer.innerHTML = "";
      
            // Loop through each itinerary item and add it to the itinerary list container
            for (const itineraryItem of sortedItineraryItems) {
              // Create an itinerary item element
              const itineraryItemElement = document.createElement("div");
              itineraryItemElement.className = "itinerary";
      
              // Add the itinerary item details to the element
              const titleElement = document.createElement("h2");
              titleElement.id = "itinerary-title";
              titleElement.style.marginLeft = "10px"
              titleElement.textContent = itineraryItem.Title;
              const startdateElement = document.createElement("span");
              startdateElement.id = "itinerary-list-dates";
              startdateElement.style.marginLeft = "10px"
              startdateElement.textContent = formatDate(itineraryItem.Startdate);
              const enddateElement = document.createElement("span");
              enddateElement.id = "itinerary-list-dates";
              enddateElement.textContent = " to " + formatDate(itineraryItem.Enddate); // Add "to" between start and end date
              itineraryItemElement.appendChild(titleElement);
              itineraryItemElement.appendChild(startdateElement);
              itineraryItemElement.appendChild(enddateElement);
      
              // Add the itinerary item element to the itinerary list container
              itineraryListContainer.appendChild(itineraryItemElement);
              itineraryListContainer.appendChild(document.createElement("hr"));
            }
        });

        // FORUM COLUMN
        onValue(userForumRef, (snapshot) => {
            // Grab all forum items from the snapshot
            const forumItems = snapshot.val();

        });
        
    }
    
});

// format date function used for the itinerary + Forum posts 
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate()+1;
    return `${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
  }
  

