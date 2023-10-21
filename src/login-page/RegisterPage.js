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

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
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
    if (email && pass && confirmPass && username && username.length >= 3) {
      if (pass !== confirmPass) {
        Alert.alert('Registration Failed', 'Password and confirmation password do not match.');
        return;
      }

      // Check if the username contains only letters and numbers
      const usernameRegex = /^[A-Za-z0-9]+$/;
      if (!usernameRegex.test(username)) {
        Alert.alert('Registration Failed', 'Username can only contain letters and numbers.');
        return;
      }

      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, pass);

        const user = auth.currentUser;
        await updateProfile(user, { displayName: username });

        Alert.alert('Registration Successful', 'You have successfully registered!');
        navigation.navigate('Login');
      } catch (error) {
        Alert.alert('Registration Failed', error.message);
      }
    } else {
      if (username && username.length < 3) {
        Alert.alert('Registration Failed', 'Username must be at least 3 characters long.');
      } else {
        Alert.alert('Registration Failed', 'Please provide valid information.');
      }
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
      <Image
        source={{
          uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/app_logo.png",
        }}
        style={[styles.appLogo]}
      />
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
            value={pass}
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
            value={confirmPass}
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
          <Text style={styles.registerButtonText}>Register</Text>
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
    height: "70%",
    width: "85%",
    alignItems: "center",
    justifyContent: "flex-start",
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
  appLogo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    alignItems: "flex-start",
    marginBottom: 20,
    marginTop: 40,
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

export default RegisterScreen;
