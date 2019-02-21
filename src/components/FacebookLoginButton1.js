import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager
} from 'react-native-fbsdk'

class FacebookLoginButton extends Component {
  state = {
    FacebookToken: 'Facebook token has not fetched',
    FacebookName: 'Facebook name has not fetched111',
    FacebookEmail: 'Facebook email has not fetched'
  }

  // _handleFacebookLogin = () => {
  //   LoginManager.logInWithReadPermissions(['public_profile', 'email'])
  //     .then(
  //       function(result) {
  //         if (result.isCancelled) {
  //           console.log('Login cancelled')
  //         } else {
  //           console.log(
  //             'Login success with permissions: ' +
  //               result.grantedPermissions.toString()
  //           )
  //         }
  //       },
  //       function(error) {
  //         console.log('Login fail with error: ' + error)
  //       }
  //     )
  //     .then(this._getFBProfile())
  // }

  _handleFacebookLogin2 = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      (result, error) => {
        if (error) {
          alert('Login failed with error: ' + error.message)
        } else if (result.isCancelled) {
          alert('Login was cancelled')
        } else {
          this._getFBProfile()
        }
      }
    )
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
      alert(result.id + result.name + result.email + result.picture.data.url)
      this.setState({
        FacebookName: result.name,
        FacebookEmail: result.email
      })
    }
  }

  // get profile
  _getFBProfile = () => {
    const infoRequest = new GraphRequest(
      '/me?fields=id,name,picture,email',
      null,
      this._responseInfoCallback
    )
    new GraphRequestManager().addRequest(infoRequest).start()
  }

  // _facebookLogout = () => {
  //   this.setState({
  //     FacebookToken: 'Facebook token has not fetched',
  //     FacebookName: 'Facebook name has not fetched',
  //     FacebookEmail: 'Facebook email has not fetched'
  //   })
  //   alert('User logged out')
  // }

  render() {
    const { FacebookToken, FacebookName, FacebookEmail } = this.state
    return (
      <View style={styles.container}>
        {/* <LoginButton
          readPermissions={['public_profile', 'email']}
          onLoginFinished={this._facebookLogin}
          // onLogoutFinished={() => alert('User logged out')}
          onLogoutFinished={this._facebookLogout}
        /> */}
        <TouchableOpacity
          style={styles.button}
          onPress={this._handleFacebookLogin2}
        >
          <Text style={styles.btnText}>Facebook Login</Text>
        </TouchableOpacity>
        <Text> {FacebookToken}</Text>
        <Text> 이름: {FacebookName}</Text>
        <Text> 이메일: {FacebookEmail}</Text>
        {/* <TouchableOpacity style={styles.button} onPress={this._getFBProfile}>
          <Text style={styles.btnText}>Facebook Profile</Text>
        </TouchableOpacity> */}
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
