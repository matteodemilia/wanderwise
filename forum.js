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

createPostBtn.addEventListener("click", () => {
    const location = prompt("Enter your location (city, country):");
    const description = prompt("Enter your post description:");
    const post = { location, description, timestamp: Date.now() };
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
        
        const currentDate = Date(post.timestamp);
        const formattedDate = currentDate.toString().substring(0,15);

        if (i != (posts.length-1)){
            postDiv.innerHTML = `<div class="post-header"><p class ="post-title">${post.location}</p><p class ="post-timestamp">${formattedDate}</p></div><p>${post.description}</p><hr>`;
        }
        else{
            postDiv.innerHTML = `<div class="post-header"><p class ="post-title">${post.location}</p><p class ="post-timestamp">${formattedDate}</p></div><p>${post.description}</p>`;
        }
        postContainer.appendChild(postDiv);
    }
}

