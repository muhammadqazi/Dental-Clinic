import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar, FlatList } from 'react-native'
import React from 'react'
import { Header } from '../../components'
import { COLORS, images, SIZES } from '../../constants'
import LinearGradient from 'react-native-linear-gradient'

const Home = () => {
  return (
    <View style={{
      flex: 1
    }}>
      <StatusBar
        hidden={true}
      />

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '6%',
        marginTop: 30
      }}>
        <Header />

        <TouchableOpacity>
          <Image
            source={images.settings}
            style={{
              height: 30,
              width: 30,
            }}
          />
        </TouchableOpacity>
      </View>




      <View style={{
        marginHorizontal: 15
      }}>
        <LinearGradient ient start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 2 }}
          colors={[COLORS.primary, COLORS.secondary, COLORS.white]} style={{
            width: '100%',
            marginTop: 20,
            height: 80,
            borderRadius: 20,
          }}>

          <View style={{
            marginHorizontal: '8%',
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <View>
              <Text style={{
                color: COLORS.white,
                fontWeight: '100',
              }}>Hello, </Text>
              <Text style={{
                color: COLORS.white,
                fontWeight: 'bold',
              }}>Muhammad Qazi</Text>
            </View>

            <TouchableOpacity style={{
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Image
                source={images.arrow}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: 'white',
                }}
              />
            </TouchableOpacity>

          </View>
        </LinearGradient>
      </View>




      <View style={{
        marginHorizontal: '8%',
        marginTop: 30
      }}>
        <Text style={{
          fontWeight: 'bold',
        }}>Appointments</Text>


        <View>
          <LinearGradient ient start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 2 }}
            colors={[COLORS.primary, COLORS.secondary, COLORS.white]} style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
              height: 60,
              borderRadius: 20,
            }}>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <Text style={{
                textAlign: 'center',
                color: COLORS.white,
                fontWeight: '100',
              }}>Get Appointment by Client Id</Text>

              <Image
                source={images.client}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: 'white',
                  marginLeft: 20,
                }}
              />
            </View>
          </LinearGradient>
          <LinearGradient ient start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 2 }}
            colors={[COLORS.primary, COLORS.secondary, COLORS.white]} style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
              height: 60,
              borderRadius: 20,
            }}>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <Text style={{
                textAlign: 'center',
                color: COLORS.white,
                fontWeight: '100',
              }}>Get Appointment by Doctor Id</Text>

              <Image
                source={images.doctor}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: 'white',
                  marginLeft: 20,
                }}
              />
            </View>
          </LinearGradient>

          <LinearGradient ient start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 2 }}
            colors={[COLORS.primary, COLORS.secondary, COLORS.white]} style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
              height: 60,
              borderRadius: 20,
            }}>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <Text style={{
                textAlign: 'center',
                color: COLORS.white,
                fontWeight: '100',
              }}>Get Appointment by Treatment Id</Text>

              <Image
                source={images.treat}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: 'white',
                  marginLeft: 20,
                }}
              />
            </View>
          </LinearGradient>
        </View>

        <FlatList
          removeClippedSubviews={true}
          style={{
            height: 200,
          }}
          data={[1, 2]}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: SIZES.base }}
          renderItem={({ item }) => {
            function renderprice() {
              if (item.price != undefined) {
                return (item.price)
              }
            }

            return (

              <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
                colors={[COLORS.primary, COLORS.secondary, COLORS.white]} style={{
                  width: 200,
                  marginRight: 20,
                  marginTop: 20,
                  height: 130,
                  borderRadius: 20,
                  marginBottom: 20
                }}>

                <View style={{
                  marginHorizontal: 20,
                }}>
                  <View style={{

                    marginTop: 20
                  }}>
                    <Text style={{
                      color: COLORS.white,
                      fontWeight: '100',
                      fontSize: 10
                    }}>2022-05-20T21:00:00.000Z</Text>
                    <Text style={{
                      color: COLORS.white,
                      fontWeight: 'bold',
                    }}>16:00:23</Text>
                  </View>

                  <Text style={{
                    color: COLORS.white,
                    fontWeight: '900',
                    fontSize: 10,
                    marginTop: 20
                  }}>Client Name</Text>

                  <Text style={{
                    color: COLORS.white,
                    fontWeight: '400',
                    fontSize: 10,
                    marginLeft: 2
                  }}>5488496712</Text>

                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                    <View style={{
                      backgroundColor: COLORS.red,
                      height: 10,
                      width: 10,
                      borderRadius: 10,
                      marginTop: 10,
                      marginLeft: 2
                    }}
                    />

                    <Text style={{
                      textAlign: 'center',
                      marginTop: 10,
                      marginLeft: 5,
                      fontSize: 8,
                      color: COLORS.white,
                    }}>Pending</Text>
                  </View>


                </View>
              </LinearGradient>
            )
          }}

        />
      </View>

      <View style={{
        marginHorizontal: '8%'
      }}>

        <View style={{
          backgroundColor: COLORS.black, 
          height: 1,
          marginHorizontal: 30,
          marginBottom: 10
        }} />
        <LinearGradient ient start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 2 }}
          colors={[COLORS.red, COLORS.red, COLORS.white]} style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            height: 60,
            borderRadius: 20,
          }}>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Text style={{
              textAlign: 'center',
              color: COLORS.white,
              fontWeight: '100',
            }}>Register New User</Text>

            <Image
              source={images.client}
              style={{
                height: 20,
                width: 20,
                tintColor: 'white',
                marginLeft: 20,
              }}
            />
          </View>
        </LinearGradient>
      </View>

    </View>
  )
}

export default Home

const styles = StyleSheet.create({})