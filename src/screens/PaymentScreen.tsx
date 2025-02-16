import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { API_BASE_URL } from "../config";

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookId, userId, price, paymentMethod } = route.params;

  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState(null);

  useEffect(() => {
    if (transactionId) {
      confirmPayment(transactionId);
    }
  }, [transactionId]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/payments/initiate`, {
        userId,
        bookId,
        amount: price,
        paymentMethod,
      });
      if (response.data.success) {
        setTransactionId(response.data.transactionId);
        Alert.alert("Payment Initiated", "Follow the instructions to complete the payment.");
      } else {
        Alert.alert("Payment Failed", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const confirmPayment = async (transactionId) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/payments/confirm`, {
        transactionId,
      });
      if (response.data.success) {
        Alert.alert("Payment Successful", "Your subscription is now active.", [
          { text: "OK", onPress: () => navigation.navigate("Library") },
        ]);
      } else {
        Alert.alert("Payment Not Completed", "Please complete your payment and try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to confirm payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Confirm Payment
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Amount: ${price}</Text>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>Method: {paymentMethod}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: "#007bff",
            padding: 10,
            borderRadius: 5,
          }}
          onPress={handlePayment}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Proceed with Payment</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PaymentScreen;
