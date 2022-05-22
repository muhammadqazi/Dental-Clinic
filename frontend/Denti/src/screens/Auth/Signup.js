import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native'
import { SIZES, COLORS, FONTS, images } from '../../constants';
import AuthLayout from './AuthLayout';
import { CustomSwitch, FormInput, SocialButton, TextButton } from '../../components';
import { utils } from '../../utils';


const Signup = ({ navigation }) => {

  const [Email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [emailError, setemailError] = React.useState("")
  const [name, setName] = React.useState("")
  const [nameError, setNameError] = React.useState("")
  const [role, setRole] = React.useState("")
  const [roleError, setRoleError] = React.useState("")


  const [showPass, setShowPass] = React.useState(false)

  const [saveMe, setSaveMe] = React.useState(false)


  function isEnableSignIn() {
    return Email != "" && password != "" && emailError == ""
  }
  return (
    <AuthLayout
      title={"Let's Sign You In"}
      subtitle={"Welcome back, you've been missed"}
    >

      <View style={{
        flex: 1,
        marginTop: SIZES.padding * 2
      }}>

        {/* Form Input */}

        <FormInput
          label={"Name"}
          onChange={(value) => {

            setName(value)
          }}
          errorMsg={nameError}
          appendComponent={
            <View style={{
              justifyContent: 'center'
            }}>
              <Image
                source={name == "" || (name != "" && nameError == "") ? images.correct : images.cancel}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: name == "" ? COLORS.gray : (name != "" && nameError == "") ? COLORS.green : COLORS.red
                }}
              />
            </View>
          }
        />

        <FormInput
          label={"Email"}
          keyboardType="email-address"
          autoCompleteType="email"
          onChange={(value) => {
            utils.validateEmail(value, setemailError)
            setEmail(value)
          }}
          errorMsg={emailError}
          appendComponent={
            <View style={{
              justifyContent: 'center'
            }}>
              <Image
                source={Email == "" || (Email != "" && emailError == "") ? images.correct : images.cancel}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: Email == "" ? COLORS.gray : (Email != "" && emailError == "") ? COLORS.green : COLORS.red
                }}
              />
            </View>
          }
        />

        <FormInput
          label="Password"
          secureTextEntry={!showPass}
          autoCompleteType="password"
          containerStyle={{
            marginTop: SIZES.radius
          }}
          onChange={(value) => setPassword(value)}
          appendComponent={
            <TouchableOpacity style={{
              width: 40,
              alignItems: 'flex-end',
              justifyContent: 'center'

            }}
              onPress={() => setShowPass(!showPass)}
            >
              <Image
                source={showPass ? images.eye_slash : images.eye_fill}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.gray
                }}
              />
            </TouchableOpacity>
          }
        />


        <FormInput
          label={"Role"}
          onChange={(value) => {

            setRole(value)
          }}
          errorMsg={roleError}
          appendComponent={
            <View style={{
              justifyContent: 'center'
            }}>
              <Image
                source={role == "" || (role != "" && roleError == "") ? images.correct : images.cancel}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: role == "" ? COLORS.gray : (role != "" && roleError == "") ? COLORS.green : COLORS.red
                }}
              />
            </View>
          }
        />

        
        <TextButton
          label="Sign Up"
          disable={isEnableSignIn() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: 'center',
            marginTop: 50,
            borderRadius: 25,
            backgroundColor: isEnableSignIn() ? COLORS.primary : COLORS.transparentPrimray
          }}
        />


      </View>




      <View>
      </View>
    </AuthLayout>
  )
}

export default Signup
