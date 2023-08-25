import * as React from "react";
import {
  Alert,
  TextInput,
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/auth";
import { Checkbox } from "react-native-paper";
import { clearAllData, isDiffJSON, mergeData } from "../utils";

const InputField = ({ label, value, onChange, keyboardType = "default" }) => (
  <View style={styles.inputFieldContainer}>
    <Text style={styles.inputFieldLabel}>{label}</Text>
    <TextInput
      style={styles.inputField}
      value={value}
      onChangeText={onChange}
      keyboardType={keyboardType}
    />
  </View>
);

const MyCheckBox = ({ label, value, onChange }) => (
  <View style={{ alignItems: "flex-start" }}>
    <Checkbox.Item
      style={{
        paddingHorizontal: 0,
        paddingVertical: 0,
        fontSize: 12,
      }}
      color="#495e57"
      status={value ? "checked" : "unchecked"}
      label={label}
      onPress={onChange}
      position="leading"
    />
  </View>
);

export default function ProfileScreen() {
  const { signOut } = useAuth();

  const [customerInfo, setCutomerInfo] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    telp: "",
  });
  const [emailPref, setEmailPref] = React.useState({
    orderStatus: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true,
  });

  const [defaultCustomerInfo, setDefaultCustomerInfo] =
    React.useState(customerInfo);
  const [defaultEmailPref, setDefaultEmailPref] = React.useState(emailPref);

  React.useEffect(() => {
    (async () => {
      try {
        const cusValue = await AsyncStorage.getItem("customerInfo");
        if (cusValue !== null) {
          const cusValueJSON = JSON.parse(cusValue);
          setCutomerInfo((prevState) => ({
            ...prevState,
            ...cusValueJSON,
          }));
          setDefaultCustomerInfo((prevState) => ({
            ...prevState,
            ...cusValueJSON,
          }));
        }
        const emailValue = await AsyncStorage.getItem("emailPref");
        if (emailValue !== null) {
          const emailValueJSON = JSON.parse(emailValue);
          setEmailPref((prevState) => ({
            ...prevState,
            ...emailValueJSON,
          }));
          setDefaultEmailPref((prevState) => ({
            ...prevState,
            ...emailValueJSON,
          }));
        }
      } catch (e) {
        console.error(e);
        Alert.alert("Reading Data Error", e.message);
      }
    })();
  }, []);

  const isDataChange =
    isDiffJSON(defaultCustomerInfo, customerInfo) ||
    isDiffJSON(defaultEmailPref, emailPref);

  const handleChangeCustomerInfo = (it, key) => {
    setCutomerInfo((prev) => ({
      ...prev,
      [key]: it,
    }));
  };

  const handleChangeEmailNotif = (key) => {
    setEmailPref((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const ConfirmDeleteData = () =>
    Alert.alert("Logging out...", "Remember my login info?", [
      {
        text: "Remove",
        onPress: () => clearAllData() && signOut(),
        style: "destructive",
      },
      { text: "Keep", onPress: () => signOut() },
    ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ padding: 8 }}>
        <Text style={styles.titleText}>Personal information</Text>
        <InputField
          label="First Name"
          value={customerInfo.firstName}
          onChange={(e) => handleChangeCustomerInfo(e, "firstName")}
        />
        <InputField
          label="Last Name"
          value={customerInfo.lastName}
          onChange={(e) => handleChangeCustomerInfo(e, "lastName")}
        />
        <InputField
          label="Email"
          value={customerInfo.email}
          onChange={(e) => handleChangeCustomerInfo(e, "email")}
        />
        <InputField
          label="Phone number"
          value={customerInfo.telp}
          onChange={(e) => handleChangeCustomerInfo(e, "telp")}
        />
        <View style={styles.emailNotifContainer}>
          <Text style={styles.titleText}>Email notifications</Text>
          <MyCheckBox
            label="Order statuses"
            value={emailPref.orderStatus}
            onChange={() => handleChangeEmailNotif("orderStatus")}
          />
          <MyCheckBox
            label="Password changes"
            value={emailPref.passwordChanges}
            onChange={() => handleChangeEmailNotif("passwordChanges")}
          />
          <MyCheckBox
            label="Special offers"
            value={emailPref.specialOffers}
            onChange={() => handleChangeEmailNotif("specialOffers")}
          />
          <MyCheckBox
            label="Newsletter"
            value={emailPref.newsletter}
            onChange={() => handleChangeEmailNotif("newsletter")}
          />
        </View>
        <Pressable
          style={styles.button}
          onPress={() => {
            ConfirmDeleteData();
          }}
        >
          <Text style={styles.buttonText}>Log out</Text>
        </Pressable>
        <View style={styles.buttonSmallContainer}>
          <Pressable
            disabled={!isDataChange}
            onPress={() => {
              setCutomerInfo((prevState) => ({
                ...prevState,
                ...defaultCustomerInfo,
              }));
              setEmailPref((prevState) => ({
                ...prevState,
                ...defaultEmailPref,
              }));
            }}
            style={[
              styles.buttonSmall,
              {
                backgroundColor: isDataChange ? "#495e57" : "#fff",
                borderColor: isDataChange ? "#495e57" : "#d3d3d3",
              },
            ]}
          >
            <Text
              style={[
                styles.buttonSmallText,
                {
                  color: isDataChange ? "#fff" : "#d3d3d3",
                },
              ]}
            >
              Discard changes
            </Text>
          </Pressable>
          <Pressable
            disabled={!isDataChange}
            onPress={() => {
              mergeData("customerInfo", customerInfo);
              mergeData("emailPref", emailPref);
            }}
            style={[
              styles.buttonSmall,
              {
                backgroundColor: isDataChange ? "#495e57" : "#fff",
                borderColor: isDataChange ? "#495e57" : "#d3d3d3",
              },
            ]}
          >
            <Text
              style={[
                styles.buttonSmallText,
                {
                  color: isDataChange ? "#fff" : "#d3d3d3",
                },
              ]}
            >
              Save changes
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  scrollableContainer: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 14,
  },
  titleText: {
    margin: 8,
    marginTop: 16,
    fontSize: 18,
    fontWeight: "700",
  },
  emailNotifContainer: {
    marginVertical: 8,
    gap: 4,
  },
  button: {
    alignSelf: "center",
    marginVertical: 16,
    width: 320,
    padding: 4,
    backgroundColor: "#f4ce14",
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#ffc200",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonSmallContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 8,
    paddingBottom: 16,
  },
  buttonSmall: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 2,
  },
  buttonSmallText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#d3d3d3",
  },
  inputFieldContainer: {
    margin: 8,
    gap: 4,
  },
  inputFieldLabel: {
    fontSize: 12,
  },
  inputField: {
    width: 320,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "grey",
  },
});
