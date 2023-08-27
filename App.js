import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Image, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "./context/auth";
import OnboardingScreen from "./screens/Onboarding";
import ProfileScreen from "./screens/Profile";
import HomeScreen from "./screens/Home";
import { createInitial } from "./utils";
import LogoText from "./components/LogoText";
import Avatar from "./components/Avatar";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [isOnboardingCompleted, setIsOnboarding] = React.useState(false);
  const [isAppReady, setIsAppReady] = React.useState(false);
  let userInitial = "";

  React.useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem("customerInfo");
        if (value !== null) {
          const jsonValue = JSON.parse(value);
          userInitial = createInitial(jsonValue.firstName, jsonValue.lastName);
          if (Object.keys(jsonValue).length >= 4) {
            setIsOnboarding(true);
          }
        }
        // await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.error(e);
        Alert.alert("Error", e.message);
      } finally {
        setIsAppReady(true);
        SplashScreen.hideAsync();
      }
    })();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: () => setIsOnboarding(true),
      signOut: () => setIsOnboarding(false),
    }),
    []
  );

  if (!isAppReady) return null;

  const AvatarButton = ({ navigation }) => (
    <Pressable onPress={() => navigation.navigate("Profile")}>
      <Avatar initial={userInitial} size={40} />
    </Pressable>
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {isOnboardingCompleted ? (
            <Stack.Group
              screenOptions={{
                headerTitleAlign: "center",
                headerShadowVisible: false,
              }}
            >
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation }) => ({
                  headerTitle: () => <LogoText />,
                  headerRight: () => <AvatarButton navigation={navigation} />,
                })}
              />
              <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Group>
          ) : (
            <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const ProfileButton = ({ navigation }) => {
  return (
    <Pressable onPress={() => navigation.navigate("Profile")}>
      <Image
        source={require("./assets/profile_picture.webp")}
        style={{ height: 40, width: 40, padding: 16 }}
      />
    </Pressable>
  );
};
