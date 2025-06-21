document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          menuToggle.classList.remove('active');
      });
  });

  // Dropdown Menu Functionality
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
      dropdown.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
              e.preventDefault();
              this.classList.toggle('active');
          }
      });
  });

  // Sticky Navigation on Scroll
  const navbar = document.querySelector('.navbar');
  const heroSection = document.getElementById('home');
  const heroHeight = heroSection.offsetHeight;
  
  window.addEventListener('scroll', function() {
      if (window.scrollY > heroHeight * 0.8) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });

  // Product Category Filtering
  const categoryBtns = document.querySelectorAll('.category-btn');
  const productCards = document.querySelectorAll('.product-card');
  
  categoryBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          // Remove active class from all buttons
          categoryBtns.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          const category = this.dataset.category;
          
          // Filter products
          productCards.forEach(card => {
              if (category === 'all' || card.dataset.category === category) {
                  card.style.display = 'block';
                  card.classList.add('fadeInUp');
              } else {
                  card.style.display = 'none';
                  card.classList.remove('fadeInUp');
              }
          });
      });
  });

  // Testimonial Slider
  const testimonialSlider = document.querySelector('.testimonial-slider');
  let currentTestimonial = 0;
  
  function showTestimonial(index) {
      const testimonials = document.querySelectorAll('.testimonial-card');
      testimonials.forEach((testimonial, i) => {
          testimonial.style.display = i === index ? 'block' : 'none';
      });
  }
  
  // Initialize first testimonial
  if (testimonialSlider) {
      showTestimonial(0);
      
      // Auto-rotate testimonials every 5 seconds
      setInterval(() => {
          currentTestimonial = (currentTestimonial + 1) % document.querySelectorAll('.testimonial-card').length;
          showTestimonial(currentTestimonial);
      }, 5000);
  }

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const formData = new FormData(this);
          const data = {};
          formData.forEach((value, key) => {
              data[key] = value;
          });
          
          // Here you would typically send the data to a server
          console.log('Form submitted:', data);
          
          // Show success message
          alert('Thank you for your message! We will get back to you soon.');
          this.reset();
      });
  }

  // Quick View Modal for Products
  const quickViewBtns = document.querySelectorAll('.quick-view-btn');
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  document.body.appendChild(modalOverlay);
  
  quickViewBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const productCard = this.closest('.product-card');
          const productName = productCard.querySelector('h3').textContent;
          const productBrand = productCard.querySelector('.product-brand').textContent;
          const productPrice = productCard.querySelector('.product-price').textContent;
          const productRating = productCard.querySelector('.product-rating').innerHTML;
          
          const modalContent = `
              <div class="modal">
                  <button class="close-modal">&times;</button>
                  <div class="modal-product">
                      <div class="modal-product-image">
                          ${productCard.querySelector('.product-image').innerHTML}
                      </div>
                      <div class="modal-product-info">
                          <h3>${productName}</h3>
                          <p class="product-brand">${productBrand}</p>
                          <div class="product-rating">${productRating}</div>
                          <p class="product-price">${productPrice}</p>
                          <p class="product-description">Premium quality product with all standard certifications. Suitable for both residential and commercial construction projects.</p>
                          <button class="btn primary-btn add-to-cart-btn">Add to Inquiry</button>
                      </div>
                  </div>
              </div>
          `;
          
          modalOverlay.innerHTML = modalContent;
          modalOverlay.style.display = 'flex';
          
          // Close modal
          const closeModal = modalOverlay.querySelector('.close-modal');
          closeModal.addEventListener('click', () => {
              modalOverlay.style.display = 'none';
          });
      });
  });

  // Close modal when clicking outside
  modalOverlay.addEventListener('click', function(e) {
      if (e.target === this) {
          this.style.display = 'none';
      }
  });

  // Newsletter Form Submission
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const email = this.querySelector('input').value;
          
          // Here you would typically send the email to a server
          console.log('Newsletter subscription:', email);
          
          // Show success message
          alert('Thank you for subscribing to our newsletter!');
          this.reset();
      });
  }

  // Add to Cart/Inquiry Functionality
  const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
  
  addToCartBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const productCard = this.closest('.product-card') || this.closest('.modal-product');
          const productName = productCard.querySelector('h3').textContent;
          
          // Here you would typically add the product to a cart/inquiry list
          console.log('Added to inquiry:', productName);
          
          // Show feedback
          const feedback = document.createElement('div');
          feedback.className = 'cart-feedback';
          feedback.textContent = `${productName} added to inquiry!`;
          document.body.appendChild(feedback);
          
          setTimeout(() => {
              feedback.classList.add('show');
          }, 10);
          
          setTimeout(() => {
              feedback.classList.remove('show');
              setTimeout(() => {
                  feedback.remove();
              }, 300);
          }, 3000);
          
          // Close modal if it's open
          if (modalOverlay.style.display === 'flex') {
              modalOverlay.style.display = 'none';
          }
      });
  });

  // Initialize animations on scroll
  function animateOnScroll() {
      const elements = document.querySelectorAll('.fadeInUp');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.2;
          
          if (elementPosition < screenPosition) {
              element.classList.add('fadeInUp');
          }
      });
  }
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on page load
  //login/logout functionality
 const loginNavItem = document.getElementById('loginNavItem');
    const userEmail = localStorage.getItem('userEmail');

    if (loginNavItem && userEmail) {
        // Replace login button with email and logout
        loginNavItem.innerHTML = `
            <div class="dropdown">
                <button id="userEmailBtn" class="btn login-btn">${userEmail}</button>
                <div class="dropdown-content" style="display:none;position:absolute;">
                    <a href="#" id="logoutBtn">Logout</a>
                </div>
            </div>
        `;

        // Show/hide dropdown on click
        const userEmailBtn = document.getElementById('userEmailBtn');
        const dropdownContent = loginNavItem.querySelector('.dropdown-content');
        userEmailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        });

        // Logout functionality
        document.getElementById('logoutBtn').addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('userEmail');
            window.location.reload();
        });
    }
    //otp functionality
    // ...existing code...

// Example: Trigger OTP send on registration or login
const emailInput = document.getElementById('emailInput'); // Your email input field
const sendOtpBtn = document.getElementById('sendOtpBtn'); // Button to send OTP
const otpModal = document.getElementById('otpModal');
const closeOtpModal = document.getElementById('closeOtpModal');
const verifyOtpBtn = document.getElementById('verifyOtpBtn');
const otpInput = document.getElementById('otpInput');
const otpError = document.getElementById('otpError');

sendOtpBtn.addEventListener('click', async function() {
  const email = emailInput.value;
  if (!email) return alert('Enter your email');
  // Send OTP request
  const res = await fetch('/api/auth/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  const data = await res.json();
  if (data.success) {
    otpModal.style.display = 'flex';
  } else {
    alert('Failed to send OTP');
  }
});

closeOtpModal.addEventListener('click', function() {
  otpModal.style.display = 'none';
});

verifyOtpBtn.addEventListener('click', async function() {
  const email = emailInput.value;
  const otp = otpInput.value;
  const res = await fetch('/api/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp })
  });
  const data = await res.json();
  if (data.success) {
    otpModal.style.display = 'none';
    alert('Email verified!');
    // Proceed with registration/login
  } else {
    otpError.textContent = data.message || 'Invalid OTP';
    otpError.style.display = 'block';
  }
});

// ...existing code...
    
});

// Add styles for dynamically created elements
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
  .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
  }
  
  .modal {
      background-color: white;
      border-radius: 8px;
      padding: 30px;
      max-width: 800px;
      width: 100%;
      position: relative;
      max-height: 90vh;
      overflow-y: auto;
  }
  
  .close-modal {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 1.5rem;
      background: none;
      border: none;
      cursor: pointer;
      color: #666;
  }
  
  .modal-product {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
  }
  
  .modal-product-image {
      height: 300px;
      overflow: hidden;
      border-radius: 8px;
  }
  
  .modal-product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
  }
  
  .product-description {
      margin: 20px 0;
      color: #666;
  }
  
  .cart-feedback {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #28a745;
      color: white;
      padding: 15px 30px;
      border-radius: 4px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
      opacity: 0;
      transition: all 0.3s ease;
  }
  
  .cart-feedback.show {
      opacity: 1;
      bottom: 30px;
  }
  
  @media (max-width: 768px) {
      .modal-product {
          grid-template-columns: 1fr;
      }
      
      .modal-product-image {
          height: 200px;
      }
  }
`;
document.head.appendChild(dynamicStyles);
// Add this to your existing script.js file

// Get Quote Modal Functionality
const quoteBtn = document.querySelector('.quote-btn');
const quoteModal = document.getElementById('quoteModal');
const closeQuoteModal = quoteModal.querySelector('close-modal');

quoteBtn.addEventListener('click', function(e) {
    e.preventDefault();
    quoteModal.style.display = 'flex';
});
// document.addEventListener('DOMContentLoaded', function() {
//     const loginNavItem = document.getElementById('loginNavItem');
//     console.log('loginNavItem:', loginNavItem); // Add this line
//     const userEmail = localStorage.getItem('userEmail');
//     // ...rest of your code
// });
closeQuoteModal.addEventListener('click', function() {
    quoteModal.style.display = 'none';
});

quoteModal.addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
    }
});

// Quote Form Submission
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Here you would typically send the data to a server
        console.log('Quote request submitted:', data);
        
        // Show success message
        alert('Thank you for your quote request! We will get back to you soon.');
        this.reset();
        quoteModal.style.display = 'none';
    });
}
// Add this to your existing script.js file
// User Login/Logout Functionality
// document.addEventListener('DOMContentLoaded', function() {
    
// });
