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

  //firebase.initializeApp(firebaseConfig);

// Initialize database 
  const app = initializeApp(firebaseConfig);
  const auth= getAuth();
  const database = getDatabase(app);
  
  // Reference to the "forum" database
  const forumRef = ref(database, "forum");

  // Listen for changes to the "forum" database
  onValue(forumRef, (snapshot) => {
    // Get all posts from the snapshot
    const posts = snapshot.val();
  
    // Combine all posts into a single array
    const allPosts = [];
    for (const userId in posts) {
      if (Object.hasOwnProperty.call(posts, userId)) {
        const userPosts = posts[userId];
        for (const postId in userPosts) {
          if (Object.hasOwnProperty.call(userPosts, postId)) {
            const post = userPosts[postId];
            allPosts.push(post);
          }
        }
      }
    }
  
    // Sort the posts by timestamp in descending order
    allPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
    // Clear the existing post container
    const postContainer = document.querySelector("#postContainer");
    postContainer.innerHTML = "";
  
    // Loop through each post and add it to the post container
    for (const post of allPosts) {
      // Create a post element
      const postElement = document.createElement("div");
      postElement.className = "post";
  
      // Add date, title, and description to the post element
      const dateElement = document.createElement("span");
      dateElement.id = "date-posted-forum";
      dateElement.textContent = new Date(post.timestamp).toLocaleString();
      const titleElement = document.createElement("h2");
      titleElement.style.marginLeft = "10px";
      titleElement.textContent = post.postTitle;
      const descriptionElement = document.createElement("p");
      descriptionElement.style.marginLeft = "10px";
      descriptionElement.textContent = post.postDescription;
      dateElement.style.float = "right";
      postElement.appendChild(dateElement);
      postElement.appendChild(titleElement);
      postElement.appendChild(descriptionElement);
  
      // Add the post element to the post container
      postContainer.appendChild(postElement);
      postContainer.appendChild(document.createElement("hr"));
    }
  });

const createPostBtn = document.getElementById("createPostBtn");
const postContainer = document.getElementById("postContainer");
// const prevContainer = document.getElementById("previous-post");

let posts = [];

const modal = document.getElementById('add-item-modal');
const modalContent = document.querySelector('.modal-content');
const closeButton = document.querySelector('.close');
const submitButton = document.getElementById('submit-post');

//c onst itineraryContainer = document.getElementById('itinerary-list');
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
      const now = new Date();
      // Extract values from the form
      const postTitle = document.querySelector("#title").value;
      const postDescription = document.querySelector("#description").value;
      const formattedDate = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.toLocaleTimeString()}`;
      
      // Generate a new unique ID for the post
      const newPostKey = push(ref(database, `forum/${userId}`)).key;
      
      const post = {newPostKey,postTitle, postDescription, timestamp: formattedDate};
      posts.push(post);

      // Create item and push it to the database
      const postData = {
        postTitle: postTitle,
        postDescription: postDescription,
        timestamp: formattedDate
      };

      update(ref(database, `forum/${userId}/${newPostKey}`), postData);

      // clear form
      document.querySelector("#title").value = "";
      document.querySelector("#description").value = "";

      modal.style.display = 'none';

  });
});
