import { RegisterFormData } from './pages/Register';
import { SignInFormData } from './pages/SignIn';
import { HotelType } from '../../backend/src/shared/types';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Token invalid');
  }
  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: 'include',
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Error during sign out');
  }
};

export const addMyHotel = async (hoteFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotel`, {
    method: 'POST',
    credentials: 'include',
    body: hoteFormData,
  });

  if (!response.ok) {
    throw new Error('Failed to add hotel');
  }

  return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotel`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error fetching hotels');
  }

  return response.json();
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotel/${hotelId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error fetching Hotels');
  }

  return response.json();
};

export const updateMyHotelById = async (hoteFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotel/${hoteFormData.get('hotelId')}`, {
      method: "PUT",
      credentials: "include",
      body: hoteFormData
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update hotel');
  }

  return response.json()

};
