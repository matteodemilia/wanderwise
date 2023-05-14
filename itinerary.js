import { initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, ref, push, set, orderByChild, child, onValue, update } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";



// WanderWise Firebase configuration 
const firebaseConfig = {
    apiKey: "AIzaSyBhzOapGVBOPyq2mmJb5IVLLpjK0TEE5lY",
    authDomain: "wanderwise-f21a9.firebaseapp.com",
    databaseURL: "https://wanderwise-f21a9-default-rtdb.firebaseio.com",
    projectId: "wanderwise-f21a9",
    storageBucket: "wanderwise-f21a9.appspot.com",
    messagingSenderId: "799016861840",
    appId: "1:799016861840:web:e3ca8c68d58950bf249815"
  };

// Initialize database 
const app = initializeApp(firebaseConfig);
const auth= getAuth();
const database = getDatabase(app);


// Reference itinerary database 
const itineraryRef = ref(database, "itinerary");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const userId = user.uid;
    const userItineraryRef = child( itineraryRef, userId );
    // Listen for changes to the user's "itinerary" database
    onValue(userItineraryRef, (snapshot) => {

      // get itinerary items 
      const itineraryItems = snapshot.val();

      // sort by start date
      const sortedItineraryItems = Object.values( itineraryItems).sort((a, b) => {
        return new Date(a.Startdate) - new Date(b.Startdate);
      });

      // grab itineray container 
      const itineraryListContainer = document.querySelector(".itinerary-list-container");
      itineraryListContainer.innerHTML = "";

      // go through items and add to itinerary container
      for (const itineraryItem of sortedItineraryItems) {

        // grab div and create itinerary element
        const itineraryItemElement = document.createElement("div");
        itineraryItemElement.className = "itinerary";

        // title element details 
        const titleElement = document.createElement( "h2");
        titleElement.id = "itinerary-title";
        titleElement.style.marginLeft = "10px"
        titleElement.style.color = "var(--icon-gray)";
        titleElement.textContent = itineraryItem.Title;

        // start date element details 
        const startdateElement = document.createElement( "span");
        startdateElement.id = "date-posted-forum";
        startdateElement.style.marginLeft = "10px"
        startdateElement.textContent = formatDate( itineraryItem.Startdate);

        // end date element details 
        const enddateElement = document.createElement("span");
        enddateElement.id = "date-posted-forum";
        enddateElement.textContent = " to " + formatDate(itineraryItem.Enddate); 

        // load elements
        itineraryItemElement.appendChild(titleElement);
        itineraryItemElement.appendChild(startdateElement);
        itineraryItemElement.appendChild(enddateElement);

        // post to itinerary container
        itineraryListContainer.appendChild(itineraryItemElement);
        itineraryListContainer.appendChild(document.createElement("hr"));
      }
    });
  }
});

// format date function - changes from long form to readable
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate()+1;
  return `${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
}


// grab elements for itinerary
const createItineraryButton = document.getElementById('create-itinerary-button');
const modal = document.getElementById('add-item-modal');
const modalContent = document.querySelector('.modal-content');
const closeButton = document.querySelector('.close');
const submitButton = document.getElementById('submit-itinerary');

const itineraryContainer = document.getElementById('itinerary-list');
const itineraryForm = document.querySelector('.add-item-form');

// declare itinerary array
let itineraries = [];

// create itinerary buttono
createItineraryButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

// close itinerary button 
closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

// close itinerary outside 
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// resizing the pop up
window.addEventListener('resize', () => {
  modalContent.style.top = `${(window.innerHeight - modalContent.offsetHeight) / 2}px`;
  modalContent.style.left = `${(window.innerWidth - modalContent.offsetWidth) / 2}px`;
});

// reloading 
window.addEventListener('load', () => {
  modalContent.style.top = `${(window.innerHeight - modalContent.offsetHeight) / 2}px`;
  modalContent.style.left = `${(window.innerWidth - modalContent.offsetWidth) / 2}px`;
});

// submit button
itineraryForm.addEventListener('submit', (event) => {
    event.preventDefault();

    auth.onAuthStateChanged((user) => {
      if (!user) {
          console.log("User not signed in");
          return;
      }

      // grab user id 
      const userId = user.uid;

    // Grab submitted values
    const itineraryTitle = document.querySelector("#title").value;
    const itineraryStartDate = document.querySelector("#startdate").value;
    const itineraryEndDate = document.querySelector("#enddate").value;

    //console.log(itineraryTitle, itineraryStartDate, itineraryEndDate)
    
    const newPostKey = push(ref(database, `itinerary/${userId}`)).key;


    const itinerary = { itineraryTitle, itineraryStartDate, itineraryEndDate };
    itineraries.push(itinerary);
    
   
    const postData = {
      Title: itineraryTitle,
      Startdate: itineraryStartDate,
      Enddate: itineraryEndDate
    };

    update(ref(database, `itinerary/${userId}/${newPostKey}`), postData);
   
    //console.log(itinerary.itineraryTitle, itinerary.itineraryStartDate, itinerary.itineraryEndDate);
    

    // clear form
    document.querySelector("#title").value = "";
    document.querySelector("#startdate").value = "";
    document.querySelector("#enddate").value = "";
    modal.style.display = 'none';
    updateItineraryContainer();
  });
});


// Function to update the list 
function updateItineraryContainer() {

    // Clear the itinerary list to prepare to fill it
    itineraryContainer.innerHTML = "";

    for(let i=0; i < itineraries.length; i++){
        const itinerary = itineraries[i];

        const postDiv = document.createElement("div");
        postDiv.classList.add("itinerary");

        const formattedDate1 = itinerary.itineraryStartDate.substring(5,15);
        const formattedDate2 = itinerary.itineraryEndDate.substring(5,15);

        if(i < (itineraries.length - 1)){
            postDiv.innerHTML = `<p class ="itinerary-title">${itinerary.itineraryTitle}</p><p class ="itinerary-list-dates">${formattedDate1} to ${formattedDate2}</p><hr>`;
        }
        else {
            postDiv.innerHTML = `<p class ="itinerary-title">${itinerary.itineraryTitle}</p><p class ="itinerary-list-dates">${formattedDate1} to ${formattedDate2}</p>`;
        }
        itineraryContainer.appendChild(postDiv);
    }
   
}











//    [C A L E N D A R]

// grab calendar element
const calendar = document.querySelector('.calendar');

// current date 
const currentDate = new Date();

// Displaying month and year 
const currentMonthYear = document.querySelector('.current-month');
currentMonthYear.innerHTML = currentDate.toLocaleString('default', { month: 'long' }) + ' ' + currentDate.getFullYear();

// calendr days
const daysElement = document.querySelector('.days');
let days = '';

// Get the number of days in the current month
const numOfDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

// Get the day of the week of the first day of the current month
const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

// Add empty cells for days before the first day of the month
for (let i = 0; i < firstDayOfMonth; i++) {
  days += '<span></span>';
}

// Add the days of the month
for (let i = 1; i <= numOfDays; i++) {
  // Add the "today" class to the current day
  if (i === currentDate.getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear()) {
    days += '<span class="today">' + i + '</span>';
  } else {
    days += '<span>' + i + '</span>';
  }
}

// Add empty cells for days after the last day of the month
for (let i = firstDayOfMonth + numOfDays; i < 42; i++) {
  days += '<span></span>';
}

// Add the days
daysElement.innerHTML = days;

// Add event listeners to the previous month and next month buttons
const prevMonthBtn = document.querySelector('.prev-month-btn');
const nextMonthBtn = document.querySelector('.next-month-btn');

prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

// Function to update the calendar
function updateCalendar() {
    // Display the current month and year
    currentMonthYear.innerHTML = currentDate.toLocaleString('default', { month: 'long' }) + ' ' + currentDate.getFullYear();

    // Set the calendar days
    let days = '';

    // Get the number of days in the current month
    const numOfDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    // Get the day of the week of the first day of the current month
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        days += '<span></span>';
    }

    // Add the days of the month
    for (let i = 1; i <= numOfDays; i++) {
        // Add the "today" class to the current day
        if (i === currentDate.getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear()) {
            days += '<span class="today">' + i + '</span>';
        } else {
            days += '<span>' + i + '</span>';
        }
    }

    // Add empty cells for days after the last day of the month
    for (let i = firstDayOfMonth + numOfDays; i < 42; i++) {
        days += '<span></span>';
    }

    // Add the days
    daysElement.innerHTML = days;
}
