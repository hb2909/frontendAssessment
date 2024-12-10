import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    StyleSheet, 
    TouchableOpacity, 
    Alert, 
    RefreshControl 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import transactionsData from '../data/transactions';

const TransactionHistory = () => {
    const navigation = useNavigation(); 
    const [transactions, setTransactions] = useState(transactionsData);
    const [refreshing, setRefreshing] = useState(false);
    const [revealedAmountIds, setRevealedAmountIds] = useState([]);

    const handleTransactionPress = (transaction) => {
      navigation.navigate('TransactionDetail', { transaction });
    };

    const toggleAmountVisibility = async (transactionId) => {
        const isVisible = revealedAmountIds.includes(transactionId);

        if (isVisible) {
            setRevealedAmountIds((prev) => prev.filter((id) => id !== transactionId));
        } else {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            if (!compatible) {
                Alert.alert('Biometric Login Unavailable', 'Your device does not support biometric authentication.');
                return;
            }

            const enrolled = await LocalAuthentication.isEnrolledAsync();
            if (!enrolled) {
                Alert.alert('No Biometrics Enrolled', 'Please enroll biometrics in your device settings.');
                return;
            }

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Authenticate with Biometrics',
                fallbackLabel: 'Use Passcode',
            });

            if (result.success) {
                setRevealedAmountIds((prev) => [...prev, transactionId]);
            } else {
                Alert.alert('Authentication Failed', 'Please try again.');
            }
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        setTimeout(() => {
            setTransactions([
                ...transactionsData,
                { id: 4, amount: "$300.00", date: "2024-12-05", description: "Subscription", type: "Debit" }
            ]);
            setRefreshing(false);
        }, 1500);
    };

    const renderItem = ({ item }) => {
        const isAmountVisible = revealedAmountIds.includes(item.id);
        return (
            <View style={styles.transactionItem}>
                <Text style={styles.transactionText}>Date: {item.date}</Text>
                <Text style={styles.transactionText}>Description: {item.description}</Text>
                <Text style={styles.transactionText}>Type: {item.type}</Text>
                <View style={styles.amountContainer}>
                    <Text style={styles.transactionText}>
                        Amount: {isAmountVisible ? item.amount : '****'}
                    </Text>
                    <TouchableOpacity onPress={() => toggleAmountVisibility(item.id)}>
                        <Icon
                            name={isAmountVisible ? 'eye-off' : 'eye'}
                            size={24}
                            color="gray"
                            style={styles.eyeIcon}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.historyButton} onPress={() => handleTransactionPress(item)}>
                    <Text style={styles.historyButtonText}>View More Details</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recent Transactions</Text>
            <FlatList
                data={transactions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#f7f7f7',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    transactionItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
    },
    transactionText: {
        fontSize: 16,
        marginBottom: 5,
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    eyeIcon: {
        marginLeft: 10,
    },
    historyButton: {
      backgroundColor: '#F3AAAA',
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginTop: 10,
      alignSelf: 'flex-start',
    },
    historyButtonText: {
      fontSize: 14,
      color: '#000',
      fontWeight: 'bold',
    },
});

export default TransactionHistory;
