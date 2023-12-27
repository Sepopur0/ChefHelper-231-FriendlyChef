import useCategory from "../services/recipe/get-category-by-id";
import useCategories from "../services/recipe/fetch-all-category";
import { colorPalette } from "../utils/systemDesign";
import { RecipeGuideStyle } from "../style/recipy-guide";
import { View, Text, Image, ScrollView } from "react-native";
import Collapsible from "react-native-collapsible";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
const RecipeGuide = ({ guide }) => {
  return (
    <ScrollView style={RecipeGuideStyle.container}>
      {guide.map((item, index) => {
        console.log({ item });
        return (
          <Collapse style={RecipeGuideStyle.container}>
            {/* <View style={RecipeGuideStyle.container}> */}
            <CollapseHeader>
              <View style={RecipeGuideStyle.stepContainer}>
                <View style={RecipeGuideStyle.dot}></View>
                <Text style={RecipeGuideStyle.stepText}>Step {index + 1}</Text>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View style={RecipeGuideStyle.stepContainer}>
                <View>
                  <View style={RecipeGuideStyle.leftBorder} />
                </View>
                <View style={RecipeGuideStyle.content}>
                  <Text style={RecipeGuideStyle.normalText}>
                    {item.description}
                  </Text>
                  <Image
                    style={RecipeGuideStyle.image}
                    source={{ uri: item.image }}
                  />
                </View>
              </View>
            </CollapseBody>
            {/* </View> */}
          </Collapse>
        );
      })}
    </ScrollView>
  );
};
export default RecipeGuide;
