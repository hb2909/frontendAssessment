import React, { useState } from 'react';
import { 
    View, 
    Text, 
    ImageBackground, 
    StyleSheet, 
    TouchableOpacity, 
    Alert,
    TextInput 
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleBiometricLogin = async () => {
        try {
            // Check if biometric authentication is available
            const compatible = await LocalAuthentication.hasHardwareAsync();
            if (!compatible) {
                Alert.alert('Biometric Login Unavailable', 'Your device does not support biometric authentication.');
                return;
            }

            // Check if any biometrics are enrolled (e.g., FaceID, Fingerprint)
            const enrolled = await LocalAuthentication.isEnrolledAsync();
            if (!enrolled) {
                Alert.alert('No Biometrics Enrolled', 'Please enroll biometrics in your device settings.');
                return;
            }

            // Request biometric authentication
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Authenticate with Biometrics',
                fallbackLabel: 'Use Passcode', // Optional, for fallback to passcode
            });

            if (result.success) {
                Alert.alert('Authentication Successful', 'Welcome back!');
                navigation.navigate('TransactionHistory');
            } else {
                Alert.alert('Authentication Failed', 'Please try again.');
            }
        } catch (error) {
            console.error('Biometric authentication error:', error);
            Alert.alert('Error', 'An error occurred during biometric authentication.');
        }
    };

    const handleLogin = () => {
        if (username.trim() === '' || password.trim() === '') {
            Alert.alert('Error', 'Please enter both username and password.');
            return;
        }

        navigation.navigate('TransactionHistory');
    };

    return (
        <ImageBackground 
            source={require('../assets/image.png')} 
            style={styles.backgroundImage}
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>Transaction</Text>

                <View style={styles.spacer} />

                <View style={styles.floatingContainer}>
                    <Text style={styles.subtitle}>Log In</Text>
                    <Text style={styles.desc}>Username</Text>

                    <View style={styles.searchBar}>
                        <TextInput 
                            style={[styles.search, { textAlign: 'center' }]}
                            placeholder="Enter your username" 
                            placeholderTextColor="#FFFFFF"
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>
                    <Text style={styles.desc1}>Password</Text>

                    <View style={styles.searchBar}>
                        <TextInput 
                            style={[styles.search, { textAlign: 'center' }]}
                            placeholder="Enter your password" 
                            placeholderTextColor="#FFFFFF"
                            secureTextEntry 
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <View style={styles.buttonContainerWrapper}>
                        <TouchableOpacity
                            style={styles.signupButton}
                            onPress={handleLogin} 
                        >
                            <Text style={styles.signupText}>Log In</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainerWrapper1}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={handleBiometricLogin} 
                        >
                            <Text style={styles.buttonText}>Login with Biometrics</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        alignItems: 'center',
        padding: 25,
        justifyContent: 'space-between', 
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FA7B7B',
        marginBottom: 20,
        textAlign: 'center',
        paddingTop: 30,
    },
    spacer: {
        flex: 1, 
    },
    floatingContainer: {
        backgroundColor: '#00000080', 
        borderRadius: 20,
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
        marginHorizontal: 5, 
        marginBottom: 20,
        height: 450,
        alignItems: 'center', 
    },
    subtitle: {
        fontSize: 19,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold', 
    },
    desc: {
        fontSize: 15,
        color: '#FFF',
        paddingTop: 30,
        marginBottom: 0, 
        textAlign: 'center',
    },
    desc1: {
        fontSize: 15,
        color: '#FFF',
        paddingTop: 5,
        marginBottom: 0, 
        textAlign: 'center',
    },
    buttonContainerWrapper: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '95%', 
        marginTop: 30, 
    },
    buttonContainerWrapper1: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '95%', 
        marginTop: 10, 
    },
    buttonContainer: {
        backgroundColor: '#F3AAAA', 
        paddingVertical: 13,
        paddingHorizontal: 30,
        borderRadius: 10,
        flex: 1, 
    },
    buttonText: {
        color: '#000', 
        fontWeight: 'bold', 
        fontSize: 15,
        textAlign: 'center', 
    },
    signupButton: {
        backgroundColor: '#F3AAAA', 
        paddingVertical: 13,
        paddingHorizontal: 30,
        borderRadius: 10,
        flex: 1, 
    },
    signupText: {
        color: '#000', 
        fontWeight: 'bold', 
        fontSize: 15,
        textAlign: 'center',
    },
    searchBar: {
        padding: 10,
    },
    search: {
        height: 50,
        width: 250,
        backgroundColor: '#FFFFFF80',
        borderRadius: 10,
        paddingHorizontal: 20,
    },
});

export default LoginScreen;

