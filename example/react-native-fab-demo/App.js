import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Snackbar from 'react-native-snackbar-component';
import FAB from 'react-native-fab';

export default function App() {
  const [isSnackbarVisible, setIsSnackbarVisible] = React.useState(false);
  const [isFabVisible, setIsFabVisible] = React.useState(false);
  const [snackbarDistance, setSnackbarDistance] = React.useState(0);
  return (
    <View style={styles.container}>
      <Button
        onPress={() => setIsSnackbarVisible(!isSnackbarVisible)}
        title="Toggle snackbar"
        accessibilityLabel="toggle"
      />
      <Button
        onPress={() => setIsFabVisible(!isFabVisible)}
        title="Toggle FAB"
        accessibilityLabel="toggle"
      />
      <FAB
        visible={isFabVisible}
        onClickAction={() => alert('its fab time!')}
        snackOffset={snackbarDistance}
      />
      <Snackbar
        visible={isSnackbarVisible}
        textMessage="Hello There!"
        actionHandler={() => alert('its snack time!')}
        actionText="let's go again"
        distanceCallback={(distance) => setSnackbarDistance(distance)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
