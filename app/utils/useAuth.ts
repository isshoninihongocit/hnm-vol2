// Backend API authentication utilities
const API_BASE_URL = 'https://hnm2-be.vercel.app';

export interface User {
  uid: string;
  email: string;
  username?: string;
  college?: string;
  phone?: string;
}

export interface AuthResponse {
  uid: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  email?: string;
  username?: string;
  college?: string;
  phone?: string;
}

// Sign up with your backend
export async function signUp(userData: {
  email: string;
  password: string;
  username: string;
  college: string;
  phone: string;
}): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    const data = await response.json();
    return {
      uid: data.uid,
      email: data.email,
      username: data.username,
      college: data.college,
      phone: data.phone,
    };
  } catch (error) {
    console.error('Signup error:', error);
    return null;
  }
}

// Login with your backend
export async function login(email: string, password: string): Promise<AuthResponse | null> {
  try {
    console.log('🔐 Attempting login for:', email);
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('📡 Login response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('❌ Login failed:', errorData);
      throw new Error(errorData.error || `Login failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Login successful:', { uid: data.uid, email });
    
    // Store token in localStorage (client-side only)
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', data.idToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify({
        uid: data.uid,
        email: email,
      }));
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

// Logout function
export function logout(): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
}

// Get current user from localStorage
export function getCurrentUser(): User | null {
  try {
    if (typeof window === 'undefined') return null; // SSR check
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Get auth token
export function getAuthToken(): string | null {
  try {
    if (typeof window === 'undefined') return null; // SSR check
    return localStorage.getItem('authToken');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

// Make authenticated requests to your backend
export async function authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getAuthToken();
  
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  });
}
