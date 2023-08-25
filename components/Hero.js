import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import {
  useFonts,
  MarkaziText_400Regular,
  MarkaziText_500Medium,
} from "@expo-google-fonts/markazi-text";
import { Karla_400Regular } from "@expo-google-fonts/karla";
import * as SplashScreen from "expo-splash-screen";
import SearchField from "./SearchField";

SplashScreen.preventAutoHideAsync();

const HeroSection = ({ searchInput, onChange }) => {
  const [fontsLoaded, fontError] = useFonts({
    MarkaziText_400Regular,
    MarkaziText_500Medium,
    Karla_400Regular,
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.title}>Little Lemon</Text>
      <View style={styles.column}>
        <View style={styles.textArea}>
          <Text style={styles.subtitle}>Chicago</Text>
          <Text style={styles.description}>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </Text>
        </View>
        <Image
          source={require("../assets/hero_image.webp")}
          style={styles.image}
        />
      </View>
      <SearchField value={searchInput} onChange={onChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#495e57",
  },
  title: {
    fontFamily: "MarkaziText_500Medium",
    fontSize: 56,
    height: 50,
    color: "#f4ce14",
    lineHeight: 56,
    textAlignVertical: "center",
  },
  column: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 12,
  },
  textArea: {
    flex: 0.7,
    justifyContent: "space-between",
    gap: 8,
  },
  subtitle: {
    fontFamily: "MarkaziText_400Regular",
    fontSize: 40,
    color: "#edefee",
    lineHeight: 40,
    textAlignVertical: "center",
  },
  description: {
    fontFamily: "Karla_400Regular",
    fontSize: 16,
    color: "#edefee",
  },
  image: {
    flex: 0.3,
    alignSelf: "flex-end",
    padding: 16,
    resizeMode: "cover",
    aspectRatio: "1/1",
    borderRadius: 16,
  },
  buttonSearch: {
    flexDirection: "row",
    marginTop: 24,
    marginBottom: 12,
    padding: 8,
    gap: 8,
    backgroundColor: "#d3d3d3",
    borderRadius: 16,
  },
  searchBar: {
    margin: 12,
    color: "#333333",
  },
});

export default HeroSection;
