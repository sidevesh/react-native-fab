'use strict';

import React, { Component } from 'react';
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

class FAB extends Component {

  constructor(props) {
    super(props);
    this.state = {
      translateValue: new Animated.Value(0)
    };
  }

  render() {
    if(Platform.OS==='ios') {
      return (
        <View style={styles.fab_box}>
          <Animated.View
            style={[
              styles.addButton,
              {
                height: this.state.translateValue.interpolate({inputRange: [0, 1], outputRange: [0, 56]}),
                width: this.state.translateValue.interpolate({inputRange: [0, 1], outputRange: [0, 56]})
              }
            ]}
          >
            <TouchableOpacity onPress={()=>{this.props.onClickAction()}} style={[styles.addButtonInnerView, {backgroundColor: this.props.buttonColor}]}>
              <Animated.Text style={{
                transform: [
                  {scaleX: this.state.translateValue}, 
                  {scaleY: this.state.translateValue},
                  {rotate: this.state.translateValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['-90deg', '0deg']
                  })}
                ],
                fontSize: 24
              }}>
                {React.cloneElement(this.props.iconTextComponent, {style: {
                  fontSize: 24,
                  color: this.props.iconTextColor
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
                height: this.state.translateValue.interpolate({inputRange: [0, 1], outputRange: [0, 56]}),
                width: this.state.translateValue.interpolate({inputRange: [0, 1], outputRange: [0, 56]})
              }
            ]}
          >
            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackgroundBorderless()} onPress={()=>{this.props.onClickAction()}}>
              <View style={[styles.addButtonInnerView, {backgroundColor: this.props.buttonColor}]}>
                <Animated.Text style={{
                  transform: [
                    {scaleX: this.state.translateValue}, 
                    {scaleY: this.state.translateValue},
                    {rotate: this.state.translateValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['-90deg', '0deg']
                    })}
                  ],
                  fontSize: 24
                }}>
                  {React.cloneElement(this.props.iconTextComponent, {style: {
                    fontSize: 24,
                    color: this.props.iconTextColor
                  }})}
                </Animated.Text>
              </View>
            </TouchableNativeFeedback>
          </Animated.View>
        </View>
      ); 
    }
  }

  componentDidMount() {
    if(this.props.visible) {
      this.state.translateValue.setValue(1);
    }
    else {
      this.state.translateValue.setValue(0);
    }
  }

  componentWillReceiveProps(nextProps) {
    if((nextProps.visible)&&(!this.props.visible)) {
      Animated.timing(
        this.state.translateValue,
        {
          duration: duration_values.entry,
          toValue: 1,
          easing: sharp_easing_values.entry
        }
      ).start();
    }
    else if((!nextProps.visible)&&(this.props.visible)) {
      Animated.timing(
        this.state.translateValue,
        {
          duration: duration_values.exit,
          toValue: 0,
          easing: sharp_easing_values.exit
        }
      ).start();
    }
  }

}

FAB.defaultProps = {
  buttonColor: 'red',
  iconTextColor: '#FFFFFF',
  onClickAction: ()=>{},
  iconTextComponent: <Text>+</Text>,
  visible: true
};

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

export default FAB;

FAB.propTypes = {
  buttonColor: React.PropTypes.string,
  iconTextColor: React.PropTypes.string,
  onClickAction: React.PropTypes.func,
  iconTextComponent: React.PropTypes.element,
  visible: React.PropTypes.bool
}