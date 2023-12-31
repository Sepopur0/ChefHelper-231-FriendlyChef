import { StyleSheet } from "react-native";
import { colorPalette } from "../utils/systemDesign";

export default BottomNavigatorStyle = StyleSheet.create({
  container: {
    height: 75,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center', // Center the child components vertically
    justifyContent: 'space-between',
    paddingHorizontal: 16, // Adjust as needed
    backgroundColor: colorPalette.color10, // Add your background color
    borderRadius: 15,
  },
  image: {
    width: 24, // Adjust as needed
    height: 24, // Adjust as needed
  },
  mediumImage: {
    width: 60, // Adjust as needed
    height: 60, // Adjust as needed
  },
  image1: {
    flexBasis: 'auto',
    flexShrink: 1,
    flexGrow: 0
  },
  image2: {
    flexBasis: 'auto',
    flexShrink: 0,
    flexGrow: 1,
    alignItems: 'center', // Center the content horizontally
  },
  image3: {
    flexBasis: 'auto',
    flexShrink: 1,
    flexGrow: 0,
  },
  image2Container: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorPalette.color13,
    borderRadius: 50,
  },
});
