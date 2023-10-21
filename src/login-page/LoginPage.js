import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Bottompopup } from "./BottomPopup";

const LoginScreen = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [imageSource, setImageSource] = useState(
    "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/password_hidden.png"
  );

  let popupRef = React.createRef()

  const onShowPopup = () => {
    popupRef.show()
  }

  const onClosePopup = () => {
    popupRef.close()
  }

  const handleLogin = async () => {
    if (user && pass) {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, user, pass);

        navigation.navigate('HomeStack');
      } catch (error) {
        Alert.alert("Login Failed", error.message);
      }
    } else {
      Alert.alert("Login Failed", "Please provide valid username and password.");
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

  return (
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PortfolioPal_banner.png",
          }}
          style={[styles.bannerImage, { marginTop: 50 }]}
        />
        <Text style={[styles.title, { fontSize: 28, fontWeight: "900" }]}>Glad to have you back!</Text>
        <Text style={[styles.subtitle, { fontSize: 16, opacity: 0.65 }]}>Fill in with your username and password.</Text>
        <View style={styles.inputContainer}>
          <Image
            source={{
              uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/email.png",
            }}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Email"
            onChangeText={(text) => setUser(text)}
            value={user}
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
        <View style={styles.loginButtonContainer}>
          {/* Use TouchableOpacity for custom button styling */}
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.forgotPasswordButtonContainer}>
          <TouchableWithoutFeedback onPress={onShowPopup}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableWithoutFeedback>
          <Bottompopup
            title="Forgot Password?"
            ref={(target) => (popupRef = target)}
            onTouchOutside={onClosePopup}
          />
        </View>
        <View style={styles.signUpTextContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.signUpLink}>Sign up</Text>
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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 330,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  input: {
    flex: 1,
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  bannerImage: {
    width: 400,
    height: 200,
    resizeMode: "contain",
  },
  loginButtonContainer: {
    width: 330,
    height: 50,
    marginTop: 20,
    marginBottom: 15,
  },
  loginButton: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    justifyContent: "center",
    borderRadius: 10,
  },
  loginButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  forgotPasswordButtonContainer: {
    width: 330,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  forgotPasswordText: {
    color: "black",
    textAlign: "right",
    fontSize: 14,
    fontWeight: "bold",
  },
  signUpTextContainer: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    marginTop: "77%",
  },
  signUpText: {
    fontSize: 16,
  },
  signUpLink: {
    color: "black",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
};

export default LoginScreen;