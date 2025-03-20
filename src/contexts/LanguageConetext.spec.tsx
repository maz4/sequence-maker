import "@testing-library/jest-dom";
import { afterAll, expect } from "@jest/globals";
import { render, act, renderHook, screen } from "@testing-library/react";

import { LanguageProvider, useLanguage } from "./LanguageContext";
import { languages } from "@/consts/languages";
import {
  saveToStorage,
  getItemFromStorage,
  APP_STORAGE_KEY,
} from "@/utils/localStorage";

// Mock localStorage for testing environment
class LocalStorageMock {
  store: Record<string, string>;

  constructor() {
    this.store = {};
  }

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }
}

// Set up localStorage mock
global.localStorage = new LocalStorageMock() as unknown as Storage;

// Mock the actual localStorage utility functions to use our mock localStorage
jest.mock("@/utils/localStorage", () => {
  // Use the original module
  const originalModule = jest.requireActual("@/utils/localStorage");

  return {
    ...originalModule,
    // Make the APP_STORAGE_KEY available for tests
    APP_STORAGE_KEY: "capoeira-sequence-maker",
  };
});

describe("LanguageProvider and useLanguage", () => {
  // Clear localStorage between tests
  beforeEach(() => {
    localStorage.clear();
  });

  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => "");
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("LanguageProvider", () => {
    test("renders children properly", () => {
      render(
        <LanguageProvider>
          <div data-testid="child">Child Content</div>
        </LanguageProvider>
      );

      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByTestId("child").textContent).toBe("Child Content");
    });

    test("initializes with English language by default when storage is empty", () => {
      const TestComponent = () => {
        const { language } = useLanguage();
        return <div data-testid="language-code">{language.code}</div>;
      };

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId("language-code").textContent).toBe("en");
    });

    test("loads language from localStorage if available", () => {
      // Set Japanese language in localStorage
      saveToStorage("language", languages.jp);

      const TestComponent = () => {
        const { language } = useLanguage();
        return <div data-testid="language-code">{language.code}</div>;
      };

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId("language-code").textContent).toBe("jp");
      // Verify data was saved correctly
      const savedLanguage = getItemFromStorage("language");
      expect(savedLanguage).toEqual(languages.jp);
    });

    test("handles corrupted language data in localStorage (invalid code)", () => {
      // Set corrupted language in localStorage directly
      const corruptedLanguage = { name: "Invalid", code: "invalid" };

      // We'll manually corrupt localStorage to simulate corrupted data
      const corruptedData = { language: corruptedLanguage };
      localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(corruptedData));

      const TestComponent = () => {
        const { language } = useLanguage();
        return <div data-testid="language-code">{language.code}</div>;
      };

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      // Should reset to default English
      expect(screen.getByTestId("language-code").textContent).toBe("en");

      // Verify data was corrected
      const savedLanguage = getItemFromStorage("language");
      expect(savedLanguage).toEqual(languages.en);
    });

    test("handles malformed data in localStorage", () => {
      // Set invalid JSON in localStorage directly
      localStorage.setItem(APP_STORAGE_KEY, "this is not valid JSON");

      const TestComponent = () => {
        const { language } = useLanguage();
        return <div data-testid="language-code">{language.code}</div>;
      };

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      // Should default to English
      expect(screen.getByTestId("language-code").textContent).toBe("en");
    });
  });

  describe("useLanguage hook", () => {
    test("throws error when used outside LanguageProvider", () => {
      // Suppress error output for this test
      const originalConsoleError = console.error;
      console.error = jest.fn();

      // Expect renderHook to throw when used outside provider
      expect(() => {
        renderHook(() => useLanguage());
      }).toThrow("useLanguage must be used within a LanguageProvider");

      // Restore console.error
      console.error = originalConsoleError;
    });

    test("provides language value when used inside LanguageProvider", () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => (
          <LanguageProvider>{children}</LanguageProvider>
        ),
      });

      expect(result.current.language).toEqual(languages.en);
    });

    test("provides updateLanguage function that updates language", () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => (
          <LanguageProvider>{children}</LanguageProvider>
        ),
      });

      // Initially English
      expect(result.current.language).toEqual(languages.en);

      // Update to Japanese
      act(() => {
        result.current.updateLanguage(languages.jp);
      });

      // Should now be Japanese
      expect(result.current.language).toEqual(languages.jp);

      // Verify storage was updated
      const savedLanguage = getItemFromStorage("language");
      expect(savedLanguage).toEqual(languages.jp);
    });
  });

  describe("Edge cases and error handling", () => {
    test("handles null language object in localStorage", () => {
      // Set null language in localStorage directly
      const dataWithNullLanguage = { language: null };
      localStorage.setItem(
        APP_STORAGE_KEY,
        JSON.stringify(dataWithNullLanguage)
      );

      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => (
          <LanguageProvider>{children}</LanguageProvider>
        ),
      });

      // Should default to English
      expect(result.current.language).toEqual(languages.en);
    });

    test("handles missing code property in language object", () => {
      // Set a language object missing the code property
      const malformedLanguage = { name: "Malformed" }; // Missing code property
      const data = { language: malformedLanguage };
      localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(data));

      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => (
          <LanguageProvider>{children}</LanguageProvider>
        ),
      });

      // Should default to English
      expect(result.current.language).toEqual(languages.en);
    });

    test("handles empty language code in localStorage", () => {
      // Set a language with empty code
      const languageWithEmptyCode = { name: "Empty", code: "" };
      const data = { language: languageWithEmptyCode };
      localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(data));

      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => (
          <LanguageProvider>{children}</LanguageProvider>
        ),
      });

      // Should default to English
      expect(result.current.language).toEqual(languages.en);
    });

    test("handles different structure but valid code", () => {
      // Create object with valid code but different structure
      const differentStructureLanguage = { code: "pt", differentProp: "test" };
      const data = { language: differentStructureLanguage };
      localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(data));

      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => (
          <LanguageProvider>{children}</LanguageProvider>
        ),
      });

      // Should use Portuguese since it has a valid code
      expect(result.current.language.code).toBe("pt");
    });
  });
});
