import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TransactionDetail = ({ route, navigation }) => {
    const { transaction } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.title}>Transaction Details</Text>
            
              <Text style={styles.detailText}>
                  <Text style={styles.label}>Amount:</Text> {transaction.amount}
              </Text>
              <Text style={styles.detailText}>
                  <Text style={styles.label}>Date:</Text> {transaction.date}
              </Text>
              <Text style={styles.detailText}>
                  <Text style={styles.label}>Description:</Text> {transaction.description}
              </Text>
              <Text style={styles.detailText}>
                  <Text style={styles.label}>Type:</Text> {transaction.type}
              </Text>


            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.buttonText}>Back to Transactions</Text>
              </TouchableOpacity>
                
            </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f7f7f7',
    },
    title: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
      paddingBottom: 20,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 15,
      padding: 20,
      width: '90%',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 3 },
      elevation: 5,
      marginBottom: 20,
    },
    detailText: {
      paddingLeft: 20,
      fontSize: 16,
      marginBottom: 10,
      color: '#555',
    },
    label: {
      fontWeight: 'bold',
      color: '#333',
    },
    buttonContainer: {
      padding: 20,
      alignItems: 'center',
    },
    backButton: {
      backgroundColor: '#F3AAAA',
      paddingVertical: 13,
      paddingHorizontal: 30,
      borderRadius: 10,
    },
    buttonText: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 15,
      textAlign: 'center',
    },
});

export default TransactionDetail;
