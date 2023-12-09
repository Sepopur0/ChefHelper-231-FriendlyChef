import useCategory from "../services/recipe/get-category-by-id";
import useCategories from "../services/recipe/fetch-all-category";
import { RecipeGuideStyle } from "../style/recipy-guide";
import { View, Text, Image, ScrollView } from "react-native";
const RecipeGuide = ({ guide }) => {
  return (
    <ScrollView style={RecipeGuideStyle.container}>
      {guide.map((item, index) => {
        console.log({ item });
        return (
          <View>
            <Text style={RecipeGuideStyle.stepText}> Step {index + 1}</Text>
            <Text style={RecipeGuideStyle.normalText}> {item.description}</Text>
            <Image
              style={RecipeGuideStyle.image}
              source={{ uri: item.image }}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};
export default RecipeGuide;
