import * as React from "react";
import { Button, Text, View } from "react-native";
import { useAuth } from "../context/auth";

export default function ProfileScreen() {
  const { signOut } = useAuth();

  return (
    <View>
      <Text>Signed in!</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}
