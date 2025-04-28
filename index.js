document.addEventListener('DOMContentLoaded', function () {
    // Form and RSVP functionality
    const form = document.getElementById('rsvp-form');
    const rsvpList = document.getElementById('rsvp-list');
    const modal = document.getElementById('thank-you-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalName = document.getElementById('modal-name');
    const modalState = document.getElementById('modal-state');
    const animatedImage = document.getElementById('animated-image');
    let modalTimeout;

    // Theme toggle
    const themeButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Initialize theme from localStorage
    // Initialize theme from localStorage (default to light if not set)
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
} else {
    body.classList.remove('dark'); // Ensure light mode
    localStorage.setItem('theme', 'light'); // Set default to light
}
    // Add reduce motion button
    const navbar = document.querySelector('.navbar');
    const reduceMotionBtn = document.createElement('button');
    reduceMotionBtn.id = 'reduce-motion';
    reduceMotionBtn.textContent = 'Reduce Motion';
    navbar.appendChild(reduceMotionBtn);

    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const stateInput = document.getElementById('homestate');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const state = stateInput.value.trim();

        // Reset styles
        const resetStyle = (input) => {
            input.style.borderColor = '';
            input.style.backgroundColor = '';
        };

        nameInput.addEventListener('input', () => resetStyle(nameInput));
        emailInput.addEventListener('input', () => resetStyle(emailInput));

        nameInput.style.borderColor = '';
        emailInput.style.borderColor = '';

        let isValid = true;

        if (name.length < 2) {
            nameInput.style.borderColor = 'red';
            nameInput.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            isValid = false;
        }

        if (!email.includes('@') || !email.includes('.')) {
            emailInput.style.borderColor = 'red';
            emailInput.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            isValid = false;
        }

        if (isValid) {
            const listItem = document.createElement('li');
            listItem.textContent = `${name} from ${state} will be joining us :)`;
            rsvpList.appendChild(listItem);

            // Show thank you modal
            showThankYouModal(name, state);

            nameInput.value = '';
            emailInput.value = '';
            stateInput.value = '';
        }
    });

    function showThankYouModal(name, state) {
        modalName.textContent = name;
        modalState.textContent = state;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open

        // Clear any existing timeout
        if (modalTimeout) clearTimeout(modalTimeout);

        // Set timeout to hide modal after 5 seconds
        modalTimeout = setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 5000);
    }

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        if (modalTimeout) clearTimeout(modalTimeout);
    });

    // Close modal when clicking outside content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            if (modalTimeout) clearTimeout(modalTimeout);
        }
    });

    // Reduce motion toggle
    reduceMotionBtn.addEventListener('click', () => {
        document.body.classList.toggle('no-animation');
        reduceMotionBtn.textContent = document.body.classList.contains('no-animation') 
            ? 'Enable Motion' 
            : 'Reduce Motion';
    });

    // Theme toggle
    themeButton.addEventListener('click', () => {
        body.classList.toggle('dark');
        if (body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
});