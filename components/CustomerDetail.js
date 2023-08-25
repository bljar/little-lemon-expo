import React from "react";
import { Pressable, SafeAreaView, Text, View, StyleSheet } from "react-native";
import InputField from "./InputField";
import { mergeData } from "../utils";

const CustomerDetail = ({ customerInfo, setCutomerInfo, nextStep }) => {
  const isInputValid =
    customerInfo.firstName.length >= 1 && customerInfo.lastName.length >= 1;

  return (
    <SafeAreaView>
      <Text style={styles.titleText}>Let us get to know you</Text>
      <InputField
        label="First Name"
        value={customerInfo.firstName}
        onChange={(e) => setCutomerInfo(e, "firstName")}
      />
      <InputField
        label="Last Name"
        value={customerInfo.lastName}
        onChange={(e) => setCutomerInfo(e, "lastName")}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          disabled={!isInputValid}
          style={isInputValid ? styles.button : styles.buttonDisable}
          onPress={() => mergeData("customerInfo", customerInfo) && nextStep()}
        >
          <Text
            style={isInputValid ? styles.buttonText : styles.buttonTextDisable}
          >
            Next
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#CAD2D8",
  },
  titleText: {
    height: 100,
    fontSize: 30,
    color: "white",
    backgroundColor: "#495e57",
    textAlign: "center",
    textAlignVertical: "center",
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    marginTop: 24,
    backgroundColor: "#F1F5F6",
  },
  button: {
    fontSize: 22,
    marginHorizontal: 24,
    marginVertical: 50,
    paddingHorizontal: 40,
    paddingVertical: 8,
    backgroundColor: "#f4ce14",
    borderRadius: 12,
  },
  buttonDisable: {
    fontSize: 22,
    marginHorizontal: 24,
    marginVertical: 50,
    paddingHorizontal: 40,
    paddingVertical: 8,
    backgroundColor: "#DEE3E9",
    borderRadius: 12,
  },
  buttonText: {
    color: "#333333",
    textAlign: "center",
    fontSize: 24,
  },
  buttonTextDisable: {
    color: "#455868",
    textAlign: "center",
    fontSize: 24,
  },
});

export default CustomerDetail;
