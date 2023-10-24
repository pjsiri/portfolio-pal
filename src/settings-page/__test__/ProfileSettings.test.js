import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ProfileSettings from "../ProfileSettings";

jest.mock("../../common/darkmode/DarkModeContext", () => ({
  useDarkMode: () => ({ isDarkMode: false }),
}));
jest.mock("@react-navigation/native");
jest.mock("firebase/firestore");
jest.mock("firebase/auth", () => ({
  getAuth: () => ({ currentUser: "" }),
}));

const presetProfilePictures = [
  "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PP_1.jpg",
  "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PP_2.jpg",
  "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PP_3.jpg",
  "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PP_4.jpg",
  "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PP_5.jpg",
  "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PP_6.jpg",
  "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PP_7.jpg",
];

describe("ProfileSettings", () => {
  //   test("should open profile window when user profile is clicked", () => {
  //     const { getByTestId } = render(<ProfileSettings />);

  //     // Open user profile
  //     const profile = getByTestId("openProfile");
  //     fireEvent.press(profile);

  //     // After clicking on the profile, the profileWindow should be present
  //     const profileWindow = getByTestId("profileWindow");
  //     const profileWindowVisibility = profileWindow.props.visible;
  //     expect(profileWindowVisibility).toBe(true);
  //   });

  //   test("should update profileImageUri correctly when a profile image 'option 0' is selected", () => {
  //     const { getByTestId } = render(<ProfileSettings />);

  //     // Open user profile
  //     const profile = getByTestId("openProfile");
  //     fireEvent.press(profile);

  //     // Find and click the profile picture option
  //     const profilePictureOption = getByTestId("profilePictureOption-0");
  //     fireEvent.press(profilePictureOption);

  //     // Find the profile image and get the 'uri' attribute
  //     const profileImage = getByTestId("profileImage");
  //     const profileImageUri = profileImage.props.source.uri;

  //     // Check the value of profileImageUri
  //     expect(profileImageUri).toBe(presetProfilePictures[0]); // Adjust the expected URL
  //   });

  test("should update profileImageUri correctly when a profile image 'option 5' is selected", () => {
    const { getByTestId } = render(<ProfileSettings />);

    // Open user profile
    const profile = getByTestId("openProfile");
    fireEvent.press(profile);

    // Find and click the profile picture option
    const profilePictureOption = getByTestId("profilePictureOption-5");
    fireEvent.press(profilePictureOption);

    // Find the profile image and get the 'uri' attribute
    const profileImage = getByTestId("profileImage");
    const profileImageUri = profileImage.props.source.uri;

    // Check the value of profileImageUri
    expect(profileImageUri).toBe(presetProfilePictures[5]);
  });
});
