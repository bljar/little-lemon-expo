import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "./context/auth";
import OnboardingScreen from "./screens/Onboarding";
import ProfileScreen from "./screens/Profile";
import HomeScreen from "./screens/Home";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  const [isOnboardingCompleted, setIsOnboarding] = React.useState(false);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.error(e);
        Alert.alert("Error", e.message);
      } finally {
        setIsOnboarding(true);
        SplashScreen.hideAsync();
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: () => setIsOnboarding(true),
      signOut: () => setIsOnboarding(false),
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {isOnboardingCompleted ? (
            <Stack.Group>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation }) => ({
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
                  headerTitle: () => <LogoHeader />,
                  headerRight: () => <ProfileButton navigation={navigation} />,
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

const LogoHeader = () => {
  return (
    <Image
      source={require("./assets/logo_title.webp")}
      style={{ height: 40, width: 155, padding: 16 }}
    />
  );
};

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
