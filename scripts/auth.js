/**
 * Authentication utility functions
 * This module provides authentication-related utilities that can be used across the site
 */

// Get current authenticated user
export const getCurrentUser = () => {
  const storedUser = localStorage.getItem('authUser');
  return storedUser ? JSON.parse(storedUser) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => getCurrentUser() !== null;

// Redirect to login if not authenticated
export const requireAuth = async (redirectUrl = '/') => {
  if (!isAuthenticated()) {
    // Store the intended destination
    sessionStorage.setItem('authRedirect', window.location.href);

    // Show login modal if available, otherwise redirect to home
    const loginModal = document.getElementById('login-modal');
    if (loginModal) {
      const { openLoginModal } = await import('../blocks/header/login-model.js');
      openLoginModal();
    } else {
      window.location.href = redirectUrl;
    }
    return false;
  }
  return true;
};

// Logout function
export const logout = () => {
  localStorage.removeItem('authUser');
  sessionStorage.removeItem('authRedirect');
  window.location.href = '/';
};

// Protected page decorator
export const protectPage = () => {
  document.addEventListener('DOMContentLoaded', () => {
    if (!requireAuth()) {
      // Hide page content until authenticated
      document.body.style.display = 'none';
    }
  });
};

// Show content only to authenticated users
export const decorateProtectedContent = (block) => {
  if (!isAuthenticated()) {
    block.innerHTML = `
      <div style="text-align: center; padding: 40px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
        <h3 style="color: #374151; margin-bottom: 16px;">Authentication Required</h3>
        <p style="color: #6b7280; margin-bottom: 20px;">Please log in to view this content.</p>
        <button onclick="openLoginModal()" style="background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer;">
          Login
        </button>
      </div>
    `;
  }
};

// Initialize authentication state on page load
document.addEventListener('DOMContentLoaded', () => {
  // Check for pending redirect after login
  const pendingRedirect = sessionStorage.getItem('authRedirect');
  if (pendingRedirect && isAuthenticated()) {
    sessionStorage.removeItem('authRedirect');
    window.location.href = pendingRedirect;
  }
});
