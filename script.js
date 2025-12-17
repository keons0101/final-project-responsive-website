/**
 * Header Navigation Functionality
 * Handles hamburger menu and dropdown interactions
 */

// DOM Elements
const hamburgerBtn = document.getElementById('hamburgerBtn');
const hamburgerMenu = document.getElementById('hamburgerMenu');
const body = document.body;

/**
 * Calculate header height and adjust menu position
 */
function updateMenuPosition() {
    if (hamburgerMenu) {
        const header = document.querySelector('.header');
        if (header) {
            const headerHeight = header.offsetHeight;
            hamburgerMenu.style.paddingTop = headerHeight + 'px';
        }
    }
}

/**
 * Toggle icon between menu and close states
 */
function toggleHamburgerIcon(isActive) {
    const hamburgerIcon = hamburgerBtn.querySelector('img');
    if (hamburgerIcon) {
        if (isActive) {
            // If you have a close icon, use: './assets/icons/close.svg'
            hamburgerIcon.src = './assets/icons/menu.svg';
            hamburgerIcon.alt = 'Close menu';
        } else {
            hamburgerIcon.src = './assets/icons/menu.svg';
            hamburgerIcon.alt = 'Menu';
        }
    }
}

/**
 * Close hamburger menu and reset states
 */
function closeHamburgerMenu() {
    if (hamburgerMenu) {
        hamburgerMenu.classList.remove('active');
        body.style.overflow = '';
        toggleHamburgerIcon(false);
    }
}

// Initialize hamburger menu functionality
if (hamburgerBtn && hamburgerMenu) {
    // Set initial menu position
    updateMenuPosition();
    
    // Update on window resize
    window.addEventListener('resize', updateMenuPosition);
    
    // Toggle hamburger menu on button click
    hamburgerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        updateMenuPosition();
        
        const isActive = hamburgerMenu.classList.toggle('active');
        body.style.overflow = isActive ? 'hidden' : '';
        toggleHamburgerIcon(isActive);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (hamburgerMenu.classList.contains('active') && 
            !hamburgerMenu.contains(e.target) && 
            !hamburgerBtn.contains(e.target)) {
            closeHamburgerMenu();
        }
    });

    // Close menu on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hamburgerMenu.classList.contains('active')) {
            closeHamburgerMenu();
        }
    });

    // Close menu when clicking on links inside
    const menuLinks = hamburgerMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeHamburgerMenu);
    });
}

/**
 * Hamburger menu dropdown functionality
 */
const hamburgerDropdownBtns = document.querySelectorAll('.hamburger-dropdown-btn');

hamburgerDropdownBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const dropdown = this.parentElement;
        const wasActive = dropdown.classList.contains('active');
        
        // Close all other dropdowns
        hamburgerDropdownBtns.forEach(otherBtn => {
            if (otherBtn !== this) {
                otherBtn.parentElement.classList.remove('active');
            }
        });
        
        // Toggle current dropdown
        if (!wasActive) {
            dropdown.classList.add('active');
        } else {
            dropdown.classList.remove('active');
        }
    });
});

/**
 * Desktop dropdown hover functionality with delay
 */
const desktopDropdowns = document.querySelectorAll('.desktop__list-element');

desktopDropdowns.forEach(dropdown => {
    let timeout;
    
    dropdown.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) menu.style.display = 'block';
    });
    
    dropdown.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) menu.style.display = 'none';
        }, 200);
    });
});