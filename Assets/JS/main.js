const email = document.querySelector('#email');
email.addEventListener('input', function(event) {
	if (email.validity.typeMismatch) {
		email.setCustomValidity('I am expecting an e-mail address!');
	} else {
		email.setCustomValidity('');
	}
});
