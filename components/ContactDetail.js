import React from "react";
import { Pressable, SafeAreaView, Text, View, StyleSheet } from "react-native";
import { ProgressBar } from "react-native-paper";
import { validateEmail } from "../utils";
import InputField from "./InputField";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/auth";

const ContactDetail = ({ prevStep }) => {
  const { signIn } = useAuth();

  const [customerInfo, setCutomerInfo] = React.useState({
    email: "",
    telp: "",
  });

  React.useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem("customerInfo");
        if (value !== null) {
          jsonValue = JSON.parse(value);
          setCutomerInfo((prevState) => ({
            ...prevState,
            email: jsonValue.email ? jsonValue.email : "",
            telp: jsonValue.telp ? jsonValue.telp : "",
          }));
        }
      } catch (e) {
        console.error(e);
        Alert.alert("Reading Data Error", e.message);
      }
    })();
  }, []);

  const isValid = () => validateEmail(customerInfo.email);

  return (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Profile Completion: 50%</Text>
        <ProgressBar
          style={styles.progressBar}
          progress={0.5}
          color={"#f4ce14"}
        />
      </View>
      <InputField
        label="Email"
        value={customerInfo.email}
        onChange={(e) =>
          setCutomerInfo((prev) => ({
            ...prev,
            email: e,
          }))
        }
        keyboardType="email-address"
      />
      <InputField
        label="Telephone"
        value={customerInfo.telp}
        onChange={(e) =>
          setCutomerInfo((prev) => ({
            ...prev,
            telp: e,
          }))
        }
        keyboardType="number-pad"
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            (async () => {
              try {
                await AsyncStorage.mergeItem(
                  "customerInfo",
                  JSON.stringify(customerInfo)
                );
              } catch (e) {
                console.error(e);
                Alert.alert("Merge Data Error", e.message);
              } finally {
                prevStep();
              }
            })();
          }}
        >
          <Text style={styles.buttonText}>Prev</Text>
        </Pressable>
        <Pressable
          disabled={!isValid()}
          style={isValid() ? styles.button : styles.buttonDisable}
          onPress={() => {
            (async () => {
              try {
                await AsyncStorage.mergeItem(
                  "customerInfo",
                  JSON.stringify(customerInfo)
                );
              } catch (e) {
                console.error(e);
                Alert.alert("Merge Data Error", e.message);
              } finally {
                signIn();
              }
            })();
          }}
        >
          <Text style={isValid ? styles.buttonText : styles.buttonTextDisable}>
            Done
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
  titleContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    padding: 12,
    backgroundColor: "#495e57",
  },
  titleText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
  progressBar: {
    height: 24,
    width: 256,
    margin: 12,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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

export default ContactDetail;
