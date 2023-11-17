import { StyleSheet } from "react-native";
import { OnboardFlow, PrimaryButton } from 'react-native-onboard';



export default function Onboarding() {

  return (
    <OnboardFlow
      pages={[
        {
          title: 'Unleash Your Inner Chef',
          subtitle: 'From ingredients to meal - your delicious journey begins here',
          imageUri: 'https://frigade.com/img/example1.png',
        },
        {
          title: 'Scan & Savor',
          subtitle: 'Scan your ingredients and get your recipes effortlessly',
          imageUri: 'https://frigade.com/img/example2.png',
        },
        {
          title: 'Snap, Save, Share',
          subtitle: 'Discover, bookmark and share delicious recipes',
          imageUri: 'https://frigade.com/img/example2.png',
        }
      ]
      }
      type={'fullscreen'}
      titleStyle={styles.titleStyle}
      subtitleStyle={styles.subtitleStyle}

      paginationSelectedColor={'#FCF0DA'}
      // paginationColor: '#00f',
      primaryButtonStyle={{ backgroundColor: '#FCF0DA', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, shadowOffset: { width: 3, height: 3 } }}
      primaryButtonTextStyle={{ color: '#000', fontFamily: 'Judson', fontWeight: 'bold', fontSize: 20 }}
      showDismissButton={true}
      dismissButtonStyle={{ backgroundColor: '#FCF0DA', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, shadowOffset: { width: 3, height: 3 } }}
    />
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Judson',
  },
  subtitleStyle: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'Judson',
  },
});
