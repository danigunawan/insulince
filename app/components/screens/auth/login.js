import react, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import baseStyles from '../styles/styles';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: []
    }

  this.logInPressed = this.logInPressed.bind(this);
  this.redirectToSignUp = this.redirectToSignUp.bind(this);
  }

  logInPressed() {
    this.props.login({ username: this.state.username,
                       password: this.state.password
          })
        // .then(go somewhere)
   }

   redirectToSignUp() {
    this.props.navigation.navigate('SignUpContainer');
   }

   render() {
     return (
       <KeyboardAvoidingView
       style={styles.container}
       behavior={'padding'}
       >

       </KeyboardAvoidingView>
     )
   }
}

export default Login;

const styles = StyleSheet.create({

});
