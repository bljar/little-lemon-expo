import { StyleSheet, Text } from "react-native";

const Avatar = ({ initial, size }) => {
  return <FromInitial initial={initial} size={size} />;
};

const FromInitial = ({ initial, size }) => (
  <Text style={[styles.initialAvatar, { width: size, height: size }]}>
    {initial}
  </Text>
);

const styles = StyleSheet.create({
  initialAvatar: {
    padding: 8,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlignVertical: "center",
    textAlign: "center",
    borderRadius: 100,
    backgroundColor: "orange",
  },
});

export default Avatar;
