// Get the form element and add a submit event listener
const LIform = document.querySelector('form');
LIform.addEventListener('submit', (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values of the form inputs
  const email = LIform.elements.email.value;
  const password = LIform.elements.password.value;

  // Do something with the form data
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
});
