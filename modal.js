function editNav() {
	let x = document.getElementById('myTopnav')
	if (x.className === 'topnav') {
		x.className += ' responsive'
	} else {
		x.className = 'topnav'
	}
}

// DOM Elements
const modalbg = document.querySelector('.bground')
const modalBtn = document.querySelectorAll('.modal-btn')
const modalBody = document.querySelector('.modal-body')
const formContent = modalBody.innerHTML
const close = document.querySelector('.close')
const formData = document.querySelectorAll('.formData')
const inputs = {}
const errors = {}
document.querySelectorAll('form .formData input').forEach((input) => (inputs[input.id] = input))

// Create error DOM Elements
formData.forEach((form) => {
	const errorElement = document.createElement('p')
	const input = Object.values(form.children).find((el) => el.name)
	errors[input.name] = errorElement
	errorElement.classList.add(input.name + '-error')
	errorElement.style.color = 'red'
	errorElement.style.fontSize = '1rem'
	form.append(errorElement)
})

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal))

// Launch modal function
function launchModal() {
	modalbg.style.display = 'block'
}

// Close modal form
close.addEventListener('click', closeModal)

function closeModal() {
	modalbg.style.display = 'none'
	modalBody.innerHTML = formContent
}

// Regex for name validation
const nameRegex = /^[A-zÀ-ú' -]*$/
// Regex for mail validation
const regexMail = /^[A-z0-9-.]{1,}[@][A-z-]{2,}[.][A-z]{2,}$/g

// Function to validate inputs
const validate = (event) => {
	event.preventDefault()
	let error = false

	if (!inputs['first'].value || inputs['first'].value.length < 2 || !inputs['first'].value.match(nameRegex)) {
		errors['first'].textContent = 'Veuillez entrer un prénom valide sur 2 caractères minimum'
		error = true
	} else {
		errors['first'].textContent = ''
	}

	if (!inputs['last'].value || inputs['last'].value.length < 2 || !inputs['last'].value.match(nameRegex)) {
		errors['last'].textContent = 'Veuillez entrer un nom valide sur 2 caractères minimum'
		error = true
	} else {
		errors['last'].textContent = ''
	}

	if (!inputs['email'].value || !inputs['email'].value.match(regexMail)) {
		errors['email'].textContent = 'Veuillez entrer un email valide'
		error = true
	} else {
		errors['email'].textContent = ''
	}

	if (!inputs['birthdate'].value) {
		errors['birthdate'].textContent = 'Veuillez entrer une date de naissance'
		error = true
	} else {
		errors['birthdate'].textContent = ''
	}

	if (inputs['birthdate'].value) {
		const [year, month, day] = inputs['birthdate'].value.split('-')
		const now = new Date()
		if (+year > now.getFullYear() || (+year === now.getFullYear() && +month > now.getMonth() + 1) || (+year === now.getFullYear() && +month === now.getMonth() + 1 && +day > now.getDate())) {
			errors['birthdate'].textContent = 'Veuillez entrer une date de naissance valide'
			error = true
		} else {
			errors['birthdate'].textContent = ''
		}
	}

	if (inputs['quantity'].value === '' || isNaN(+inputs['quantity'].value)) {
		errors['quantity'].textContent = 'Veuillez entrer un nombre'
		error = true
	} else {
		errors['quantity'].textContent = ''
	}

	if (!Object.values(inputs).find((input) => input.name === 'location' && input.checked)) {
		errors['location'].textContent = 'Veuillez sélectionner une localisation'
		error = true
	} else {
		errors['location'].textContent = ''
	}

	if (!inputs['checkbox1'].checked) {
		errors['checkbox'].textContent = 'Veuillez accepter les CGU'
		error = true
	} else {
		errors['checkbox'].textContent = ''
	}

	if (error) return

	// Clear form and display confirmation message
	modalBody.innerHTML = ''
	const conf = document.createElement('p')
	conf.textContent = 'Merci pour votre réservation !'
	conf.style.textAlign = 'center'
	modalBody.append(conf)

	const closeBtn = document.createElement('button')
	closeBtn.textContent = 'Fermer'
	closeBtn.classList.add('btn-submit')
	modalBody.append(closeBtn)
	closeBtn.addEventListener('click', closeModal)
}
