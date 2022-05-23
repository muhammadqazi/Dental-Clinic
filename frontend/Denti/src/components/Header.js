import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {COLORS, images} from '../constants';

const Header = ({containerStyle}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.innerContainer}>
        <Image source={images.tooth} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>Dental</Text>
          <Text style={styles.subText}>Care</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 30,
    width: 30,
  },
  textContainer: {
    marginLeft: 5,
    justifyContent: 'center',
  },
  mainText: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 14,
  },
  subText: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default Header;
