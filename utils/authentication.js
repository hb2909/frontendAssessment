import ReactNativeBiometrics from 'react-native-biometrics';
import * as LocalAuthentication from 'expo-local-authentication';

export const authenticateUser = async () => {
  try {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      console.error('Biometrics are not available on this device');
      return false;
    }

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      console.error('No biometrics enrolled on this device');
      return false;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with Biometrics',
      fallbackLabel: 'Use Passcode', 
    });

    if (result.success) {
      return true; 
    } else {
      console.error('Biometric authentication failed');
      return false; 
    }
  } catch (error) {
    console.error('Biometric authentication error', error);
    return false; 
  }
};
