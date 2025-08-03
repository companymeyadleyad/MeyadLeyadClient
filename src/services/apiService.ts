import axiosInstance from "utils/axiosInterceptor";

const BASE_URL = process.env.REACT_APP_API_URL;

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

/*
interface FetchDataOptions {
  method?: RequestMethod;
  body?: any;
  timeout?: number;
}

const fetchData = async <T>(
  endpoint: string,
  method: RequestMethod = "GET",
  body: any = null,
  timeout: number = 5000
): Promise<T> => {
  const token = localStorage.getItem("token");

  const controller = new AbortController();

  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: body ? JSON.stringify(body) : null,
    signal: controller.signal,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return (await response.json()) as T;
  } catch (error: unknown) {
    console.error("API call failed:", error);

    // Type guard to check if the error is an instance of Error
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Request was aborted due to timeout");
      }
    } else {
      console.error("An unknown error occurred");
    }

    throw error;
  }
};*/

// Helper functions for making GET, POST, PUT, DELETE requests
export const getData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error in getData from ${endpoint}:`, error);
    throw error;
  }
};

export const postData = async <T>(endpoint: string, data: any): Promise<T> => {
  try {
    const response = await axiosInstance.post<T>(
      `${BASE_URL}${endpoint}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(`Error in postData to ${endpoint}:`, error);
    throw error;
  }
};

export const putData = async <T>(endpoint: string, data: any): Promise<T> => {
  try {
    const response = await axiosInstance.put<T>(`${BASE_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error in putData to ${endpoint}:`, error);
    throw error;
  }
};

export const deleteData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await axiosInstance.delete<T>(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error in deleteData from ${endpoint}:`, error);
    throw error;
  }
};
