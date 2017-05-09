# React-Native-FAB
A FAB button component for Android and iOS, customizable, simple and as per material design specs.

![FAB demo](https://media.giphy.com/media/eUa3ywxwoBwwE/giphy.gif)

See [Google Material Design](https://material.io/guidelines/components/buttons-floating-action-button.html) for more info on FABs.

## Installation

```sh
npm install --save react-native-fab
```

## Basic Usage

```javascript
import FAB from 'react-native-fab'
```

## Code

```js
<FAB buttonColor="red" iconTextColor="#FFFFFF" onClickAction={() => {console.log("FAB pressed")}} visible={true} iconTextComponent={<Icon name="all-out"/>} />
```
## Options
| Prop        | Type           | Effect  | Default Value |
| ------------- |-------------| -----| -----|
| visible | boolean | Show or hide the FAB | true |
| buttonColor | string | The color of FAB | red |
| onClickAction | function | Function to be called when button is pressed | ()=>{} |
| iconTextColor | color | The  color of icon of FAB | #FFFFFF |
| iconTextComponent | component | Text component or any other component based on it, works great with Icon from react-native-vector-icons | `<Text>+</Text>` |

##Note

* When visible prop is changed, the FAB will be animated in/out of screen. 
