import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import FacebookLoginButton from './src/components/FacebookLoginButton1'
import KakaoLoginButton from './src/components/KakaoLoginButton'
import NaverLoginButton from './src/components/NaverLoginButton'
import Push from './src/components/Push'

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FacebookLoginButton />
        <KakaoLoginButton />
        <NaverLoginButton />
        <Push />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default App
