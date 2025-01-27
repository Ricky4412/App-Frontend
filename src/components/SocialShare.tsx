import React from 'react';
import { Button } from 'react-native';
import * as Sharing from 'expo-sharing';

const SocialShare: React.FC = () => {
  const shareContent = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert('Sharing is not available on this device');
      return;
    }
    await Sharing.shareAsync('https://your-content-url.com');
  };

  return <Button title="Share Content" onPress={shareContent} />;
};

export default SocialShare;