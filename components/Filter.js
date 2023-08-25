import React from "react";
import {
  SafeAreaView,
  Pressable,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { useFonts, Karla_800ExtraBold } from "@expo-google-fonts/karla";

const Filters = ({ onChange, selections, sections }) => {
  let [fontsLoaded, fontError] = useFonts({
    Karla_800ExtraBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ORDER FOR DELIVERY!</Text>
      <FlatList
        horizontal={true}
        data={sections}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              onChange(index);
            }}
            style={[
              styles.button,
              {
                backgroundColor: selections[index] ? "#495e57" : "#d9d8d8",
              },
            ]}
          >
            <Text
              style={[
                styles.text,
                { color: selections[index] ? "#edefee" : "#495e57" },
              ]}
            >
              {item}
            </Text>
          </Pressable>
        )}
        keyExtractor={(item) => item}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    gap: 16,
    marginTop: 16,
    borderBottomColor: "#aeaeaf",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontFamily: "Karla_800ExtraBold",
    fontSize: 18,
  },
  filtersContainer: {
    flexDirection: "row",
    alignItems: "",
    justifyContent: "space-between",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 16,
    padding: 10,
    borderRadius: 16,
  },
  text: {
    fontFamily: "Karla_800ExtraBold",
    fontSize: 14,
  },
});

export default Filters;
