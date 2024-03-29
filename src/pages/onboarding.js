import { Animated, SafeAreaView, StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Dimensions } from "react-native";
import { useEffect, useState, useRef } from "react";
import { useNavigation,CommonActions } from "@react-navigation/native";
import slides from "../components/slides";
import CommonButton from "../components/button";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

export default function Onboarding() {
  const navigation = useNavigation();
  const [completed, setCompleted] = useState(false);

  const scrollX = new Animated.Value(0);
  const scrollRef = useRef();
  useEffect(() => {
    scrollX.addListener(({ value }) => {
      if (Math.floor(value / Dimensions.get('window').width) === slides.length - 1) {
        setCompleted(true);
        AsyncStorage.setItem('onboarding_completed', 'true')
      }
    })
    return () => scrollX.removeListener();
  }, [])
  const toWelcome=()=>{
    AsyncStorage.setItem('onboarding_completed', 'true')
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Authencitation' }],
      })
    )
  }



  function renderSlides() {
    return (<Animated.ScrollView
      horizontal
      pagingEnabled
      scrollEnabled
      snapToAlignment={'center'}
      decelerationRate={0}
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
      )}
      ref={scrollRef}
      onScrollEndDrag={() => {
        if (completed) {
          // navigation.navigate('Authencitation');
          toWelcome();
        }
      }}
    >
      {slides.map((slide, index) => (
        <View key={index} style={styles.container}>
          {/* skip button */}
          {/* <Pressable style={styles.skipContain}
            onPress={() => {
              navigation.navigate('Authencitation');
            }}
          >
            <Text style={styles.skipStyle}>Skip</Text>
          </Pressable> */}
          <CommonButton style={{}} containerStyle={styles.skipContain} width="10%" action={toWelcome}>
            <Text style={styles.skipStyle}>Skip</Text>
          </CommonButton>
          <View style={styles.imageContain}>
            <Image source={
              slide.image
            } style={styles.imageStyle} />
          </View>
          <View style={styles.textContain}>
            <Text style={styles.titleStyle}>{slide.title}</Text>
            <View style={styles.subtitleContain}>
              <Text style={styles.subtitleStyle}>{slide.subtitle}</Text>
            </View></View>

          {/* button */}
          <View style={styles.buttonContain}>
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                if (completed) {
                  // navigation.navigate('Authencitation');
                  toWelcome()
                }
                setCompleted(false);
                // next slide
                scrollRef.current.scrollTo({
                  x: Dimensions.get('window').width * (index + 1),
                  animated: true,
                })
              }}
            >
              <Text style={styles.buttonTextStyle}>{completed ? 'Get Started' : 'Next'}</Text>
            </Pressable>
          </View>
        </View>
      ))
      }
    </Animated.ScrollView>
    )
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, Dimensions.get('window').width);
    return (<View style={styles.dotsContainer}>
      {slides.map((_, index) => {
        const dotSize = dotPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [10, 70, 10],
          extrapolate: 'clamp',
        });
        return (<Animated.View key={`dot-${index}`} style={[styles.dot, { width: dotSize }]}>

        </Animated.View>)
      })}
    </View>)
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>{renderSlides()}</View>
      <View style={styles.buttonContainer}>
        {renderDots()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContain: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    marginTop: 80,
  },
  textContain: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  titleStyle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Judson',
  },
  subtitleStyle: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'Judson, sans-serif',
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    resizeMode: 'contain',
  },
  buttonTextStyle: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Judson',
    fontWeight: 'bold',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  dot: {
    height: 8,
    borderRadius: 5,
    backgroundColor: '#FCF0DA',
    marginHorizontal: 6,
  },

  skipContain: {
    position: 'absolute',
    top: 80,
    right: 30,
  },
  skipStyle: {
    fontSize: 17,
    color: '#000',
    fontStyle: 'italic',
    fontFamily: 'Judson, sans-serif',
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderRadius: 50,
    backgroundColor: '#FCF0DA',
  },
  buttonContain: {
    width: "90%",
    position: 'absolute',
    bottom: 30,
    color: '#000',
    height: 50,
  },
  subtitleContain: {
    marginTop: 40,
    width: "80%",
  },
});
