/**
 * Configuration constants for the application
 * Environment variables are accessed here to provide a centralized way to manage them
 */

/**
 * Base URL for API requests
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Helper function to construct a full API URL
 * @param endpoint - The API endpoint to append to the base URL
 * @returns The full API URL
 */
export const getApiUrl = (endpoint: string): string => `${API_BASE_URL}/${endpoint}`;
