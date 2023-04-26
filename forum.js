import { initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, ref, set, orderByChild, child, onValue } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";




const firebaseConfig = {
    apiKey: "AIzaSyBhzOapGVBOPyq2mmJb5IVLLpjK0TEE5lY",
    authDomain: "wanderwise-f21a9.firebaseapp.com",
    databaseURL: "https://wanderwise-f21a9-default-rtdb.firebaseio.com",
    projectId: "wanderwise-f21a9",
    storageBucket: "wanderwise-f21a9.appspot.com",
    messagingSenderId: "799016861840",
    appId: "1:799016861840:web:e3ca8c68d58950bf249815"
  };

  //firebase.initializeApp(firebaseConfig);


  const app = initializeApp(firebaseConfig);
  const auth= getAuth();
  const database = getDatabase(app);
  
  /*
  var firebaseRef = ref(database, 'forum/userId');

  onValue(firebaseRef , (snapshot)=>{
      snapshot.forEach(function(childSnapshot){
          const key = childSnapshot.key; // get the key of the child element
          const value = childSnapshot.val(); // get the value of the child element
          
          // do something with the key and value
          console.log(key, value);
          
          // example of using the key and value to update the DOM
          const postDiv = document.createElement('div');
          const postTitle = document.createElement('h4');
          const postContent = document.createElement('div');
          postTitle.innerText = key;
          postContent.innerText = value;
          postDiv.appendChild(postTitle);
          postDiv.appendChild(postContent);
          document.querySelector('#postContainer').appendChild(postDiv);
      });
  });
  */

  // Reference to the "forum" database
const forumRef = ref(database, "forum")

// Listen for changes to the "forum" database
onValue(forumRef, (snapshot) => {
  // Get all posts from the snapshot
  const posts = snapshot.val();

  // Clear the existing post container
  const postContainer = document.querySelector("#postContainer");
  postContainer.innerHTML = "";

  // Loop through each post and add it to the post container
  for (const postId in posts) {
    if (Object.hasOwnProperty.call(posts, postId)) {
      const post = posts[postId];
      
      // Create a post element
      const postElement = document.createElement("div");
      postElement.className = "post";

      // Add title and description to the post element
      const titleElement = document.createElement("h3");
      titleElement.textContent = post.Title;
      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = post.Description;
      postElement.appendChild(titleElement);
      postElement.appendChild(descriptionElement);

      // Add the post element to the post container
      postContainer.appendChild(postElement);
    }
  }
});

   
  
/*
  const starCountRef = ref(database, 'forum');
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    updateStarCount(postElement, data);
  });
  
   
    });
/*working
var firebaseRef = ref(database, "forum");
onValue(firebaseRef , (snapshot)=>{
    //const data = snapshot.val();
    snapshot.forEach(function(element){
      document.querySelector('#previous-post').innerHTML +=
        `<div>${element.val()}</div>`
        
    });
*/

/*
var firebaseRef = ref(database, "forum");
onValue(firebaseRef , (snapshot)=>{
    //const data = snapshot.val();
    snapshot.forEach(function(element){
      document.querySelector('#postContainer').innerHTML +=
        `<h3>
        <div></div>
        ${element.val()}</h3>`
        
    });
})
*/

/*
var firebaseRef = ref(database, 'forum/userid');
onValue(firebaseRef , (snapshot)=>{
    snapshot.forEach(function(childSnapshot){
        const key = childSnapshot.key; // get the key of the child element
        const value = childSnapshot.val(); // get the value of the child element
        
        // do something with the key and value
        console.log(key, value);
        
        // example of using the key and value to update the DOM
        const postDiv = document.createElement('div');
        const postTitle = document.createElement('h4');
        const postContent = document.createElement('div');
        postTitle.innerText = key;
        postContent.innerText = value;
        postDiv.appendChild(postTitle);
        postDiv.appendChild(postContent);
        document.querySelector('#postContainer').appendChild(postDiv);
    });
});
*/




/*const createPostButton = document.getElementById("createPostBtn");
const postContainer = document.getElementById("postContainer");
// Array of forum posts
let posts = [];
// "Create New Post" Button - 
createPostButton.addEventListener("click", () => {
    const location = prompt("Enter your location (city, country):");
    const description = prompt("Enter your post description:");
    // create "creeate new post" form elements
    var createForumForm = document.createElement("createForumForm");
    var titleForumForm = document.createElement("titleForumForm");
    var regionForumForm = document.createElement("regionForumForm");
    var countryForumForm = document.createElement("countryForumForm");
    var descForumForm = document.createElement("descForumForm");
    var dateForumForm = document.createElement("dateForumForm");
    var postToForumForm = document.createElement("postToForumForm");
    // set attributes for form elements
    titleForumForm.setAttribute("type", "text");
    regionForumForm.setAttribute("type", "text");
    countryForumForm.setAttribute("type", "text");
    descForumForm.setAttribute("type", "text");
    dateForumForm.setAttribute("type", "date");
    postToForumForm.innerHTML = "Post to Forum";
    // append form elements to form
    createForumForm.appendChild(titleForumForm);
    createForumForm.appendChild(regionForumForm);
    createForumForm.appendChild(countryForumForm);
    createForumForm.appendChild(descForumForm);
    createForumForm.appendChild(dateForumForm);
    // append forum-container
    document.forum-container.appendChild(createForumForm);
    
    const post = { titleForumForm, regionForumForm, countryForumForm, descForumForm, dateForumForm, timestamp: Date.now() };
    posts.push(post);
    updatePostContainer();
});
function updatePostContainer() {
    // Clear the current contents of the postContainer
    postContainer.innerHTML = "";
    // Sort the posts array by timestamp in descending order
    posts.sort((a, b) => b.timestamp - a.timestamp);
    // Create a new div for each post and append it to the postContainer
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");
        postDiv.innerHTML = `<p><strong>${post.titleForumForm}</strong></p><p>${post.regionForumForm}</p>`;
        postContainer.appendChild(postDiv);
    }
}
*/


const createPostBtn = document.getElementById("createPostBtn");
const postContainer = document.getElementById("postContainer");
//const prevContainer = document.getElementById("previous-post");

let posts = [];

const modal = document.getElementById('add-item-modal');
const modalContent = document.querySelector('.modal-content');
const closeButton = document.querySelector('.close');
const submitButton = document.getElementById('submit-post');

//const itineraryContainer = document.getElementById('itinerary-list');
const createPostForm = document.querySelector('.add-item-form');


// Opens the "create-itinerary" window when button is pressed 
createPostBtn.addEventListener('click', () => {
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

/*
createPostBtn.addEventListener("click", () => {
    const location = prompt("Enter your location (city, country):");
    const description = prompt("Enter your post description:");
    const post = { location, description, timestamp: Date.now() };
    posts.push(post);
    updatePostContainer();
    
    set(ref(database, 'forum/'), {
        location: location,
        post: description
      });
}); */

//post to forum
//post to forum
createPostForm.addEventListener("submit", (event) => {
  // Prevent default submission event
  event.preventDefault();

  // Check if user is signed in
  auth.onAuthStateChanged((user) => {
      if (!user) {
          console.log("User not signed in");
          return;
      }

      const userId = user.uid;

      // Extract values from the form
      const postTitle = document.querySelector("#title").value;
      const postDescription = document.querySelector("#description").value;

      // Create item, and Push item to array
      const post = {postTitle, postDescription, timestamp: Date.now()};
      posts.push(post);

      set(ref(database, 'forum/' + userId), {
          Date: Date(post.timestamp),
          Title: postTitle,
          Description: postDescription
      });

      // clear form
      document.querySelector("#title").value = "";
      document.querySelector("#description").value = "";

      modal.style.display = 'none';

      // Call update post list function 
  });
});


/*
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
} */
