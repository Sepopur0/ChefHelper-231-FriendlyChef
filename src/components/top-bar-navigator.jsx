import * as React from 'react';
import {Text, View} from 'react-native';
import { colorPalette } from "../utils/systemDesign";
import { welcomeStyle } from "../style/welcomeStyle";

function CommonTopBarNavigator({pageName}) {
  return(
    <View>
      <Text style={{ color: colorPalette.color4, fontSize: 20, fontWeight: 'bold' }}>{pageName}</Text>
    </View>
  )
}
export default CommonTopBarNavigator;