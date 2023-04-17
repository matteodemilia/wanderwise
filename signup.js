// Get the form element and add a submit event listener
const SUform = document.querySelector('form');
SUform.addEventListener('submit', (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values of the form inputs
  const firstname = SUform.elements.firstname.value;
  const lastname = SUform.elements.lastname.value;
  const email = SUform.elements.email.value;
  const password = SUform.elements.password.value;

  // Do something with the form data
  console.log(`First Name: ${firstname}`);
  console.log(`Last Name: ${firstname}`);
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
});
