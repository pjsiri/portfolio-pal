import React from "react";
import { render, act } from "@testing-library/react-native";
import { DarkModeProvider, useDarkMode } from "../DarkModeContext";

describe("DarkModeContext", () => {
  // test("provides dark mode context values", () => {
  //   let darkModeContextValue;

  //   // Component that consumes the dark mode context using useDarkMode hook
  //   const ConsumerComponent = () => {
  //     darkModeContextValue = useDarkMode();
  //     return null;
  //   };

  //   // Render the DarkModeProvider and ConsumerComponent
  //   render(
  //     <DarkModeProvider>
  //       <ConsumerComponent />
  //     </DarkModeProvider>
  //   );

  //   // Check if dark mode context value is defined
  //   expect(darkModeContextValue).toBeDefined();
  // });

  // test("check if the initial value of isDarkMode is false", () => {
  //   let darkModeContextValue;

  //   // Component that consumes the dark mode context using useDarkMode hook
  //   const ConsumerComponent = () => {
  //     darkModeContextValue = useDarkMode();
  //     return null;
  //   };

  //   // Render the DarkModeProvider and ConsumerComponent
  //   render(
  //     <DarkModeProvider>
  //       <ConsumerComponent />
  //     </DarkModeProvider>
  //   );

  //   expect(darkModeContextValue.isDarkMode).toBe(false);
  // });

  test("check if isDarkMode has changed to true after toggling", () => {
    let darkModeContextValue;

    // Component that consumes the dark mode context using useDarkMode hook
    const ConsumerComponent = () => {
      darkModeContextValue = useDarkMode();
      return null;
    };

    // Render the DarkModeProvider and ConsumerComponent
    render(
      <DarkModeProvider>
        <ConsumerComponent />
      </DarkModeProvider>
    );

    // Toggle dark mode using act to trigger a state update
    act(() => {
      darkModeContextValue.toggleDarkMode();
    });

    expect(darkModeContextValue.isDarkMode).toBe(true);
  });
});
