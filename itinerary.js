const createItineraryButton = document.getElementById('create-itinerary-button');
const modal = document.getElementById('add-item-modal');
const modalContent = document.querySelector('.modal-content');
const closeButton = document.querySelector('.close');
const submitButton = document.getElementById('submit-itinerary');

const itineraryContainer = document.getElementById('itinerary-list');
const itineraryForm = document.querySelector('.add-item-form');

let itineraries = [];

// Opens the "create-itinerary" window when button is pressed 
createItineraryButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Closes the "create-itinerary" window when close button is pressed 
closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Closes the "create-itinerary" window when user clicks outside pop-up
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Resizes the pop-up if resizing occurs 
window.addEventListener('resize', () => {
  modalContent.style.top = `${(window.innerHeight - modalContent.offsetHeight) / 2}px`;
  modalContent.style.left = `${(window.innerWidth - modalContent.offsetWidth) / 2}px`;
});

// reloading maybe? unsure 
window.addEventListener('load', () => {
  modalContent.style.top = `${(window.innerHeight - modalContent.offsetHeight) / 2}px`;
  modalContent.style.left = `${(window.innerWidth - modalContent.offsetWidth) / 2}px`;
});

itineraryForm.addEventListener('submit', (event) => {
    // Prevent default submission event
    event.preventDefault();

    // Grab submitted values of the modal 
    const itineraryTitle = document.querySelector("#title").value;
    const itineraryStartDate = document.querySelector("#startdate").value;
    const itineraryEndDate = document.querySelector("#enddate").value;

    //console.log(itineraryTitle, itineraryStartDate, itineraryEndDate)
    
    const itinerary = { itineraryTitle, itineraryStartDate, itineraryEndDate };
    itineraries.push(itinerary);
    
    //console.log(itinerary.itineraryTitle, itinerary.itineraryStartDate, itinerary.itineraryEndDate);
    

    // clear form
    document.querySelector("#title").value = "";
    document.querySelector("#startdate").value = "";
    document.querySelector("#enddate").value = "";
    modal.style.display = 'none';
    updateItineraryContainer();
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

// Get the calendar element
const calendar = document.querySelector('.calendar');

// Get the current date
const currentDate = new Date();

// Display the current month and year
const currentMonthYear = document.querySelector('.current-month');
currentMonthYear.innerHTML = currentDate.toLocaleString('default', { month: 'long' }) + ' ' + currentDate.getFullYear();

// Set the calendar days
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