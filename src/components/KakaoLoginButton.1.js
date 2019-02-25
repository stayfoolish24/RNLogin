import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'
import RNKakaoLogins from 'react-native-kakao-logins' // 카카오

class KakaoLoginButton extends Component {
  state = {
    KakaoToken: 'Kakao token has not fetched',
    KakaoName: 'Kakao name has not fetched',
    KakaoEmail: 'Kakao email has not fetched'
  }
  // 카카오 로그인 시작.
  _kakaoLogin = () => {
    RNKakaoLogins.login((err, result) => {
      if (err) {
        Alert.alert('error', JSON.stringify(err))
        return
      }
      Alert.alert('result', JSON.stringify(result.token))
      this.setState({ KakaoToken: result.token })
    })
  }

  // _kakaoLogout = () => {
  //   RNKakaoLogins.logout((err, result) => {
  //     if (err) {
  //       Alert.alert('error', JSON.stringify(err))
  //       console.log('error: ' + err + 'result: ' + result)
  //       return
  //     }
  //     Alert.alert('result', JSON.stringify(result))
  //     console.log('result: ' + result)
  //     this.setState({
  //       KakaoToken: 'Kakao token has not fetched',
  //       KakaoName: 'Kakao name has not fetched',
  //       KakaoEmail: 'Kakao email has not fetched'
  //     })
  //   })
  // }

  // 카카오 로그인 후 내 프로필 가져오기.
  _getKakaoProfile = () => {
    RNKakaoLogins.getProfile((err, result) => {
      if (err) {
        Alert.alert('error', JSON.stringify(result))
        console.log('error:' + err, result)
        return
      }
      Alert.alert('result', JSON.stringify(result))
      this.setState({
        KakaoName: result.nickname,
        KakaoEmail: result.email
      })
    })
  }

  render() {
    const { KakaoToken, KakaoName, KakaoEmail } = this.state
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this._kakaoLogin}>
          <Text style={styles.btnText}>Kakao Login</Text>
        </TouchableOpacity>
        <Text>{KakaoToken}</Text>
        <Text>{KakaoName}</Text>
        <Text>{KakaoEmail}</Text>

        <TouchableOpacity style={styles.button} onPress={this._getKakaoProfile}>
          <Text style={styles.btnText}>Kakao Profile</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FCEA4F',
    padding: 8,
    alignItems: 'center'
  },
  btnText: {
    color: '#000'
  }
})

export default KakaoLoginButton
