import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import { Image } from 'react-native';

const ForgotPassword = () => {
    const [Email, setEmail] = useState('');
    const [VCode, setVCode] = useState('');
    const [Pass, setPass] = useState('');
    const [ConfirmPass, setConfirmPass] = useState('');

    const handleChangePassword = () => {
        if (Pass == ConfirmPass) {
            Alert.alert('Success', 'You have Successfully changed your password!')
        }
        else {
            Alert.alert('Invalid', 'Your Passwords do not Match!', 'Try Again!')
        }
    }

    return (
        <View>
            <Image
                source={{ uri: 'https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PortfolioPal_banner.png' }}
                style={styles.bannerImage}
            />

            <Text> Fill the form please to reset your password! </Text>
            <TextInput
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={Email}
                style={styles.input}
            />
            <TextInput
                placeholder="Verification Code"
                onChangeText={text => setVCode(text)}
                value={VCode}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                onChangeText={text => setPass(text)}
                value={Pass}
                style={styles.input}
            />
            <TextInput
                placeholder="Confirm Password"
                onChangeText={text => setConfirmPass(text)}
                value={ConfirmPass}
                style={styles.input}
            />

            <Button title="Change Password" onPress={handleChangePassword} />
        </View>
    );
}

const styles = {
    input: {
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    bannerImage: {
        width: 300, // Adjust the width as needed
        height: 150, // Adjust the height as needed
        resizeMode: 'contain', // Adjust the resizeMode as needed
        marginBottom: 20, // Add some spacing between the image and the other content
    },
};

export default ForgotPage;



