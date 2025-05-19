import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Line, Rect } from 'react-native-svg';

const Court = ({ children }) => {
  return (
    <View style={styles.container}>
      <Svg style={styles.court}>
        {/* Court lines */}
        <Rect x="0" y="0" width="100%" height="100%" fill="none" stroke="black" />
        <Line x1="50%" y1="0" x2="50%" y2="100%" stroke="black" />
        {/* Three-point line, paint area, etc. */}
        {children}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    aspectRatio: 1,
  },
  court: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default Court;