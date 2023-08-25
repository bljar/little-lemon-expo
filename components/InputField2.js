import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const InputField2 = ({ label, value, onChange, keyboardType = "default" }) => (
  <View style={styles.container}>
    <Text style={styles.labelText}>{label}</Text>
    <TextInput
      style={styles.inputField}
      value={value}
      onChangeText={onChange}
      keyboardType={keyboardType}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
  },
  labelText: {
    fontSize: 24,
    padding: 12,
    // marginTop: 2,
    color: "#455868",
    // textAlign: "center",
  },
  inputField: {
    // height: 60,
    width: 320,
    borderWidth: 2,
    padding: 12,
    fontSize: 24,
    borderRadius: 12,
    borderColor: "#455868",
    color: "#455868",
  },
});

export default InputField2;
