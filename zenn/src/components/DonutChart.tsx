import React, { useRef, useEffect, useState } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  percentage: number; // % concluídas
}

export default function DonutChart({ percentage }: Props) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayedPercent, setDisplayedPercent] = useState(0);
  const strokeWidth = 20;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  useEffect(() => {
    animatedValue.setValue(0);
    setDisplayedPercent(0);

    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Atualizar o número animado durante a animação do gráfico
    const listenerId = animatedValue.addListener(({ value }) => {
      setDisplayedPercent(Math.round(value));
    });

    return () => {
      animatedValue.removeListener(listenerId);
    };
  }, [percentage]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.container}>
      <Svg
        width={radius * 2 + strokeWidth * 2}
        height={radius * 2 + strokeWidth * 2}
        style={{ marginRight: 20 }}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx={halfCircle}
            cy={halfCircle}
            r={radius}
            stroke="#B0B0B0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <AnimatedCircle
            cx={halfCircle}
            cy={halfCircle}
            r={radius}
            stroke="#4C804C"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="butt"
            fill="none"
          />
        </G>
      </Svg>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <Text style={[styles.percentText, { color: '#4C804C' }]}>
            {displayedPercent}%
          </Text>
        </View>
        <View style={styles.legendItem}>
          <Text style={[styles.percentText, { color: '#B0B0B0' }]}>
            {100 - displayedPercent}%
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legend: {
    justifyContent: 'center',
  },
  legendItem: {
    marginBottom: 8,
  },
  percentText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
