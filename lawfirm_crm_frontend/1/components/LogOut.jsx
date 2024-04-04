// LogOut.jsx
import axios from 'axios';

export function LogOut() {
  const refreshToken = localStorage.getItem('refreshToken');

  // Clear all localStorage data for the site
  localStorage.clear();

  // Send request to backend to revoke tokens
  axios
    .post('http://localhost:8000/api/logout/', { refresh_token: refreshToken })
    .then(response => {
      console.log(response.data.message); // Logout successful message
      // Reload the window
      window.location.reload();
    })
    .catch(error => {
      console.error('Logout failed:', error);
      // Handle logout failure
    });
}

export function logoutInactiveUser() {
  // Clear user data from the localStorage without logging out completely
  localStorage.removeItem('user');
}
