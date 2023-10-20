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
    if (email && pass && pass === confirmPass && username.length >= 3) {
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

  const handleBack = () => {
    navigation.goBack();
  };

  const styles = {
    container: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    title: {
      fontSize: 24,
      marginBottom: 15,
    },
    subtitle: {
      fontSize: 18,
      marginBottom: 40,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: 330,
      height: 50,
      borderColor: "gray",
      borderWidth: 1,
      paddingHorizontal: 10,
      borderRadius: 10,
      marginBottom: 20,
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
    },
    registerButtonContainer: {
      width: 330,
      height: 50,
      marginTop: 30,
    },
    registerButton: {
      width: "100%",
      height: "100%",
      backgroundColor: "black",
      justifyContent: "center",
      borderRadius: 10,
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

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={handleBack}>
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
        style={[styles.appLogo, { marginTop: 120 }]}
      />
      <Text style={[styles.title, { fontSize: 28, fontWeight: "900" }]}>Welcome to PortfolioPal!</Text>
      <Text style={[styles.subtitle, { fontSize: 15, opacity: 0.65 }]}>Fill in with your username, email, and password.</Text>
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
          placeholder="Username"
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
      <View style={styles.registerButtonContainer}>
        {/* Use TouchableOpacity for custom button styling */}
        <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
