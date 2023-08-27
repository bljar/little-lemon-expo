import { Image } from "react-native";

const LogoText = () => (
  <Image
    source={require("../assets/logo_title.webp")}
    style={{ height: 40, width: 155, padding: 16 }}
  />
);

export default LogoText;
