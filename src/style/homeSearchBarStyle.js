import { StyleSheet } from "react-native";
import { colorPalette } from "../utils/systemDesign";

export const HomeSearchBarStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // alignItems: 'center', // Center items vertically
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: colorPalette.color10,
    borderRadius: 10
  },
  textField: {
    width: '90%',
    marginLeft: 0,
    backgroundColor: colorPalette.color10,
    borderRadius: 10, // Optional: Apply the same border radius as the container
    color: 'white'
  },
  searchIconContainer: {
    width: '10%',
    marginRight: 0, // Adjust as needed for spacing
    backgroundColor: colorPalette.color10,
    borderRadius: 10, // Optional: Apply the same border radius as the container
    justifyContent: 'center'
  },
  searchIcon: {
    width: 24,
    height: 24,
  }
});
