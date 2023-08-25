import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import {
  useFonts,
  Karla_400Regular,
  Karla_500Medium,
  Karla_700Bold,
} from "@expo-google-fonts/karla";

const Dish = ({ item }) => {
  let [fontsLoaded, fontError] = useFonts({
    Karla_400Regular,
    Karla_500Medium,
    Karla_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.dishInfoContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <Image style={styles.image} source={{ uri: item.image_url }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginTop: 12,
    paddingBottom: 12,
    gap: 8,
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  dishInfoContainer: {
    flex: 0.75,
    gap: 8,
  },
  title: {
    fontFamily: "Karla_700Bold",
    fontSize: 18,
    color: "#333333",
  },
  description: {
    fontFamily: "Karla_400Regular",
    fontSize: 16,
    color: "#495e57",
  },
  price: {
    fontFamily: "Karla_500Medium",
    fontSize: 16,
    color: "#495e57",
  },
  image: {
    flex: 0.25,
    alignSelf: "flex-end",
    resizeMode: "cover",
    aspectRatio: "1/1",
  },
});

export default Dish;
