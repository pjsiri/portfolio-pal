import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const ChangePassword = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [currentPass, setPass] = useState('');
    const [confirmNewPass, setConfirmPass] = useState('');
    const navigation = useNavigation();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [imageSource, setImageSource] = useState(
        "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/password_hidden.png"
    );
    const [imageSource2, setImageSource2] = useState(
        "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/password_hidden.png"
    );

    const handleRegister = async () => {
        if (currentPass && confirmNewPass) {
            if (currentPass !== confirmNewPass) {
                Alert.alert('Registration Failed', 'Password and confirmation password do not match.');
                return;
            }

            try {
                const auth = getAuth();
                await createUserWithEmailAndPassword(auth, email, currentPass);

                const user = auth.currentUser;
                await updateProfile(user, { displayName: username });

                Alert.alert('Registration Successful', 'You have successfully registered!');
                navigation.navigate('Login');
            } catch (error) {
                Alert.alert('Registration Failed', error.message);
            }
        } else {

            Alert.alert('Registration Failed', 'Please provide valid information.');
        }
    };

    const handleShowPassword = () => {
        // Toggle the visibility of the password
        setIsPasswordVisible(!isPasswordVisible);

        // Toggle the image source
        if (!isPasswordVisible) {
            setImageSource("https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/password_visible.png");
        } else {
            setImageSource(
                "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/password_hidden.png"
            );
        }
    };

    const handleShowConfirmPassword = () => {
        // Toggle the visibility of the password
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

        // Toggle the image source
        if (!isConfirmPasswordVisible) {
            setImageSource2(
                "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/password_visible.png"
            );
        } else {
            setImageSource2(
                "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/password_hidden.png"
            );
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
                        style={styles.inputIcon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={[styles.title]}>Welcome to PortfolioPal!</Text>
                <Text style={styles.subtitle}>
                    Fill in with your email, username, and password
                </Text>
                <Text style={styles.passwordRequirements}>
                    Password must:
                </Text>
                <Text style={styles.passwordRequirements}>
                    - Be at least 6 characters.
                </Text>
                <Text style={styles.passwordRequirements}>
                    - Match in both fields.
                </Text>
                <View style={styles.inputContainer}>
                    <Image
                        source={{
                            uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/email.png",
                        }}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        placeholder="Email"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image
                        source={{
                            uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/user.png",
                        }}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        placeholder="Username (At least 3 characters)"
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image
                        source={{
                            uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/password.png",
                        }}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        placeholder="Password"
                        onChangeText={(text) => setPass(text)}
                        value={currentPass}
                        secureTextEntry={!isPasswordVisible}
                        style={styles.input}
                    />
                    <TouchableOpacity onPress={handleShowPassword}>
                        <Image
                            source={{ uri: imageSource }}
                            style={styles.inputIcon}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Image
                        source={{
                            uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/password.png",
                        }}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        placeholder="Confirm Password"
                        onChangeText={(text) => setConfirmPass(text)}
                        value={confirmNewPass}
                        secureTextEntry={!isConfirmPasswordVisible}
                        style={styles.input}
                    />
                    <TouchableOpacity onPress={handleShowConfirmPassword}>
                        <Image
                            source={{ uri: imageSource2 }}
                            style={styles.inputIcon}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    detailsContainer: {
        height: "80%",
        width: "85%",
        justifyContent: "flex-start",
        marginTop: 110,
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        fontWeight: "900",
    },
    subtitle: {
        fontSize: 14,
        alignSelf: "flex-start",
        marginBottom: 5,
    },
    passwordRequirements: {
        fontSize: 14,
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 15,
        marginTop: 25,
    },
    input: {
        flex: 1,
    },
    inputIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    registerButton: {
        width: "100%",
        height: 50,
        backgroundColor: "black",
        justifyContent: "center",
        borderRadius: 15,
        marginTop: 60,
    },
    registerButtonText: {
        color: "white",
        textAlign: "center",
        fontSize: 18,
    },
    backButtonContainer: {
        position: 'absolute',
        top: 80,
        left: 20,
    },
    backButton: {
        width: 30,
        height: 30,
    },
};

export default ChangePassword;
