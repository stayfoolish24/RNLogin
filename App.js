/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Button, Alert } from 'react-native'
import { LoginButton } from 'react-native-fbsdk'
import RNKakaoLogins from 'react-native-kakao-logins'
import { NaverLogin } from 'react-native-naver-login'

const initials = {
  kConsumerKey: 'xJhsJTvkSuDYnOJqGntg',
  kConsumerSecret: 'ySlO1ftw9w',
  kServiceAppName: 'RNLoginNaver',
  kServiceAppUrlScheme: 'RNLoginNaverURL' // only for iOS
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LoginButton />
        <Button
          onPress={() =>
            RNKakaoLogins.login((err, result) => {
              if (err) {
                Alert.alert('error', err)
                return
              }
              Alert.alert('token', result.token)
            })
          }
          title="kakaoLogin"
        />
        <Button
          onPress={() =>
            NaverLogin.login(initials, (err, token) => {
              if (err) {
                Alert.alert('error', err)
                return
              }
              Alert.alert('result', token)
            })
          }
          title="naverlogin"
        />
        <Button onPress={() => NaverLogin.logout()} title="naverlogout" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
