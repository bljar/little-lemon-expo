import React from "react";
import { Pressable, TextInput, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const SearchField = ({ value, onChange }) => (
  <Pressable style={styles.searchSection}>
    <Ionicons
      style={styles.searchIcon}
      name="search"
      size={24}
      color="#333333"
    />
    <TextInput
      style={styles.input}
      placeholder="Search"
      value={value}
      onChangeText={onChange}
      underlineColorAndroid="transparent"
    />
  </Pressable>
);

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: "row",
    marginVertical: 12,
    backgroundColor: "#d3d3d3",
    borderRadius: 16,
  },
  searchIcon: {
    padding: 12,
  },
  input: {
    flex: 1,
    padding: 12,
    paddingLeft: 0,
  },
});

export default SearchField;
