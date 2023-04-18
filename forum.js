//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
//import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";


/*
const firebaseConfig = {
    apiKey: "AIzaSyBhzOapGVBOPyq2mmJb5IVLLpjK0TEE5lY",
    authDomain: "wanderwise-f21a9.firebaseapp.com",
    databaseURL: "https://wanderwise-f21a9-default-rtdb.firebaseio.com",
    projectId: "wanderwise-f21a9",
    storageBucket: "wanderwise-f21a9.appspot.com",
    messagingSenderId: "799016861840",
    appId: "1:799016861840:web:e3ca8c68d58950bf249815"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
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

createPostForm.addEventListener("submit", (event) => {
    // Prevent default submission event
    event.preventDefault();
    
    // Extract values from the form
    const postTitle = document.querySelector("#title").value;
    const postDescription = document.querySelector("#description").value;

    // Create item, and Push item to array
    const post = {postTitle, postDescription, timestamp: Date.now()};
    posts.push(post);

    // clear form
    document.querySelector("#title").value = "";
    document.querySelector("#description").value = "";
        
    modal.style.display = 'none';

    // Call update post list function 
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
        
        const currentDate = Date(post.timestamp);
        const formattedDate = currentDate.toString().substring(0,15);

        if (i != (posts.length-1)){
            postDiv.innerHTML = `<div class="post-header"><p class ="post-title">${post.postTitle}</p><p class ="post-timestamp">${formattedDate}</p></div><p>${post.postDescription}</p><hr>`;
        }
        else{
            postDiv.innerHTML = `<div class="post-header"><p class ="post-title">${post.postTitle}</p><p class ="post-timestamp">${formattedDate}</p></div><p>${post.postDescription}</p>`;
        }
        postContainer.appendChild(postDiv);
    }
}
