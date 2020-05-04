// There are many ways to pick a DOM node; here we get the form itself and the input
// input box, as well as the span element into which we will place the error message.
const form = document.getElementsByTagName('form')[0];

const inputs = document.querySelectorAll('input:not([type="submit"])');
const error = document.querySelector('span.error');

inputs.forEach((input) => {
	input.addEventListener('input', function(event) {
		// Each time the user types something, we check if the
		// form fields are valid.

		if (input.validity.valid) {
			// In case there is an error message visible, if the field
			// is valid, we remove the error message.
			error.innerHTML = ''; // Reset the content of the message
			error.className = 'error'; // Reset the visual state of the message
		} else {
			// If there is still an error, show the correct error
			showError();
		}
	});

	form.addEventListener('submit', function(event) {
		// if the input field is valid, we let the form submit

		if (!input.validity.valid) {
			// If it isn't, we display an appropriate error message
			showError();
			// Then we prevent the form from being sent by canceling the event
			event.preventDefault();
		}
	});

	function showError() {
		if (input.validity.valueMissing) {
			// If the field is empty
			// display the following error message.
			error.textContent = `${input.placeholder} cannot to empty.`;
		} else if (input.validity.typeMismatch) {
			// If the field doesn't contain an input address
			// display the following error message.
			error.textContent = `Looks like this is not an ${input.placeholder}.`;
		} else if (input.validity.tooShort) {
			// If the data is too short
			// display the following error message.
			error.textContent = `${input.placeholder} should be at least ${input.placeholder
				.minLength} characters; you entered ${input.value.length}.`;
		}

		// Set the styling appropriately
		error.className = 'error active';
	}
});
