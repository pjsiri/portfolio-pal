import { Modal, Dimensions, TouchableWithoutFeedback, StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const deviceHeight = Dimensions.get("window").height;

export class Bottompopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            email: "",
        }
    }

    show = () => {
        this.setState({ show: true })
    }

    close = () => {
        this.setState({ show: false, email: "", errorMessage: "" }) // Clear email and error message when closing
    }

    renderOutsideTouchable(onTouch) {
        const view = <View style={{ flex: 1, width: '100%' }} />
        if (!onTouch) return view

        return (
            <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    renderTitle = () => {
        const { title } = this.props
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={{
                    color: '#182E44',
                    fontSize: 25,
                    fontWeight: '500',
                    marginTop: 15,
                    marginBottom: 20,
                    fontWeight: 900,
                }}>
                    {title}
                </Text>
            </View>
        )
    }

    handleSendVerificationCode = async () => {
        const { email } = this.state;

        if (!email) {
            this.setState({ errorMessage: "Please enter your email." });
            return;
        }

        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);

            // Password reset email sent successfully
            this.setState({ errorMessage: "" }); // Clear any previous error message
            Alert.alert('Success', 'A password reset email has been sent to your email address');
            this.close();
        } catch (error) {
            // Handle any errors that occur during sending the reset email
            this.setState({ errorMessage: error.message });
        }
    };

    renderContent = () => {
        const { email, errorMessage } = this.state;
        return (
            <View>
                <TextInput
                    style={{ height: 50, borderWidth: 1, paddingHorizontal: 10, borderRadius: 10, marginBottom: 20 }}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={(text) => this.setState({ email: text })}
                />
                {errorMessage ? (
                    <Text style={{ color: 'red' }}>{errorMessage}</Text>
                ) : null}
                <TouchableOpacity
                    style={{ height: 50, backgroundColor: 'black', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                    onPress={this.handleSendVerificationCode}
                >
                    <Text style={{ color: 'white', fontSize: 14 }}>Send Verification Code</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        let { show } = this.state
        const { onTouchOutside, title } = this.props

        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={show}
                onRequestClose={this.close}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: '#000000AA',
                    justifyContent: 'flex-end'
                }}>
                    {this.renderOutsideTouchable(onTouchOutside)}
                    <View style={{
                        backgroundColor: 'white',
                        width: '100%',
                        height: '30%',
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        paddingHorizontal: 10,
                        maxHeight: deviceHeight * 0.4,
                    }}>

                        {this.renderTitle()}
                        {this.renderContent()}

                    </View>
                </View>
            </Modal>
        )
    }

}
