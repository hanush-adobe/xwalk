# Authentication System Documentation

This project includes a complete authentication system with login modal, session management, and protected content capabilities.

## Features

- **Login Modal**: Beautiful, responsive modal with form validation
- **Mock API**: Simulated authentication service for development/demo
- **Session Persistence**: User sessions persist across page reloads
- **Protected Content**: Blocks that require authentication to view
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during authentication
- **Responsive Design**: Works on all device sizes

## Quick Start

### 1. Demo Credentials

Use these credentials to test the system:
- `demo` / `demo123`
- `admin` / `admin123` 
- `user` / `user123`

### 2. Opening the Login Modal

Click the "Login" button in the header, or call `openLoginModal()` programmatically.

### 3. Protected Content

Add protected content blocks to any page:

```markdown
{{protected-content}}
```

## Files Structure

```
blocks/
├── header/
│   ├── login-model.js          # Main authentication logic
│   ├── login-model.css         # Modal styling
│   └── header.js               # Header integration
├── protected-content/
│   ├── protected-content.js    # Protected content block
│   └── protected-content.css   # Protected content styling
scripts/
└── auth.js                     # Authentication utilities
```

## API Reference

### Authentication Functions

#### `mockAuthenticate(username, password)`
Simulates API authentication call.

#### `getCurrentUser()`
Returns the currently authenticated user or null.

#### `logout()`
Logs out the user and redirects to home page.

#### `checkExistingAuth()`
Checks for existing authentication on page load.

#### `openLoginModal()`
Opens the login modal programmatically.

### Utility Functions (auth.js)

#### `isAuthenticated()`
Returns true if user is logged in.

#### `requireAuth(redirectUrl)`
Redirects to login if not authenticated.

#### `decorateProtectedContent(block)`
Decorates a block to show login prompt if not authenticated.

## Customization

### Styling
Modify `login-model.css` and `protected-content.css` to match your design system.

### Authentication Service
Replace the `mockAuthenticate` function in `login-model.js` with your actual API calls.

### User Management
Extend the user object structure to include additional user information (roles, permissions, etc.).

## Security Notes

- This is a client-side authentication system suitable for demos and development
- For production, implement server-side authentication with secure token management
- Consider using secure HTTP-only cookies for production sessions
- Implement proper CSRF protection and input validation

## Browser Support

- Modern browsers with ES6+ support
- Uses native `<dialog>` element with backdrop support
- Falls back gracefully on older browsers

## Example Usage

### Basic Login Flow
1. User clicks "Login" button
2. Modal opens with username/password fields
3. Form validates input and shows loading state
4. Success: User is logged in and redirected
5. Error: User sees error message and can retry

### Protected Pages
```javascript
import { requireAuth } from './scripts/auth.js';

// Protect entire page
document.addEventListener('DOMContentLoaded', async () => {
  await requireAuth();
});
```

### Protected Content Blocks
```javascript
import { decorateProtectedContent } from '../../scripts/auth.js';

export default function decorate(block) {
  decorateProtectedContent(block);
  // Add authenticated content here
}
```
