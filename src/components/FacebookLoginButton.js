import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk'

class FacebookLoginButton extends Component {
  state = {
    FacebookToken: 'Facebook token has not fetched',
    FacebookName: 'Facebook name has not fetched',
    FacebookEmail: 'Facebook email has not fetched'
  }
  _facebookLogin = (error, result) => {
    if (error) {
      alert('Login failed with error: ' + error.message)
    } else if (result.isCancelled) {
      alert('Login was cancelled')
    } else {
      AccessToken.getCurrentAccessToken().then(data => {
        console.log(data.accessToken.toString())
        this.setState({
          FacebookToken: data.accessToken
        })
      })
      alert(
        'Login was successful with permissions: ' + result.grantedPermissions
      )
    }
  }

  _responseInfoCallback = (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.message)
    } else {
      alert(result.name + result.email + result.picture.data.url)
      this.setState({
        FacebookName: result.name,
        FacebookEmail: result.email
      })
    }
  }

  // get profile
  _getFBProfile = () => {
    const infoRequest = new GraphRequest(
      '/me?fields=name,picture,email',
      null,
      this._responseInfoCallback
    )
    new GraphRequestManager().addRequest(infoRequest).start()
  }

  _facebookLogout = () => {
    this.setState({
      FacebookToken: 'Facebook token has not fetched',
      FacebookName: 'Facebook name has not fetched',
      FacebookEmail: 'Facebook email has not fetched'
    })
    alert('User logged out')
  }

  render() {
    const { FacebookToken, FacebookName, FacebookEmail } = this.state
    return (
      <View style={styles.container}>
        <LoginButton
          readPermissions={['public_profile', 'email']}
          onLoginFinished={this._facebookLogin}
          // onLogoutFinished={() => alert('User logged out')}
          onLogoutFinished={this._facebookLogout}
        />
        <Text> {FacebookToken}</Text>
        <Text> {FacebookName}</Text>
        <Text> {FacebookEmail}</Text>
        <TouchableOpacity style={styles.button} onPress={this._getFBProfile}>
          <Text style={styles.btnText}>Facebook Profile</Text>
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
    backgroundColor: '#4A68AD',
    padding: 8,
    alignItems: 'center'
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})

export default FacebookLoginButton
