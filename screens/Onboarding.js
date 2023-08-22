import React from "react";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { validateEmail } from "../utils";
import { useAuth } from "../context/auth";

export default function OnboardingScreen() {
  const { signIn } = useAuth();

  const [firstName, onChangeFirstName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error(e);
      Alert.alert("Error", e.message);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require("../assets/logo_title.webp")}
            style={{ height: 50, width: 194, padding: 16 }}
          />
        </View>
        <Text style={styles.titleText}>Let us get to know you</Text>
        <Text style={styles.labelText}>First Name</Text>
        <TextInput
          style={styles.inputField}
          value={firstName}
          onChangeText={onChangeFirstName}
          keyboardType="default"
        />
        <Text style={styles.labelText}>Email</Text>
        <TextInput
          style={styles.inputField}
          value={email}
          onChangeText={onChangeEmail}
          keyboardType="email-address"
        />
        <View style={styles.buttonContainer}>
          <Pressable
            disabled={firstName.length < 3 && !validateEmail(email)}
            style={styles.button}
            onPress={() => {
              const data = {
                firstName: firstName,
                email: email,
              };
              console.log(data);
              storeData("customerInfo", data);
              signIn();
            }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#CAD2D8",
  },
  headerContainer: {
    backgroundColor: "#DEE3E9",
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    marginTop: 24,
    backgroundColor: "#F1F5F6",
  },
  headerText: {
    padding: 20,
    fontSize: 30,
    color: "#495e57",
    textAlign: "center",
  },
  titleText: {
    padding: 40,
    fontSize: 24,
    color: "#455868",
    textAlign: "center",
  },
  labelText: {
    fontSize: 24,
    padding: 12,
    // marginTop: 2,
    color: "#455868",
    textAlign: "center",
  },
  inputField: {
    alignSelf: "center",
    height: 60,
    width: 320,
    borderWidth: 2,
    padding: 10,
    fontSize: 24,
    borderRadius: 12,
    borderColor: "#455868",
    color: "#455868",
  },
  button: {
    fontSize: 22,
    marginHorizontal: 24,
    marginVertical: 50,
    paddingHorizontal: 40,
    paddingVertical: 8,
    backgroundColor: "#DEE3E9",
    borderRadius: 12,
  },
  buttonText: {
    color: "#455868",
    textAlign: "center",
    fontSize: 24,
  },
});
