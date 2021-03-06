// There are many ways to pick a DOM node; here we get the form itself and the input
// input box, as well as the span element into which we will place the error message.
const form = document.getElementsByTagName('form')[0];
const inputs = document.querySelectorAll('input:not([type="submit"])');
arrayInputs = Array.from(inputs).reverse();
// const error = document.querySelector('span.error');
const errorMssg = document.createElement('span');
const hoverSpan = document.createElement('span');
console.log(errorMssg);

arrayInputs.forEach((input) => {
	console.log(input.name);
	input.addEventListener('input', function(event) {
		if (input.validity.valid) {
			errorMssg.innerHTML = '';
			errorMssg.className = 'error';
		} else {
			showError();
		}
	});

	input.addEventListener('mouseover', (e) => {
		input.before(hoverSpan);
		hoverSpan.classList.add('hoverSpan');
		hoverSpan.textContent = input.placeholder;
	});

	input.addEventListener('mouseout', (e) => {
		document.querySelector('.hoverSpan').remove();
	});

	form.addEventListener('submit', function(event) {
		if (!input.validity.valid) {
			showError();
			event.preventDefault();
		}
	});

	function showError() {
		input.after(errorMssg);
		if (input.validity.valueMissing) {
			errorMssg.textContent = `${input.placeholder} cannot to empty.`;
		} else if (input.validity.typeMismatch) {
			errorMssg.textContent = `Looks like this is not an ${input.placeholder}.`;
		} else if (input.validity.tooShort) {
			errorMssg.textContent = `${input.placeholder} should be at least ${input.minLength} characters; you entered ${input
				.value.length}.`;
		}
		errorMssg.className = 'error active';
	}
});
