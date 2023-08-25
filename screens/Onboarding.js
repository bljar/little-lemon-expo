import React from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import CustomerDetail from "../components/CustomerDetail";
import ContactDetail from "../components/ContactDetail";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function OnboardingScreen() {
  const [step, setStep] = React.useState(1);
  const [userData, setUserData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  React.useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem("customerInfo");
        if (value !== null) {
          const jsonValue = JSON.parse(value);
          setUserData((prevData) => ({
            ...prevData,
            ...jsonValue,
          }));
        }
      } catch (e) {
        console.error(e);
        Alert.alert("Error", e.message);
      } finally {
        SplashScreen.hideAsync();
      }
    })();
  }, []);

  const handleChangeUserData = (it, key) => {
    setUserData((prevData) => ({
      ...prevData,
      [key]: it,
    }));
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
        {step == 1 ? (
          <CustomerDetail
            customerInfo={userData}
            setCutomerInfo={handleChangeUserData}
            nextStep={() => setStep(2)}
          />
        ) : (
          <ContactDetail
            customerInfo={userData}
            setCutomerInfo={handleChangeUserData}
            prevStep={() => setStep(1)}
          />
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
