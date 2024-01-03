import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { colorPalette } from "../utils/systemDesign";
import CommonButton from "../components/button";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colorPalette.color13, // Add your background color
  },
  backButton: {
    flexBasis: 'auto',
    flexDirection:'row',
    flexShrink: 1,
    flexGrow: 0,
  },
  titleText: {
    // flex: 1, // Take up remaining space in the middle
    textAlign: 'center', // Center the text horizontally
    fontSize: 20,
    color: colorPalette.color4,
    marginBottom: 16,
    fontWeight: 'bold',
    flexBasis: 'auto',
    flexShrink: 0,
    flexGrow: 1
  },
  contentContainer: {
    // flex: 1,
    width: "100%", // Ensure full width
    paddingTop: 8,
    marginHorizontal: 36,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: "bold",
    color: colorPalette.color4,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colorPalette.color2,
  }, 
  question: {
    fontSize: 14,
    fontWeight: "bold",
    color: colorPalette.color4,
  },
  answer: {
    fontSize: 12,
    color: colorPalette.color4,
  },
  imageContainer: {
    alignItems: 'center',
  },  
  contactInfo: {
    fontSize: 16,
    marginVertical: 8,
    color: colorPalette.color4,
  },
  feedbackText: {
    fontSize: 16,
    marginVertical: 8,
    color: colorPalette.color4,
  },
  feedbackButton: {
    backgroundColor: colorPalette.color11,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: colorPalette.color4,
    fontSize: 16,
    textAlign: "center",
  },
  backIcons: { 
    left: 30,
    width: 24, // Adjust as needed
    height: 24, // Adjust as needed
    color: colorPalette.color2,
  },
});

// Hardcode: Dữ liệu câu hỏi và câu trả lời
const faqData = [
  {
    question: "How can I scan my cooking ingredients?",
    answer: [
      {
        step: "Step 1: Select Scan Function",
        description: "Find and select the scanning function by tapping the camera icon or similar scanning function in the application interface",
        image: require("../../assets/menu.png"),
      },
      {
        step: "Step 2: Start Scanning",
        description: "Place the cooking ingredient you want to scan in front of your phone's camera. Make sure there is enough light to scan your ingredients accurately",
        image: require("../../assets/scan_1.png"),
      },
      {
        step: "Step 3: Confirm or Correct Information",
        description: "After scanning, the application can display information about the scanned component. Confirm that the information is correct and make any corrections if necessary.",
        image: require("../../assets/scan_2.png"),
      },
      {
        step: "Step 4: Repeat the Process",
        description: "Repeat the scanning process for other cooking ingredients you want to add to your list",
      },
      {
        step: "Step 5: Check and Manage",
        description: "Check your list to make sure all the ingredients have been added. If necessary, you can manage your list by adding, modifying or removing items",
      },
      {
        step: "Step 6: Enjoy Other Features (if any)",
        description: "Explore the app's other features, like meal planning or getting recipe suggestions based on what you have on hand",
      },
    ],
  },
  {
    question: "How can I bookmark my favorite recipe?",
    answer: "You can reach our support team by...",
  },
  // Add more FAQs if needed
];

export default function HelpPage() {
  const navigation = useNavigation();
  const [showQuestions, setShowQuestions] = useState({});
  
  const goBack = () => {
    navigation.goBack();
  };

  const toggleQuestion = (questionId) => {
    setShowQuestions(prevState => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '100%' }}>
        <CommonButton width="20%" containerStyle={{}} style={styles.backButton} action={goBack}>
          <MaterialCommunityIcons name="chevron-left" size={24} style={styles.backIcons} />
          <Text style={{ color: colorPalette.color2, fontSize: 12, top: 5, marginLeft: 26 }}>Back</Text>
        </CommonButton>
      </View>

      <Text style={styles.titleText}>Help</Text>

      <ScrollView style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

        {faqData.map((faq, index) => (
          <View key={index}>
            <TouchableOpacity onPress={() => toggleQuestion(index)}>
              <Text style={[styles.toggleText, showQuestions[index] ? { color: "gold", marginBottom: 0 } : null]}>
                {faq.question}
              </Text>
            </TouchableOpacity>

            {showQuestions[index] && (
              <View style={[styles.answerContainer, showQuestions[index] ? null : { marginBottom: 0, paddingBottom: 0 }]}>
                {Array.isArray(faq.answer) ? (
                  faq.answer.map((step, stepIndex) => (
                    <View key={stepIndex} style={{ marginBottom: 8 }}>
                      <Text style={styles.answer}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 0 }}>{step.step}:</Text>
                      </Text>
                      <Text style={[styles.answer, { textAlign: 'justify', marginBottom: 8 }]}>{step.description}</Text>
                      {step.image && (
                        <View style={styles.imageContainer}>
                          <Image source={step.image} style={styles.image} />
                        </View>
                      )}
                    </View>
                  ))
                ) : (
                  <Text style={styles.answer}>{faq.answer}</Text>
                )}
              </View>
            )}
          </View>
        ))}

        <Text></Text>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.contactInfo}>Email: topher_nguyen@gmail.com</Text>
        <Text style={styles.contactInfo}>Phone: (+84) 838 972 219</Text>

        <Text style={styles.sectionTitle}>Feedback</Text>
        <Text style={styles.feedbackText}>We value your feedback! Please let us know how we can improve.</Text>

        <TouchableOpacity style={styles.feedbackButton} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>Give Feedback</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
