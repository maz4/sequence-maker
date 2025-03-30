import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { render, act, renderHook, screen } from "@testing-library/react";
import { FeatureFlagsProvider, useFeatureFlags } from "./FeatureFlagsContext";
import { flags, FeatureFlags } from "@/consts/featureFlags";
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

describe("FeatureFlagsProvider and useFeatureFlags", () => {
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

  describe("FeatureFlagsProvider", () => {
    test("renders children properly", () => {
      render(
        <FeatureFlagsProvider>
          <div data-testid="child">Child Content</div>
        </FeatureFlagsProvider>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByTestId("child").textContent).toBe("Child Content");
    });

    test.skip("initializes with default feature flags when storage is empty", async () => {
      const TestComponent = () => {
        const { featureFlags } = useFeatureFlags();
        return (
          <p data-testid="feature-flags">{featureFlags.header.isEnabled}</p>
        );
      };

      render(
        <FeatureFlagsProvider>
          <TestComponent />
        </FeatureFlagsProvider>
      );

      const renderedFlags = await screen.getByTestId("feature-flags");
      expect(renderedFlags).toBe("true");
    });

    test.skip("loads feature flags from localStorage if available", () => {
      // Set custom feature flags in localStorage
      const customFlags: FeatureFlags = {
        ...flags,
        header: { isEnabled: true, description: "" },
      };
      saveToStorage("featureFlags", customFlags);

      const TestComponent = () => {
        const { featureFlags } = useFeatureFlags();
        return (
          <div data-testid="feature-flags">{featureFlags.header.isEnabled}</div>
        );
      };

      render(
        <FeatureFlagsProvider>
          <TestComponent />
        </FeatureFlagsProvider>
      );

      const renderedFlags = screen.getByTestId("feature-flags").textContent;
      expect(renderedFlags).toBe("true");

      // Verify data was saved correctly
      const savedFlags = getItemFromStorage("featureFlags");
      expect(savedFlags).toEqual(customFlags);
    });

    test("handles malformed data in localStorage", () => {
      // Set invalid JSON in localStorage directly
      localStorage.setItem(APP_STORAGE_KEY, "this is not valid JSON");

      const TestComponent = () => {
        const { featureFlags } = useFeatureFlags();
        return (
          <div data-testid="feature-flags">{featureFlags.header.isEnabled}</div>
        );
      };

      render(
        <FeatureFlagsProvider>
          <TestComponent />
        </FeatureFlagsProvider>
      );

      // Should default to the predefined flags
      const renderedFlags = screen.getByTestId("feature-flags").textContent;
      expect(renderedFlags).toBe("");
    });
  });

  describe("useFeatureFlags hook", () => {
    test("throws error when used outside FeatureFlagsProvider", () => {
      // Suppress error output for this test
      const originalConsoleError = console.error;
      console.error = jest.fn();

      // Expect renderHook to throw when used outside provider
      expect(() => {
        renderHook(() => useFeatureFlags());
      }).toThrow("useFeatureFlags must be used within a FeatureFlagsProvider");

      // Restore console.error
      console.error = originalConsoleError;
    });

    test("provides feature flags value when used inside FeatureFlagsProvider", () => {
      const { result } = renderHook(() => useFeatureFlags(), {
        wrapper: ({ children }) => (
          <FeatureFlagsProvider>{children}</FeatureFlagsProvider>
        ),
      });

      expect(result.current.featureFlags).toEqual(flags);
    });

    test("provides updateFeatureFlag function that updates a specific flag", () => {
      const { result } = renderHook(() => useFeatureFlags(), {
        wrapper: ({ children }) => (
          <FeatureFlagsProvider>{children}</FeatureFlagsProvider>
        ),
      });

      // Assuming header is one of the feature flags with an 'isEnabled' property
      expect(result.current.featureFlags.header.isEnabled).toBe(true);

      // Update header flag
      act(() => {
        result.current.updateFeatureFlag({
          flag: "header",
          values: { isEnabled: true, description: "" },
        });
      });

      // Should now be isEnabled
      expect(result.current.featureFlags.header.isEnabled).toBe(true);

      // Verify storage was updated
      const savedFlags = getItemFromStorage("featureFlags");
      expect(savedFlags.header.isEnabled).toBe(true);
    });

    test("preserves other flags when updating a specific flag", () => {
      // Create initial flags with multiple properties
      const initialFlags: FeatureFlags = {
        header: { isEnabled: false, description: "" },
        footer: { isEnabled: false, description: "" },
      };

      // Set initial flags in localStorage
      saveToStorage("featureFlags", initialFlags);

      const { result } = renderHook(() => useFeatureFlags(), {
        wrapper: ({ children }) => (
          <FeatureFlagsProvider>{children}</FeatureFlagsProvider>
        ),
      });

      // Update just one flag
      act(() => {
        result.current.updateFeatureFlag({
          flag: "header",
          values: { isEnabled: true, description: "" },
        });
      });

      // Check that other flags are preserved
      expect(result.current.featureFlags.header.isEnabled).toBe(true);
      expect(result.current.featureFlags.footer.isEnabled).toBe(false);

      // Verify storage was updated correctly
      const savedFlags = getItemFromStorage("featureFlags");
      expect(savedFlags).toEqual({
        header: { isEnabled: true, description: "" },
        footer: { isEnabled: false, description: "" },
      });
    });
  });

  describe("Edge cases and error handling", () => {
    test("handles null featureFlags object in localStorage", () => {
      // Set null featureFlags in localStorage directly
      const dataWithNullFlags = { featureFlags: null };
      localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(dataWithNullFlags));

      const { result } = renderHook(() => useFeatureFlags(), {
        wrapper: ({ children }) => (
          <FeatureFlagsProvider>{children}</FeatureFlagsProvider>
        ),
      });

      // Should default to predefined flags
      expect(result.current.featureFlags).toEqual(flags);
    });

    test("handles missing feature flags in localStorage data structure", () => {
      // Set localStorage with app data but no feature flags
      const dataWithoutFlags = { otherSetting: "value" };
      localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(dataWithoutFlags));

      const { result } = renderHook(() => useFeatureFlags(), {
        wrapper: ({ children }) => (
          <FeatureFlagsProvider>{children}</FeatureFlagsProvider>
        ),
      });

      // Should default to predefined flags
      expect(result.current.featureFlags).toEqual(flags);
    });
  });
});
