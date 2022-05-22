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


const Signin = ({ navigation }) => {

  const [Email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [emailError, setemailError] = React.useState("")

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

        {/* Save me and Forgot Password */}

        <View style={{
          flexDirection: 'row',
          marginTop: SIZES.radius,
          justifyContent: 'space-between',
          marginHorizontal:10
        }}>

          <CustomSwitch
            value={saveMe}
            onChange={(value) => setSaveMe(value)}

          />


          <TouchableOpacity>
            <Text style={{
              color: COLORS.gray,
            }}>Forgot Password?</Text>
          </TouchableOpacity>


        </View>

        {/* Sign In */}

        <TextButton
          label="Sign In"
          disable={isEnableSignIn() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: 25,
            backgroundColor: isEnableSignIn() ? COLORS.primary : COLORS.transparentPrimray
          }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 40, marginTop: 40 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: COLORS.black }} />
          <View>
            <Text style={{ width: 50, textAlign: 'center', color: COLORS.black }}>Or</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: COLORS.black }} />
        </View>

      </View>


      {/* Footer */}
      <View style={{
        marginBottom: 50
      }}>


        {/* Google */}

        <SocialButton
          label="Continue with Google"
          containerStyle={{
            backgroundColor: COLORS.lightGray2,
            height: 50,
            marginTop: SIZES.radius,
            alignItems: 'center',
            borderRadius: 25,

          }}
          icon={images.google}
          iconPosition="LEFT"

          labelStyle={{
            marginLeft: SIZES.radius,
            color: COLORS.black
          }}
          onPress={() => console.log("Google")}

        />

        <SocialButton
          label="Continue with Apple"
          containerStyle={{
            backgroundColor: COLORS.lightGray2,
            height: 50,
            marginTop: SIZES.radius,
            alignItems: 'center',
            borderRadius: 25,

          }}
          icon={images.apple}
          iconPosition="LEFT"
          iconStyle={{
            tintColor: 'black'
          }}
          labelStyle={{
            marginLeft: SIZES.radius,
            color: COLORS.black
          }}
          onPress={() => console.log("Google")}

        />
      </View>

      <View>
      </View>
    </AuthLayout>
  )
}

export default Signin
