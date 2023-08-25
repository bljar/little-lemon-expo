import React from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { useAuth } from "../context/auth";
import CustomerDetail from "../components/CustomerDetail";
import ContactDetail from "../components/ContactDetail";
import { getData } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OnboardingScreen() {
  const [step, setStep] = React.useState(1);

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
        {step == 1 ? (
          <CustomerDetail nextStep={() => setStep(2)} />
        ) : (
          <ContactDetail prevStep={() => setStep(1)} />
        )}
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
});
