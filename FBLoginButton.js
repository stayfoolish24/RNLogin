import React, { Component } from 'react'
import { View } from 'react-native'
import { LoginButton, AccessToken } from 'react-native-fbsdk'

export default class FBLoginButton extends Component {
  render() {
    return (
      <View>
        <LoginButton
          readPermissions={['public_profile', 'email']}
          onLoginFinished={(error, result) => {
            console.log(error, result)
            if (error) {
              alert('Login failed with error: ' + error.message)
            } else if (result.isCancelled) {
              alert('Login was cancelled')
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                console.log(data.accessToken.toString())
              })
              alert(
                'Login was successful with permissions: ' +
                  result.grantedPermissions
              )
            }
          }}
          onLogoutFinished={() => alert('User logged out')}
        />
      </View>
    )
  }
}

module.exports = FBLoginButton
