// Backend API authentication utilities - Production Ready
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://hnm2-be.vercel.app';

// Environment validation
if (typeof window !== 'undefined' && !import.meta.env.VITE_API_BASE_URL) {
  console.warn('⚠️ VITE_API_BASE_URL not set, using fallback URL');
}

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

export interface PaymentData {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface OrderData {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface EventRegistrationData {
  userDetails: {
    name: string;
    email: string;
    college?: string;
    department?: string;
    year?: string;
    phone?: string;
  };
  selectedEvents?: string[];
  selectedWorkshops?: string[];
  selectedNonTechEvents?: string[];
  selectedPass?: string;
  dayPass?: string;
  passType?: string;
  teamDetails?: any;
  paymentDetails: {
    paymentId: string;
    orderId: string;
    amount: number;
  };
  registrationMode?: 'individual' | 'day-pass' | 'bulk';
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
      // Clear authentication tokens
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      // Clear cached user data
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      localStorage.removeItem('registrationIntentId');
      
      console.log('🧹 All user-specific localStorage data cleared on logout');
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

// ===== NEW BACKEND INTEGRATION FUNCTIONS =====

// Create Razorpay order via backend
export async function createRazorpayOrder(orderData: {
  amount: number;
  currency?: string;
  receipt: string;
  eventDetails?: {
    name: string;
    type: string;
  };
  user?: {
    name: string;
    email: string;
  };
}): Promise<OrderData> {
  try {
    console.log('🚀 Creating Razorpay order:', orderData);
    
    const response = await fetch(`${API_BASE_URL}/payments/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Create order failed:', response.status, errorText);
      throw new Error(`Failed to create order: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ Order created successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Error creating Razorpay order:', error);
    throw error;
  }
}

// Verify payment via backend
export async function verifyPayment(paymentData: PaymentData): Promise<{ status: string; message: string; paymentId: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/payments/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error(`Payment verification failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
}

// Store payment data via backend
export async function storePayment(data: {
  paymentData: PaymentData;
  orderData: OrderData;
  planData: {
    name: string;
    type: string;
    price: number;
    description: string;
    features: string[];
  };
  userData: {
    id?: string | null;
    name: string;
    email: string;
  };
}): Promise<any> {
  try {
    // Transform data to match backend validation schema
    const backendPayload = {
      paymentId: data.paymentData.razorpay_payment_id,
      orderId: data.orderData.id,
      amount: data.planData.price,
      currency: data.orderData.currency || 'INR',
      userEmail: data.userData.email,
      events: [data.planData.name], // Convert plan name to events array
      // Additional data for storage
      paymentData: data.paymentData,
      orderData: data.orderData,
      planData: data.planData,
      userData: data.userData,
      // Add registration data to trigger email sending
      registrationData: {
        registrationId: `HNM-${Date.now()}`,
        userEmail: data.userData.email,
        userName: data.userData.name,
        selectedPass: data.planData.name,
        passType: data.planData.type,
        dayPass: data.planData.name,
        planName: data.planData.name,
        planType: data.planData.type,
        planPrice: data.planData.price,
        planDescription: data.planData.description,
        planFeatures: data.planData.features
      }
    };

    console.log('📤 Sending payment data to backend:', backendPayload);

    const response = await fetch(`${API_BASE_URL}/payments/store-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendPayload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      console.error('❌ Backend response error:', errorData);
      throw new Error(`Failed to store payment: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error storing payment:', error);
    throw error;
  }
}

// Get user's purchased plans
export async function getUserPurchasedPlans(email: string): Promise<any[]> {
  console.log('📊 Fetching purchased plans for:', email);
  
  try {
    const response = await fetch(`${API_BASE_URL}/payments/purchased-plans/${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Purchased plans fetched successfully:', result);
      return result.purchasedPlans || [];
    } else if (response.status === 404) {
      console.log('ℹ️ No purchased plans found for user');
      return [];
    } else {
      console.error('❌ Failed to fetch purchased plans:', response.status);
      return [];
    }
  } catch (error) {
    console.error('❌ Error fetching purchased plans:', error);
    console.log('🔄 Falling back to empty array (all plans available)');
    return [];
  }
}

// Register for events (authenticated endpoint)
export async function registerForEvents(registrationData: EventRegistrationData): Promise<any> {
  try {
    const response = await authenticatedFetch(`${API_BASE_URL}/events/register`, {
      method: 'POST',
      body: JSON.stringify(registrationData),
    });

    if (!response.ok) {
      throw new Error(`Event registration failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error registering for events:', error);
    throw error;
  }
}

// Get user registrations (authenticated endpoint)
export async function getUserRegistrations(): Promise<any[]> {
  try {
    const response = await authenticatedFetch(`${API_BASE_URL}/events/user-registrations`);

    if (!response.ok) {
      throw new Error(`Failed to fetch registrations: ${response.status}`);
    }

    const result = await response.json();
    return result.registrations || [];
  } catch (error) {
    console.error('Error fetching user registrations:', error);
    return [];
  }
}

// Store failed payment
export async function storeFailedPayment(failedData: {
  orderId: string;
  planName: string;
  planPrice: number;
  userName: string;
  userEmail: string;
  failureReason: string;
  errorDetails?: string;
}): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/payments/store-failed-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(failedData),
    });

    if (!response.ok) {
      console.warn(`Failed to store failed payment data: ${response.status}`);
    }
  } catch (error) {
    console.error('Error storing failed payment:', error);
  }
}
