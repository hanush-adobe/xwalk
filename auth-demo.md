# Protected Content Demo

This page demonstrates the authentication system in action.

## Public Content

This content is visible to everyone, regardless of authentication status.

## Protected Section

{{protected-content}}

### Features

- **Login Modal**: Click the "Login" button in the header to open the authentication modal
- **Mock API**: Uses demo credentials for testing (username: demo, password: demo123)
- **Session Persistence**: Login state persists across page reloads
- **Automatic Redirect**: After login, users are redirected to their intended destination
- **Error Handling**: Shows user-friendly error messages for invalid credentials
- **Loading States**: Visual feedback during authentication process

### Demo Credentials

Use these credentials to test the authentication:

- Username: `demo` | Password: `demo123`
- Username: `admin` | Password: `admin123`
- Username: `user` | Password: `user123`

### How It Works

1. **Login Process**: Users click the login button, enter credentials, and the system validates against mock API
2. **Session Management**: User information is stored in localStorage for persistence
3. **Protected Content**: Certain sections require authentication to view
4. **Logout**: Users can logout which clears session and redirects to home page
