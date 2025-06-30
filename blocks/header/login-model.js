// Mock API for authentication
const mockAuthenticate = async (username, password) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock credentials - in real app, this would be an API call
  const validCredentials = [
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'user123' },
    { username: 'demo', password: 'demo123' }
  ];

  const isValid = validCredentials.some(
    cred => cred.username === username && cred.password === password
  );

  if (isValid) {
    return { success: true, user: { username } };
  } else {
    throw new Error('Invalid username or password');
  }
};

// Authentication state management
let currentUser = null;

export const getCurrentUser = () => currentUser;

export const logout = () => {
  currentUser = null;
  localStorage.removeItem('authUser');
  // Redirect to home page or refresh
  window.location.href = '/';
};

// Check for existing authentication on page load
export const checkExistingAuth = () => {
  const storedUser = localStorage.getItem('authUser');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    return currentUser;
  }
  return null;
};

export const getLoginModalDom = () => {
  const loginModal = document.createElement('dialog');
  loginModal.className = 'login-modal';
  loginModal.id = 'login-modal';

  loginModal.innerHTML = `
    <div class="login-modal-content">
      <div class="login-modal-header">
        <h2>Login</h2>
        <button type="button" class="close-btn" aria-label="Close login modal">&times;</button>
      </div>

      <form class="login-form" id="login-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" required autocomplete="username">
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required autocomplete="current-password">
        </div>

        <div class="error-message" id="error-message" style="display: none;"></div>

        <div class="form-actions">
          <button type="submit" class="login-btn">
            <span class="btn-text">Login</span>
            <span class="btn-loading" style="display: none;">Logging in...</span>
          </button>
          <button type="button" class="cancel-btn">Cancel</button>
        </div>

        <div class="demo-credentials">
          <p><strong>Demo Credentials:</strong></p>
          <p>Username: demo | Password: demo123</p>
        </div>
      </form>
    </div>
  `;

  // Add event listeners
  const closeBtn = loginModal.querySelector('.close-btn');
  const cancelBtn = loginModal.querySelector('.cancel-btn');
  const loginForm = loginModal.querySelector('#login-form');
  const errorMessage = loginModal.querySelector('#error-message');
  const loginBtn = loginModal.querySelector('.login-btn');
  const btnText = loginModal.querySelector('.btn-text');
  const btnLoading = loginModal.querySelector('.btn-loading');

  // Close modal function
  const closeModal = () => {
    loginModal.close();
    // Reset form
    loginForm.reset();
    errorMessage.style.display = 'none';
    loginBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
  };

  // Close modal events
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  // Close on backdrop click
  loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      closeModal();
    }
  });

  // Close on Escape key
  loginModal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Handle form submission
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const username = formData.get('username').trim();
    const password = formData.get('password');

    if (!username || !password) {
      showError('Please fill in all fields');
      return;
    }

    // Show loading state
    loginBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    errorMessage.style.display = 'none';

    try {
      const result = await mockAuthenticate(username, password);

      if (result.success) {
        // Store user info
        currentUser = result.user;
        localStorage.setItem('authUser', JSON.stringify(result.user));

        // Show success and redirect
        showSuccess('Login successful! Redirecting...');

        setTimeout(() => {
          closeModal();
          // Redirect to home page
          window.location.href = '/';
        }, 1500);
      }
    } catch (error) {
      showError(error.message);
    } finally {
      // Reset loading state
      loginBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
    }
  });

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.className = 'error-message show';
    errorMessage.style.display = 'block';
  }

  function showSuccess(message) {
    errorMessage.textContent = message;
    errorMessage.className = 'success-message show';
    errorMessage.style.display = 'block';
  }

  return loginModal;
};

// Function to open the login modal
export const openLoginModal = () => {
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.showModal();
    // Focus on username field
    const usernameField = modal.querySelector('#username');
    if (usernameField) {
      usernameField.focus();
    }
  }
};
