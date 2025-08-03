import { SelectOption } from "types/Categories/SelectOption";
import { getData } from "./apiService";

/**
 * Generic autocomplete service that can be used for different types of searches
 */
export class AutocompleteService {
  /**
   * Search for streets based on a query
   * @param query The search query
   * @returns A promise that resolves to an array of SelectOption objects
   */
  async searchStreets(query: string): Promise<SelectOption[]> {
    try {
      // This is a placeholder. Replace with your actual API endpoint
      const response = await getData<any[]>(
        `/api/streets/search?q=${encodeURIComponent(query)}`
      );

      if (response && Array.isArray(response)) {
        return response.map((item: any) => ({
          value: item.id || item.value || item,
          label: item.name || item.label || item,
        }));
      }

      return [];
    } catch (error) {
      console.error("Error searching streets:", error);
      return [];
    }
  }

  /**
   * Search for neighborhoods based on a query
   * @param query The search query
   * @returns A promise that resolves to an array of SelectOption objects
   */
  async searchNeighborhoods(query: string): Promise<SelectOption[]> {
    try {
      // This is a placeholder. Replace with your actual API endpoint
      const response = await getData<any[]>(
        `/api/neighborhoods/search?q=${encodeURIComponent(query)}`
      );

      if (response && Array.isArray(response)) {
        return response.map((item: any) => ({
          value: item.id || item.value || item,
          label: item.name || item.label || item,
        }));
      }

      return [];
    } catch (error) {
      console.error("Error searching neighborhoods:", error);
      return [];
    }
  }

  /**
   * Search for last names based on a query
   * @param query The search query
   * @returns A promise that resolves to an array of SelectOption objects
   */
  async searchLastNames(query: string): Promise<SelectOption[]> {
    try {
      // This is a placeholder. Replace with your actual API endpoint
      const response = await getData<any[]>(
        `/api/lastnames/search?q=${encodeURIComponent(query)}`
      );

      if (response && Array.isArray(response)) {
        return response.map((item: any) => ({
          value: item.id || item.value || item,
          label: item.name || item.label || item,
        }));
      }

      return [];
    } catch (error) {
      console.error("Error searching last names:", error);
      return [];
    }
  }

  /**
   * Generic search method that can be used for any type of search
   * @param endpoint The API endpoint to search
   * @param query The search query
   * @returns A promise that resolves to an array of SelectOption objects
   */
  async search(endpoint: string, query: string): Promise<SelectOption[]> {
    try {
      const response = await getData<any[]>(
        `${endpoint}?q=${encodeURIComponent(query)}`
      );

      if (response && Array.isArray(response)) {
        return response.map((item: any) => ({
          value: item.id || item.value || item,
          label: item.name || item.label || item,
        }));
      }

      return [];
    } catch (error) {
      console.error(`Error searching ${endpoint}:`, error);
      return [];
    }
  }
}

export const autocompleteService = new AutocompleteService();
