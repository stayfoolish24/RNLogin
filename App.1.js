/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Navigator
} from 'react-native'
import RNKakaoLogins from 'react-native-kakao-logins'
import { NaverLogin, getProfile } from 'react-native-naver-login'

const FBLoginButton = require('./FBLoginButton')
const FBSDK = require('react-native-fbsdk')
const { GraphRequest, GraphRequestManager } = FBSDK

// 네이버 설정
const initials = {
  kConsumerKey: 'xJhsJTvkSuDYnOJqGntg',
  kConsumerSecret: 'ySlO1ftw9w',
  kServiceAppName: 'RNLoginNaver',
  kServiceAppUrlScheme: 'RNLoginNaverURL' // only for iOS
}

class App extends Component {
  // 네이버
  constructor(props) {
    super(props)

    console.log('\n\n Initial Page :: src/components/pages/First/index.js \n\n')

    this.state = {
      isNaverLoggingin: false,
      theNaverToken: 'naver token has not fetched'
    }
  }

  // 네이버 로그인 시작.
  async naverLoginStart() {
    console.log('  naverLoginStart  ed')
    NaverLogin.login(initials, (err, token) => {
      console.log(`\n\n  Token is fetched  :: ${token} \n\n`)
      this.setState({ theNaverToken: token })
      if (err) {
        console.log(err)
        return
      }
    })
  }

  // 네이버 로그인 후 내 프로필 가져오기.
  async fetchProfile() {
    const profileResult = await getProfile(this.state.theNaverToken)
    console.log(profileResult)
    if (profileResult.resultcode === '024') {
      Alert.alert('로그인 실패', profileResult.message)
      return
    }
    Alert.alert('profile', JSON.stringify(profileResult))
  }

  // facebook
  _responseInfoCallback(error, result) {
    if (error) {
      alert('Error fetching data: ' + error.toString())
    } else {
      console.log(result)

      alert(
        'Success fetching data. name: ' +
          result.name +
          ' pic.url ' +
          result.picture.data.url
      )
    }
  }

  // facebook profile
  _getFBProfile() {
    const infoRequest = new GraphRequest(
      '/me?fields=name,picture',
      null,
      this._responseInfoCallback
    )
    new GraphRequestManager().addRequest(infoRequest).start()
  }

  // 카카오 로그인 시작.
  _kakaoLogin() {
    console.log('   kakaoLogin   ')
    RNKakaoLogins.login((err, result) => {
      if (err) {
        Alert.alert('error', JSON.stringify(err))
        return
      }
      Alert.alert('result', JSON.stringify(result))
    })
  }

  // 로그인 후 내 프로필 가져오기.
  _getProfile() {
    console.log('getKakaoProfile')
    RNKakaoLogins.getProfile((err, result) => {
      if (err) {
        Alert.alert('error', JSON.stringify(err))
        return
      }
      Alert.alert('result', JSON.stringify(result))
    })
  }

  render() {
    const { theNaverToken } = this.state
    return (
      <View style={styles.container}>
        <FBLoginButton />
        <Button onPress={() => this._getFBProfile()} title="Facebook Profile" />
        <Button onPress={() => this._kakaoLogin()} title="Kakao Login" />
        <Button onPress={() => this._getProfile()} title="Kakao Profile" />
        <Button onPress={() => this.naverLoginStart()} title="Naver LOGIN" />
        <Text>{theNaverToken}</Text>
        <Button onPress={() => this.fetchProfile()} title="Naver Profile" />
        <Button onPress={() => NaverLogin.logout()} title="Naver logout" />
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
  }
})

export default App
