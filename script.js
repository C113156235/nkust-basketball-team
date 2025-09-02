// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to navigation links based on scroll position
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Add fade-in animation for cards when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.purpose-card, .rule-category, .rights-card, .duties-card, .note-card, .contact-info, .training-info, .join-card, .qr-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Add hover effect for fee table rows
    const tableRows = document.querySelectorAll('.fee-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add click effect for purpose cards
    const purposeCards = document.querySelectorAll('.purpose-card');
    purposeCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });    // Add floating animation to hero icon
    const heroIcon = document.querySelector('.hero-icon i');
    if (heroIcon) {
        setInterval(() => {
            heroIcon.style.animation = 'bounce 2s infinite';
        }, 4000);
    }

    // Add special effects for QR codes
    const qrCards = document.querySelectorAll('.qr-card');
    qrCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
            
            // Add sparkle effect
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, #ffd700, transparent);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: sparkle 0.6s ease-out;
                pointer-events: none;
                z-index: 10;
            `;
            
            this.style.position = 'relative';
            this.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 600);
        });
    });

    // Add CSS for sparkle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            50% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 0.8;
            }
            100% {
                transform: translate(-50%, -50%) scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Header background change on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(102, 126, 234, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            header.style.backdropFilter = 'none';
        }
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add counter animation for fees
    const feeAmounts = document.querySelectorAll('.amount');
    feeAmounts.forEach(amount => {
        if (amount.textContent.includes('元') && !amount.classList.contains('free')) {
            const finalValue = parseInt(amount.textContent);
            if (!isNaN(finalValue)) {
                let currentValue = 0;
                const increment = finalValue / 50;
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        currentValue = finalValue;
                        clearInterval(counter);
                    }
                    amount.textContent = Math.floor(currentValue) + '元';
                }, 30);
            }
        }
    });

    // Mobile menu toggle (if needed for smaller screens)
    function createMobileMenu() {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('.nav');
            const navUl = document.querySelector('.nav ul');
            
            if (!document.querySelector('.mobile-menu-toggle')) {
                const menuToggle = document.createElement('button');
                menuToggle.classList.add('mobile-menu-toggle');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                menuToggle.style.cssText = `
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    display: none;
                `;
                
                nav.appendChild(menuToggle);
                
                menuToggle.addEventListener('click', function() {
                    navUl.style.display = navUl.style.display === 'none' ? 'flex' : 'none';
                });
            }
        }
    }

    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Add search functionality (optional)
    function addSearchFunction() {
        const searchContainer = document.createElement('div');
        searchContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1001;
            background: white;
            padding: 10px;
            border-radius: 25px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            display: none;
        `;
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = '搜尋規定內容...';
        searchInput.style.cssText = `
            border: none;
            outline: none;
            padding: 8px 15px;
            border-radius: 20px;
            width: 200px;
        `;
        
        searchContainer.appendChild(searchInput);
        document.body.appendChild(searchContainer);
        
        // Add keyboard shortcut to open search
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                searchContainer.style.display = 'block';
                searchInput.focus();
            }
            
            if (e.key === 'Escape') {
                searchContainer.style.display = 'none';
            }
        });
        
        // Simple search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const allText = document.querySelectorAll('p, li, h3, h4, h5');
            
            allText.forEach(element => {
                const originalBg = element.style.backgroundColor;
                if (searchTerm && element.textContent.toLowerCase().includes(searchTerm)) {
                    element.style.backgroundColor = '#fff3cd';
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    element.style.backgroundColor = originalBg;
                }
            });
        });
    }
    
    // Uncomment the line below to enable search functionality
    // addSearchFunction();
});

// Print functionality
function printPage() {
    window.print();
}

// Add print button
document.addEventListener('DOMContentLoaded', function() {
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> 列印';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        padding: 15px 20px;
        border-radius: 50px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        font-family: 'Noto Sans TC', sans-serif;
        font-weight: 500;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    printButton.addEventListener('click', printPage);
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    });
    
    document.body.appendChild(printButton);
});

// Back to top functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: #e74c3c;
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        font-size: 1.2rem;
        z-index: 1000;
        opacity: 0;
        transition: all 0.3s ease;
        transform: translateY(100px);
    `;
    
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.transform = 'translateY(0)';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.transform = 'translateY(100px)';
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(0)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {        this.style.transform = 'scale(1) translateY(0)';
    });
});

// QR Code Modal Functions
function openQRModal(imageSrc, title, description) {
    const modal = document.getElementById('qrModal');
    const modalImage = document.getElementById('qrModalImage');
    const modalTitle = document.getElementById('qrModalTitle');
    const modalDescription = document.getElementById('qrModalDescription');
    
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modalDescription.textContent = `掃描此 QR Code - ${description}`;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // 防止背景滾動
    
    // 加入按鍵監聽
    document.addEventListener('keydown', handleModalKeypress);
}

function closeQRModal() {
    const modal = document.getElementById('qrModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // 恢復滾動
    
    // 移除按鍵監聽
    document.removeEventListener('keydown', handleModalKeypress);
}

function handleModalKeypress(e) {
    if (e.key === 'Escape') {
        closeQRModal();
    }
}

// Welcome Message Function
function showWelcomeMessage() {
    // 創建歡迎訊息的模態框
    const welcomeModal = document.createElement('div');
    welcomeModal.className = 'welcome-modal';
    welcomeModal.innerHTML = `
        <div class="welcome-modal-content">
            <div class="welcome-header">
                <div class="welcome-icon">
                    <i class="fas fa-basketball-ball"></i>
                </div>
                <h3>感謝您對我們的關注！</h3>
            </div>            <div class="welcome-body">
                <p>🏀 <strong>我們真誠期待您的加入！</strong></p>
                <p>如果您想要加入高科大智慧商務系籃球隊，請掃描下方的QR碼來聯絡我們或填寫報名表單：</p>
                <div class="contact-options">
                    <div class="contact-option" onclick="scrollToContact()">
                        <i class="fas fa-qrcode"></i>
                        <span>查看QR碼</span>
                    </div>
                </div>
                <p class="welcome-note">讓我們一起在球場上揮灑汗水，為系上爭光！💪</p>
            </div>
            <div class="welcome-footer">
                <button onclick="closeWelcomeModal()" class="welcome-btn">
                    <i class="fas fa-check"></i> 知道了
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(welcomeModal);
    document.body.style.overflow = 'hidden';
    
    // 動畫效果
    setTimeout(() => {
        welcomeModal.style.opacity = '1';
        welcomeModal.querySelector('.welcome-modal-content').style.transform = 'translateY(0) scale(1)';
    }, 10);
    
    // ESC鍵關閉
    document.addEventListener('keydown', handleWelcomeKeypress);
    
    // 點擊背景關閉
    welcomeModal.addEventListener('click', function(e) {
        if (e.target === welcomeModal) {
            closeWelcomeModal();
        }
    });
}

function closeWelcomeModal() {
    const welcomeModal = document.querySelector('.welcome-modal');
    if (welcomeModal) {
        welcomeModal.style.opacity = '0';
        welcomeModal.querySelector('.welcome-modal-content').style.transform = 'translateY(-50px) scale(0.95)';
        
        setTimeout(() => {
            welcomeModal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
    document.removeEventListener('keydown', handleWelcomeKeypress);
}

function handleWelcomeKeypress(e) {
    if (e.key === 'Escape') {
        closeWelcomeModal();
    }
}

function scrollToContact() {
    closeWelcomeModal();
    setTimeout(() => {
        document.getElementById('contact').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }, 300);
}
