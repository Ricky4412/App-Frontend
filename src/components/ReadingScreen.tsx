import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Dimensions, ActivityIndicator, Button, TouchableOpacity, Platform
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

type ReadingScreenRouteProp = RouteProp<{ params: { contentUrl: string } }, 'params'>;

const ReadingScreen: React.FC = () => {
  const route = useRoute<ReadingScreenRouteProp>();
  const navigation = useNavigation();
  const { contentUrl } = route.params;

  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);

  useEffect(() => {
    const loadHtmlContent = async () => {
      try {
        console.log(`Starting download: ${contentUrl}`);
        if (!contentUrl) {
          throw new Error('Invalid HTML URL.');
        }

        const proxyServerUrl = 'https://proxy-server-puce-alpha.vercel.app/proxy';
        const response = await fetch(`${proxyServerUrl}?url=${encodeURIComponent(contentUrl)}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.statusText}`);
        }

        const htmlText = await response.text();
        console.log(`HTML content loaded: ${htmlText.length} characters`);

        setHtmlContent(`
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  overflow-x: hidden;
                  background-color: ${darkMode ? '#333' : '#fff'};
                  color: ${darkMode ? '#fff' : '#000'};
                  zoom: ${zoom};
                }
                img, iframe {
                  max-width: 100%;
                }
                .content {
                  width: 100%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  box-sizing: border-box;
                  padding: 16px; /* Ensure padding so content doesn't touch edges */
                }
              </style>
            </head>
            <body>
              <div class="content">
                ${htmlText}
              </div>
            </body>
          </html>
        `);
      } catch (err) {
        console.error('Error loading HTML:', err);
        setError('Failed to load the HTML content. Please check the file URL or try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadHtmlContent();
  }, [contentUrl, darkMode, zoom]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading content...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  if (!htmlContent) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load content. Please try again.</Text>
        <Button title="Retry" onPress={() => setLoading(true)} />
      </View>
    );
  }

  const renderContent = () => {
    if (Platform.OS === 'web') {
      return (
        <iframe
          srcDoc={htmlContent}
          style={styles.webview}
          onLoad={() => setProgress(1)}
        />
      );
    } else {
      return (
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          style={styles.webview}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error('WebView error: ', nativeEvent);
            setError('An error occurred while displaying the content.');
          }}
          onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
          scalesPageToFit={false}
        />
      );
    }
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={darkMode ? "#fff" : "#000"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, darkMode && styles.darkHeaderTitle]}>Reading</Text>
        <TouchableOpacity onPress={toggleDarkMode}>
          <MaterialIcons name={darkMode ? "brightness-7" : "brightness-2"} size={24} color={darkMode ? "#fff" : "#000"} />
        </TouchableOpacity>
      </View>
      {renderContent()}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>
      <View style={styles.zoomContainer}>
        <Text style={styles.zoomText}>Zoom</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={3}
          value={zoom}
          onValueChange={(value) => setZoom(value)}
          step={0.1}
          minimumTrackTintColor="#007AFF"
          maximumTrackTintColor="#000000"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  webview: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  darkHeader: {
    backgroundColor: '#444',
    borderBottomColor: '#555',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  darkHeaderTitle: {
    color: '#fff',
  },
  progressBarContainer: {
    height: 3,
    width: '100%',
    backgroundColor: '#eee',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  zoomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  zoomText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10,
  },
  slider: {
    flex: 1,
  },
});

export default ReadingScreen;
