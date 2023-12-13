import { StyleSheet} from 'react-native';
import { colorPalette } from "../utils/systemDesign";
const TopBarNavigationStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, // Adjust as needed
    paddingTop: 8, // Adjust as needed
    paddingBottom: 8, // Adjust as needed
    backgroundColor: colorPalette.color13, // Add your background color
  },
  text: {
    // flex: 1, // Take up remaining space in the middle
    textAlign: 'center', // Center the text horizontally
    color: colorPalette.color4,
    fontSize: 20,
    fontWeight: 'bold',
    flexBasis: 'auto',
    flexShrink: 0,
    flexGrow: 1
  },
  image: {
    width: 24, // Adjust as needed
    height: 24, // Adjust as needed
  },
  image1: {
    flexBasis: 'auto',
    flexShrink: 1,
    flexGrow: 0
  },
  image2: {
    flexBasis: 'auto',
    flexShrink: 1,
    flexGrow: 0
  },
});
export default TopBarNavigationStyle;