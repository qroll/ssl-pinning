/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Platform,
} from "react-native";

declare const global: { HermesInternal: null | {} };

const callApi = async () => {
  const response = await fetch(
    `https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=1145360&count=3&maxlength=300&format=json&random=${new Date().valueOf()}`
  );
  return response.json();
};

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiResult, setApiResult] = useState<null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    setApiResult(null);
    setError(null);
    callApi()
      .then((result) => setApiResult(result))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <Button title="Fetch" onPress={fetchNews} />
          {isLoading ? (
            <View>
              <Text>Loading...</Text>
            </View>
          ) : error ? (
            <View>
              <Text>Error:</Text>
              <Text style={styles.code}>{error.message}</Text>
            </View>
          ) : (
            <View>
              <Text>Result:</Text>
              <Text style={styles.code}>
                {JSON.stringify(apiResult, null, 2)}
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
  },
  code: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
});

export default App;
