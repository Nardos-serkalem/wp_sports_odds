
	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

/**
 * All of the JavaScript for your public-facing functionality should be
 * included in this file.
 */

// Function to toggle odds visibility
function toggleOdds(event) {
    const oddsList = event.currentTarget.querySelector('.odds-list');
    if (oddsList) {
        oddsList.classList.toggle('hidden');
        event.currentTarget.querySelector('.toggle-odds-btn').innerText = oddsList.classList.contains('hidden') ? 'Show Odds' : 'Hide Odds';
    }
}


function initEventListeners() {
    const eventElements = document.querySelectorAll('.event');
    
    eventElements.forEach(eventElement => {
        const toggleButton = document.createElement('button');
        toggleButton.classList.add('toggle-odds-btn');
        toggleButton.innerText = 'Show Odds';
        toggleButton.addEventListener('click', toggleOdds);
        
        // Prepend button to event element
        eventElement.insertBefore(toggleButton, eventElement.firstChild);
    });
}

// Function to execute when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
});

// Optional: Smooth scrolling for anchor links
const scrollLinks = document.querySelectorAll('a[href^="#"]');
for (let link of scrollLinks) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

