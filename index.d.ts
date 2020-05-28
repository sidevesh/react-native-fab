import { Component } from 'react';

interface Props {
  visible?: boolean;
  buttonColor?: string;
  onClickAction?: () => void;
  iconTextColor?: string;
  iconTextComponent?: JSX.Element;
  snackOffset?: number;
}

class FAB extends Component<Props> {}

export default FAB;
