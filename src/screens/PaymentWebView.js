import React from 'react';
import { WebView } from 'react-native-webview';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  PaymentWebView: { url: string };
};

type PaymentWebViewRouteProp = RouteProp<RootStackParamList, 'PaymentWebView'>;
type PaymentWebViewNavigationProp = StackNavigationProp<RootStackParamList, 'PaymentWebView'>;

interface Props {
  route: PaymentWebViewRouteProp;
  navigation: PaymentWebViewNavigationProp;
}

const PaymentWebView: React.FC<Props> = ({ route, navigation }) => {
  const { url } = route.params;

  return <WebView source={{ uri: url }} />;
};

export default PaymentWebView;
