'use strict';

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Platform,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';

const sharp_easing_values = {
  entry: Easing.bezier(0.0, 0.0, 0.2, 1),
  exit: Easing.bezier(0.4, 0.0, 0.6, 1)
}

const duration_values = {
  entry: 225,
  exit: 195
}

export default class FAB extends Component {

  static propTypes = {
    buttonColor: PropTypes.string,
    iconTextColor: PropTypes.string,
    onClickAction: PropTypes.func,
    iconTextComponent: PropTypes.element,
    visible: PropTypes.bool
  }

  static defaultProps = {
    buttonColor: 'red',
    iconTextColor: '#FFFFFF',
    onClickAction: ()=>{},
    iconTextComponent: <Text>+</Text>,
    visible: true
  };

  state = {
    translateValue: new Animated.Value(0)
  };

  componentDidMount() {
    const { translateValue } = this.state;
    const { visible } = this.props;

    if(visible) {
      translateValue.setValue(1);
    }
    else {
      translateValue.setValue(0);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { translateValue } = this.state;
    const { visible } = this.props;

    if((nextProps.visible)&&(!visible)) {
      Animated.timing(
        translateValue,
        {
          duration: duration_values.entry,
          toValue: 1,
          easing: sharp_easing_values.entry
        }
      ).start();
    }
    else if((!nextProps.visible)&&(visible)) {
      Animated.timing(
        translateValue,
        {
          duration: duration_values.exit,
          toValue: 0,
          easing: sharp_easing_values.exit
        }
      ).start();
    }
  }

  render() {
    const {
      translateValue,
    } = this.state;
    const {
      onClickAction,
      buttonColor,
      iconTextComponent,
      iconTextColor,
    } = this.props;

    const dimensionInterpolate = translateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 56],
    });

    const rotateInterpolate = translateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['-90deg', '0deg'],
    });

    if(Platform.OS==='ios') {
      return (
        <View style={styles.fab_box}>
          <Animated.View
            style={[
              styles.addButton,
              {
                height: dimensionInterpolate,
                width: dimensionInterpolate
              }
            ]}
          >
            <TouchableOpacity onPress={()=>{onClickAction()}} style={[styles.addButtonInnerView, {backgroundColor: buttonColor}]}>
              <Animated.Text style={{
                transform: [
                  {scale: translateValue},
                  {rotate: rotateInterpolate}
                ],
                fontSize: 24
              }}>
                {React.cloneElement(iconTextComponent, {style: {
                  fontSize: 24,
                  color: iconTextColor
                }})}
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      ); 
    }
    else if(Platform.OS==='android') {
      return (
        <View style={styles.fab_box}>
          <Animated.View
            style={[
              styles.addButton,
              {
                height: dimensionInterpolate,
                width: dimensionInterpolate
              }
            ]}
          >
            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackgroundBorderless()} onPress={()=>{onClickAction()}}>
              <View style={[styles.addButtonInnerView, {backgroundColor: buttonColor}]}>
                <Animated.Text style={{
                  transform: [
                    {scaleX: translateValue},
                    {rotate: rotateInterpolate}
                  ],
                  fontSize: 24
                }}>
                  {React.cloneElement(iconTextComponent, {style: {
                    fontSize: 24,
                    color: iconTextColor
                  }})}
                </Animated.Text>
              </View>
            </TouchableNativeFeedback>
          </Animated.View>
        </View>
      ); 
    }
  }
}

const styles = StyleSheet.create({
  addButton: {
    borderRadius: 50,
    alignItems: 'stretch',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    elevation: 2
  },
  fab_box: {
    position: 'absolute',
    bottom: 20,
    right:20,
    height: 56,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  addButtonInnerView: {
    flex: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
