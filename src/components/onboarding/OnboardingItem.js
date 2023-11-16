import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";

export default function OnboardingItem({ item }) {
  const { width } = useWindowDimensions();
  return (
    <View style={(styles.container, { width })}>
      <Image
        source={item.image_url}
        style={[styles.image, { width, resizeMode: "contain" }]}
      ></Image>
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    flex: 0.7,
    justifyContent: "center",
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    textAlign: "center",
  },
  description: {
    fontWeight: "300",
    textAlign: "center",
  },
});
