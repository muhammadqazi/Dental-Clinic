import 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LogBox } from 'react-native';
import { RootStack } from './src/navigators';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <RootStack />
  )
}

export default App

const styles = StyleSheet.create({})