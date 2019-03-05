import React, { Component } from 'react'
import { View, Text, StyleSheet, Picker, AppState } from 'react-native'
import PushController from './PushController.js'
import PushNotification from 'react-native-push-notification'

class Push extends Component {
  state = {
    seconds: 5
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  componentWillMount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange = AppState => {
    if (AppState === 'background') {
      console.log(AppState, this.state.seconds)
      PushNotification.localNotificationSchedule({
        message: 'push notification 될까?', // (required)
        date: new Date(Date.now() + this.state.seconds * 1000) // in 60 secs
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Choose your notification time in seconds.
        </Text>
        <Picker
          style={styles.picker}
          selectedValue={this.state.seconds}
          onValueChange={seconds => this.setState({ seconds })}
        >
          <Picker.Item label="5" value={5} />
          <Picker.Item label="10" value={10} />
          <Picker.Item label="15" value={15} />
        </Picker>
        <PushController />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  picker: {
    width: 100
  }
})

export default Push
