// Toggle hamburger menu
const hamburgerBtn = document.getElementById('hamburgerBtn');
const hamburgerMenu = document.getElementById('hamburgerMenu');
const body = document.body;

console.log('hamburgerBtn:', hamburgerBtn);
console.log('hamburgerMenu:', hamburgerMenu);

if (hamburgerBtn && hamburgerMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Hamburger button clicked');
        
        hamburgerMenu.classList.toggle('active');
        const isActive = hamburgerMenu.classList.contains('active');
        body.style.overflow = isActive ? 'hidden' : '';
        
        console.log('Menu active:', isActive);
    });

    // Close hamburger menu when clicking outside
    document.addEventListener('click', (e) => {
        if (hamburgerMenu.classList.contains('active') && 
            !hamburgerMenu.contains(e.target) && 
            !hamburgerBtn.contains(e.target)) {
            console.log('Click outside - closing menu');
            hamburgerMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Close hamburger menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hamburgerMenu.classList.contains('active')) {
            console.log('Escape pressed - closing menu');
            hamburgerMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Close menu when clicking on links inside the menu
    const menuLinks = hamburgerMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('Link clicked - closing menu');
            hamburgerMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });
}

// Toggle dropdowns in hamburger menu
const hamburgerDropdownBtns = document.querySelectorAll('.hamburger-dropdown-btn');

hamburgerDropdownBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const dropdown = this.parentElement;
        const wasActive = dropdown.classList.contains('active');
        
        // Close all dropdowns first
        hamburgerDropdownBtns.forEach(otherBtn => {
            otherBtn.parentElement.classList.remove('active');
        });
        
        // Toggle this dropdown if it wasn't active
        if (!wasActive) {
            dropdown.classList.add('active');
        }
    });
});

// Optional: Add hover delay for desktop dropdowns
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