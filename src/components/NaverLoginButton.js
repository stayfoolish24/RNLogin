import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native'
import { NaverLogin, getProfile } from 'react-native-naver-login' // 네이버

const naverInitials = {
  kConsumerKey: 'xJhsJTvkSuDYnOJqGntg',
  kConsumerSecret: 'ySlO1ftw9w',
  kServiceAppName: 'RNLoginNaver',
  kServiceAppUrlScheme: 'RNLoginNaverURL' // only for iOS
}

const naverLogin = props => {
  return new Promise(function(resolve, reject) {
    console.log('props:' + JSON.stringify(props))
    NaverLogin.login(props, (err, token) => {
      console.log(`\n\n  Token is fetched  :: ${token} \n\n`)

      if (err) {
        reject(err)
        return
      }
      resolve(token)
    })
  })
}

const naverLogout = () => {
  NaverLogin.logout()
  Alert.alert('result', 'logout')
}

const getNaverProfile = async token => {
  let result = null
  try {
    result = await getProfile(token)
  } catch (err) {
    console.log('err')
    console.log(err)
  }
  return result
}

class NaverLoginButton extends Component {
  state = {
    NaverToken: 'naver token has not fetched',
    NaverName: 'naver name has not fetched',
    NaverEmail: 'naver email has not fetched'
  }

  _onNaverLogin = async () => {
    try {
      const result = await naverLogin(naverInitials)
      console.log('token: ' + result)
      this.setState({ NaverToken: result })

      if (result) {
        console.log('yes result')
        const profileResult = await getNaverProfile(result)
        console.log('profile')
        console.log(profileResult.response.id)
        this.setState({ NaverName: profileResult.response.id })
        Alert.alert('result', JSON.stringify(profileResult))

        if (profileResult.resultcode === '024') {
          Alert.alert('로그인 실패', profileResult.message)
          return
        }

        result.profile = profileResult
      } else {
        console.log('no result')
      }
    } catch (err) {
      console.log('error')
      console.log(err)
    }
  }

  _onNaverLogout = async () => {
    try {
      await NaverLogin.logout()
      Alert.alert('result', 'logout')
      this.setState({
        NaverToken: 'naver token has not fetched',
        NaverName: 'naver name has not fetched',
        NaverEmail: 'naver email has not fetched'
      })
    } catch (err) {
      console.log('error')
      console.log(err)
    }
  }

  // _onNaverLogout = () => {
  //   NaverLogin.logout()
  //   this.setState({
  //     NaverToken: 'naver token has not fetched',
  //     NaverName: 'naver name has not fetched',
  //     NaverEmail: 'naver email has not fetched'
  //   })
  //   Alert.alert('result', 'logout')
  // }

  render() {
    const { NaverToken, NaverName, NaverEmail } = this.state
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this._onNaverLogin}>
          <Text style={styles.btnText}>Naver Login</Text>
        </TouchableOpacity>
        <Text>{NaverToken}</Text>
        <Text>{NaverName}</Text>
        <Text>{NaverEmail}</Text>
        <TouchableOpacity style={styles.button} onPress={this._onNaverLogout}>
          <Text style={styles.btnText}>Naver Logout</Text>
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
    backgroundColor: '#59B836',
    padding: 10
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})

export default NaverLoginButton
