import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, TextInput, TouchableOpacity, Alert, Image, TouchableWithoutFeedback } from "react-native";
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { useDarkMode } from '../common/darkmode/DarkModeContext'; 

const ChangePassword = () => {
    const [email, setEmail] = useState('');
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmNewPass, setConfirmNewPass] = useState('');
    const navigation = useNavigation();
    const { isDarkMode } = useDarkMode();
    const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] = useState(false);
    const [imageSource, setImageSource] = useState(
        "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/password_hidden.png"
    );
    const [imageSource2, setImageSource2] = useState(
        "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/password_hidden.png"
    );
    const [imageSource3, setImageSource3] = useState(
        "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/password_hidden.png"
    );

    // Define styles based on isDarkMode
    const styles = {
        container: {
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: isDarkMode ? "#333" : "white",
            color: isDarkMode ? "white" : "black",
        },
        backButtonContainer: {
            position: 'absolute',
            top: 80,
            left: 30,
        },
        detailsContainer: {
            height: "25%",
            width: "85%",
            justifyContent: "flex-start",
            marginTop: 110,
        },
        bottomContainer: {
            height: "80%",
            width: "85%",
            justifyContent: "flex-start",
            marginTop: 10,
        },
        title: {
            fontSize: 28,
            marginBottom: 20,
            fontWeight: "900",
            marginTop: 20,
            color: isDarkMode ? "white" : "black",
        },
        subtitle: {
            fontSize: 14,
            alignSelf: "flex-start",
            marginBottom: 25,
            color: isDarkMode ? "white" : "black",
        },
        passwordRequirements: {
            fontSize: 14,
            alignSelf: 'flex-start',
            color: isDarkMode ? "white" : "black",
        },
        inputContainer: {
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: 50,
            borderWidth: 1,
            paddingHorizontal: 10,
            borderRadius: 15,
            marginTop: 25,
            backgroundColor: isDarkMode ? "#444" : "white",
        },
        input: {
            flex: 1,
            color: isDarkMode ? "white" : "black",
        },
        saveButton: {
            width: "100%",
            height: 50,
            backgroundColor: "black",
            justifyContent: "center",
            borderRadius: 15,
            marginTop: 60,
        },
        saveButtonText: {
            color: "white",
            textAlign: "center",
            fontSize: 18,
        },
        forgotPasswordButtonContainer: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 5,
        },
        forgotPasswordText: {
            color: "black",
            textAlign: "right",
            fontSize: 14,
            fontWeight: "bold",
        },
        inputIcon: {
            width: 24,
            height: 24,
            marginRight: 8,
        },
    };

    const handleShowCurrentPassword = () => {
        // Toggle the visibility of the current password
        setIsCurrentPasswordVisible(!isCurrentPasswordVisible);

        // Toggle the image source
        setImageSource(isCurrentPasswordVisible
            ? "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/password_hidden.png"
            : "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/password_visible.png"
        );
    };

    const handleShowNewPassword = () => {
        // Toggle the visibility of the new password
        setIsNewPasswordVisible(!isNewPasswordVisible);

        // Toggle the image source
        setImageSource2(isNewPasswordVisible
            ? "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/password_hidden.png"
            : "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/password_visible.png"
        );
    };

    const handleShowConfirmNewPassword = () => {
        // Toggle the visibility of the confirmation new password
        setIsConfirmNewPasswordVisible(!isConfirmNewPasswordVisible);

        // Toggle the image source
        setImageSource3(isConfirmNewPasswordVisible
            ? "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/password_hidden.png"
            : "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/password_visible.png"
        );
    };

    const handleForgotPassword = () => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                navigation.goBack();
                Alert.alert('Password Reset Email Sent', 'A password reset email has been sent to your email address.');
            })
            .catch((error) => {
                Alert.alert('Password Reset Email Failed', error.message);
            });
    };

    const handleSave = async () => {
        if (currentPass === newPass) {
            Alert.alert('Save Failed', 'Current password and new password cannot be the same.');
            return;
        }
        if (currentPass && newPass && confirmNewPass) {
            if (newPass !== confirmNewPass) {
                Alert.alert('Save Failed', 'New password and confirm new password do not match.');
                return;
            }

            try {
                const auth = getAuth();
                const user = auth.currentUser;

                if (user) {
                    // Reauthenticate the user with their current password
                    const credential = EmailAuthProvider.credential(email, currentPass);
                    await reauthenticateWithCredential(user, credential);

                    // Change the password
                    await updatePassword(user, newPass);

                    Alert.alert('Password Updated', 'Your password has been updated successfully.');
                    navigation.goBack();
                } else {
                    Alert.alert('Save Failed', 'User not found.');
                }
            } catch (error) {
                if (error.code === 'auth/invalid-login-credentials') {
                    Alert.alert('Save Failed', 'Current password is incorrect. Please try again.');
                } else if (error.code === 'auth/too-many-requests') {
                    // Log out the user and navigate to the Login screen
                    navigation.navigate("Login")
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Login" }],
                    });
                    Alert.alert('Save Failed', error.message);
                }
            }
        } else {
            Alert.alert('Save Failed', 'Please provide valid information.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.backButtonContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={{
                            uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/back.png",
                        }}
                        style={[styles.inputIcon, { tintColor: isDarkMode ? 'white' : 'black' }]
                        }
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>Password Reset</Text>
                <Text style={styles.subtitle}>
                    <Text style={{ fontWeight: 'bold' }}>WARNING:</Text> Too many failed attempts will result in your account being temporarily disabled
                </Text>
                <Text style={styles.passwordRequirements}>
                    New password requirements:
                </Text>
                <Text style={styles.passwordRequirements}>
                    - Minimum of 6 characters.
                </Text>
                <Text style={styles.passwordRequirements}>
                    - Must differ from your current password.
                </Text>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Current Password"
                        onChangeText={(text) => setCurrentPass(text)}
                        value={currentPass}
                        secureTextEntry={!isCurrentPasswordVisible}
                        style={styles.input}
                        placeholderTextColor={isDarkMode ? "white" : "black"} 
                    />
                    <TouchableOpacity onPress={handleShowCurrentPassword}>
                        <Image
                            source={{ uri: imageSource }}
                            style={styles.inputIcon}
                            tintColor={isDarkMode ? 'white' : 'black'}
                        />
                    </TouchableOpacity>
                </View>
                 <View style={styles.forgotPasswordButtonContainer}>
                    <TouchableWithoutFeedback onPress={handleForgotPassword}>
                            <Text style={[styles.forgotPasswordText, { color: isDarkMode ? 'white' : 'black' }]}>
                            Forgot password?
                        </Text>
                    </TouchableWithoutFeedback>
                     </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="New Password"
                        onChangeText={(text) => setNewPass(text)}
                        value={newPass}
                        secureTextEntry={!isNewPasswordVisible}
                        style={styles.input}
                        placeholderTextColor={isDarkMode ? "white" : "black"} 
                    />
                    <TouchableOpacity onPress={handleShowNewPassword}>
                        <Image
                            source={{ uri: imageSource2 }}
                            style={styles.inputIcon}
                            tintColor={isDarkMode ? 'white' : 'black'}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Confirm New Password"
                        onChangeText={(text) => setConfirmNewPass(text)}
                        value={confirmNewPass}
                        secureTextEntry={!isConfirmNewPasswordVisible}
                        style={styles.input}
                        placeholderTextColor={isDarkMode ? "white" : "black"} 
                    />
                    <TouchableOpacity onPress={handleShowConfirmNewPassword}>
                        <Image
                            source={{ uri: imageSource3 }}
                            style={styles.inputIcon}
                            tintColor={isDarkMode ? 'white' : 'black'}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChangePassword;
