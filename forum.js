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
        postDiv.innerHTML = `<p><strong>${post.location}</strong></p><p>${post.description}</p>`;
        postContainer.appendChild(postDiv);
    }
}

