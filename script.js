/**
 * Red Dead Redemption 2 - Main Navigation Script
 * Handles header functionality including mobile menu and dropdowns
 */

class NavigationManager {
    constructor() {
        this.hamburgerBtn = document.getElementById('hamburgerBtn');
        this.hamburgerMenu = document.getElementById('hamburgerMenu');
        this.body = document.body;
        
        this.init();
    }
    
    init() {
        this.setupHamburgerMenu();
        this.setupDropdowns();
        this.setupDesktopDropdowns();
    }
    
    /**
     * Setup hamburger menu functionality
     */
    setupHamburgerMenu() {
        if (!this.hamburgerBtn || !this.hamburgerMenu) return;
        
        // Set initial menu position
        this.updateMenuPosition();
        window.addEventListener('resize', () => this.updateMenuPosition());
        
        // Toggle menu on button click
        this.hamburgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            this.updateMenuPosition();
            const isActive = this.hamburgerMenu.classList.toggle('active');
            this.body.style.overflow = isActive ? 'hidden' : '';
            this.toggleHamburgerIcon(isActive);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.hamburgerMenu.classList.contains('active') && 
                !this.hamburgerMenu.contains(e.target) && 
                !this.hamburgerBtn.contains(e.target)) {
                this.closeHamburgerMenu();
            }
        });
        
        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.hamburgerMenu.classList.contains('active')) {
                this.closeHamburgerMenu();
            }
        });
        
        // Close menu when clicking on links inside
        const menuLinks = this.hamburgerMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => this.closeHamburgerMenu());
        });
    }
    
    /**
     * Calculate and update menu position based on header height
     */
    updateMenuPosition() {
        if (!this.hamburgerMenu) return;
        
        const header = document.querySelector('.header');
        if (header) {
            const headerHeight = header.offsetHeight;
            this.hamburgerMenu.style.paddingTop = `${headerHeight}px`;
        }
    }
    
    /**
     * Toggle hamburger icon state
     * @param {boolean} isActive - Whether menu is active
     */
    toggleHamburgerIcon(isActive) {
        const hamburgerIcon = this.hamburgerBtn.querySelector('img');
        if (!hamburgerIcon) return;
        
        if (isActive) {
            hamburgerIcon.alt = 'Close menu';
            // Uncomment if you have a close icon
            // hamburgerIcon.src = './assets/icons/close.svg';
        } else {
            hamburgerIcon.src = './assets/icons/menu.svg';
            hamburgerIcon.alt = 'Menu';
        }
    }
    
    /**
     * Close hamburger menu and reset states
     */
    closeHamburgerMenu() {
        if (!this.hamburgerMenu) return;
        
        this.hamburgerMenu.classList.remove('active');
        this.body.style.overflow = '';
        this.toggleHamburgerIcon(false);
    }
    
    /**
     * Setup mobile dropdown functionality
     */
    setupDropdowns() {
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
                dropdown.classList.toggle('active');
            });
        });
    }
    
    /**
     * Setup desktop dropdown hover functionality
     */
    setupDesktopDropdowns() {
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
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});