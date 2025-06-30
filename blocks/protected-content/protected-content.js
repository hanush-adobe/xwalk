import { decorateProtectedContent } from '../../scripts/auth.js';

export default function decorate(block) {
  decorateProtectedContent(block);

  // If user is authenticated, show the protected content
  const storedUser = localStorage.getItem('authUser');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    block.innerHTML = `
      <div class="protected-content">
        <h3>🔒 Protected Content</h3>
        <p>Welcome, <strong>${user.username}</strong>! This content is only visible to authenticated users.</p>
        <div class="protected-info">
          <h4>Exclusive Information:</h4>
          <ul>
            <li>This is sensitive information only for logged-in users</li>
            <li>You have access to premium features</li>
            <li>Your user role: ${user.username === 'admin' ? 'Administrator' : 'User'}</li>
            <li>Login time: ${new Date().toLocaleString()}</li>
          </ul>
        </div>
        <div class="user-actions">
          <button onclick="logout()" class="logout-action-btn">Logout</button>
        </div>
      </div>
    `;

    // Add logout functionality
    const logoutBtn = block.querySelector('.logout-action-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('authUser');
        window.location.reload();
      });
    }
  }
}
