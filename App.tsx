/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 * Author: Lekkaka Raghuram
 * Github: https://github.com/RAMraghuram/HoncInterview
 *
 * @format
 */

import React, {createRef, useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import Arrow from './resources/Arrow';
import BookingIcon from './resources/BookingIcon';
import Close from './resources/Close';
import GarageIcon from './resources/GarageIcon';
import HomeIcon from './resources/HomeIcon';
import LocationIcon from './resources/LocationIcon';

const Dates = [
  {
    date: 'Mar 17',
    day: 'Wed',
    availableSlots: ['9', '11', '1', '3', '5', '7'],
  },
  {date: 'Mar 18', day: 'Thu', availableSlots: ['9', '11', '3', '7']},
  {date: 'Mar 19', day: 'Fri', availableSlots: ['9', '1', '3', '5']},
  {date: 'Mar 20', day: 'Sat', availableSlots: ['1', '3', '5', '7']},
  {date: 'Mar 21', day: 'Sun', availableSlots: ['9', '11', '1', '5']},
];

const AllSlots = [
  {key: '9', value: '09:00 am - 11:00 am', price: '$1145'},
  {key: '11', value: '11:00 am - 01:00 pm', price: '$1125'},
  {key: '1', value: '01:00 pm - 03:00 pm', price: '$1005'},
  {key: '3', value: '03:00 pm - 05:00 pm', price: '$1045'},
  {key: '5', value: '05:00 pm - 07:00 pm', price: '$1205'},
  {key: '7', value: '07:00 pm - 09:00 pm', price: '$1555'},
];

const Address = [
  {
    name: 'My Home Avatar',
    street: 'B2 P1202',
    subStreet: 'Lorem ipsum',
    zipcode: '500060',
  },
  {name: 'GDR Tower', street: '', subStreet: 'Lorem ipsum', zipcode: '500049'},
];

const IconCollection = ['HomeIcon', 'BookingIcon', 'GarageIcon'];
const Colors = {
  white: '#ffffff',
  grayText: 'rgba(0,0,0,0.5)',
  borderColor: 'rgba(0,0,0,0.3)',
  grayBGR: 'rgba(0,0,0,0.3)',
  typeOfOrange: '#e0491bd3',
  logoBlue: '#0199ff',
};

const App = () => {
  const [dateData, setDateData] = useState<{
    date: string;
    day: string;
    availableSlots: string[];
  }>(Dates[0]);

  const [selectedSlot, setSelectedSlot] = useState<{
    key: string;
    value: string;
    price: string;
  }>();
  const [selectedAddress, setSelectedAddress] = useState<{
    name: string;
    street: string;
    subStreet: string;
    zipcode: string;
  }>(Address[0]);

  const [visible, setVisible] = useState<boolean>(false);
  const selected = Dates.find(dates => dates.day === dateData.day);

  const actionSheetRef = createRef<ActionSheet>();

  const Header = () => {
    return (
      <View style={styles?.HeaderContainer}>
        <View style={styles?.HeaderSubContainer}>
          <Pressable
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            onPress={() => {
              Alert.alert('Back Button Pressed', 'Planning to go back');
            }}>
            <Arrow />
          </Pressable>
          <Text style={styles?.HeaderTitle}>{'Schedule'}</Text>
        </View>
        <Text style={styles?.HeaderSubTitle}>{'select date and time'}</Text>
      </View>
    );
  };

  const DatePicker = () => {
    return (
      <View style={styles?.DatePickerContainer}>
        <View style={styles?.DatePickerSubContainer}>
          {Dates.map(item => {
            return (
              <TouchableOpacity
                key={item?.day}
                style={[styles?.DatePickerTouchable, styles?.centerContent]}
                onPress={() => {
                  setDateData(item);
                }}>
                <Text
                  style={[
                    styles?.DatePickerDayText,
                    {
                      color:
                        selected?.day === item?.day
                          ? Colors?.typeOfOrange
                          : 'black',
                    },
                  ]}>
                  {item?.day}
                </Text>
                <Text
                  style={[
                    styles?.DatePickerDayText,
                    {
                      fontWeight: '500',
                      fontSize: 14,
                      color:
                        selected?.day === item?.day
                          ? Colors?.typeOfOrange
                          : 'black',
                    },
                  ]}>
                  {item?.date}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles?.DatePickerChooseText}>
          <Text style={{color: Colors?.grayText}}>
            {'choose a suitable slot'}
          </Text>
        </View>
        <ScrollView>
          {AllSlots.map(({key, value, price}) => {
            const present = dateData.availableSlots.find(slot => slot === key);
            return (
              <View
                style={[
                  styles?.DatePickerScrollView,
                  {
                    borderColor:
                      present && selectedSlot?.key === key
                        ? Colors?.typeOfOrange
                        : Colors?.borderColor,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    present ? setSelectedSlot({key, value, price}) : null;
                  }}
                  activeOpacity={present ? 0.5 : 1}>
                  <Text
                    style={[
                      styles?.DatePickerDate,
                      {
                        color: present ? 'black' : Colors?.grayText,
                      },
                    ]}>
                    {value}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const BottomTabBar = () => {
    return (
      <View style={{flex: selectedSlot?.price ? 0.15 : 0.057}}>
        {selectedSlot?.price && (
          <View style={styles?.BottomTabBarSubContainer}>
            <View style={styles?.BottomTabBarBanner}>
              <Text style={styles?.BottomTabBarBannerPrice}>
                {selectedSlot?.price}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setVisible(true);
                }}>
                <Text style={styles?.BottomTabBarBannerProceed}>
                  {'proceed to garage'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles?.BottomTabBarTabContainer}>
          {IconCollection?.map(item => {
            return (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(item);
                }}>
                {item === 'HomeIcon' ? (
                  <View style={styles?.centerContent}>
                    <HomeIcon />
                    <Text
                      style={[styles?.commonMargin, {color: Colors?.logoBlue}]}>
                      {'home'}
                    </Text>
                  </View>
                ) : item === 'BookingIcon' ? (
                  <View style={styles?.centerContent}>
                    <BookingIcon />
                    <Text style={styles?.commonMargin}>{'bookings'}</Text>
                  </View>
                ) : (
                  <View style={styles?.centerContent}>
                    <GarageIcon />
                    <Text style={styles?.commonMargin}>{'garage'}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const BottomOverlay = () => {
    useEffect(() => {
      actionSheetRef.current?.setModalVisible(visible);
    }, [visible]);
    return (
      <ActionSheet
        ref={actionSheetRef}
        onClose={() => {
          setVisible(false);
        }}
        defaultOverlayOpacity={0.5}
        elevation={100}
        containerStyle={styles.containerStyle}>
        <TouchableOpacity
          onPress={() => {
            setVisible(false);
          }}>
          <View style={styles?.BottomOverlayClose}>
            <Close />
          </View>
        </TouchableOpacity>
        <View style={styles?.BottomOverlayContainer}>
          <View style={{marginHorizontal: 17}}>
            <Text>{'Choose location'}</Text>
            <View style={styles?.dividerLine} />
            <View style={styles?.BottomOverlayLocationIcon}>
              <LocationIcon />
              <Text style={{color: Colors?.typeOfOrange, marginLeft: -10}}>
                {'Use your current Location'}
              </Text>
            </View>
            <View>
              <Text style={{color: Colors?.grayText}}>{'saved addresses'}</Text>
              {Address.map(item => {
                return (
                  <TouchableOpacity
                    style={[
                      styles?.BottomOverlayAddress,
                      {
                        borderColor:
                          selectedAddress?.name === item?.name
                            ? Colors?.typeOfOrange
                            : Colors?.borderColor,
                      },
                    ]}
                    onPress={() => {
                      setSelectedAddress(item);
                    }}>
                    <View style={{marginHorizontal: 17, paddingVertical: 10}}>
                      {item?.name ? (
                        <Text style={styles?.BottomOverlayAddressName}>
                          {item?.name}
                        </Text>
                      ) : null}
                      {item?.street ? (
                        <Text style={styles?.commonColor}>{item?.street}</Text>
                      ) : null}
                      {item?.subStreet ? (
                        <Text style={styles?.commonColor}>
                          {item?.subStreet}
                        </Text>
                      ) : null}
                      {item?.zipcode ? (
                        <Text style={styles?.commonColor}>{item?.zipcode}</Text>
                      ) : null}
                    </View>
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity onPress={() => setVisible(false)}>
                <View style={styles?.BottomOverlayAddAddressButton}>
                  <Text style={{textAlign: 'center', color: Colors?.white}}>
                    {'add address'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ActionSheet>
    );
  };

  return (
    <SafeAreaView style={styles?.AppContainer}>
      {Header()}
      {DatePicker()}
      {BottomTabBar()}
      {BottomOverlay()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AppContainer: {flex: 1, justifyContent: 'space-between'},
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  commonColor: {color: Colors?.grayText},
  containerStyle: {
    borderRadius: 0,
    backgroundColor: 'transparent',
  },
  commonMargin: {marginTop: -15},
  dividerLine: {marginTop: 7, borderWidth: StyleSheet?.hairlineWidth},
  //Header
  HeaderContainer: {backgroundColor: Colors?.white, flex: 0.15},
  HeaderSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  HeaderTitle: {
    fontSize: 25,
    lineHeight: 25,
    fontWeight: '300',
    marginTop: 10,
  },
  HeaderSubTitle: {margin: 17, marginTop: 17, color: Colors?.grayText},
  //DatePicker
  DatePickerContainer: {flex: 1},
  DatePickerSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: Colors?.grayBGR,
    borderBottomWidth: 1,
    borderBottomColor: Colors?.borderColor,
  },
  DatePickerTouchable: {
    marginVertical: 5,
  },
  DatePickerDayText: {fontWeight: '200', marginBottom: 5, fontSize: 10},
  DatePickerChooseText: {marginTop: 35, marginHorizontal: 35, marginBottom: 18},
  DatePickerScrollView: {
    borderWidth: 2,
    marginHorizontal: 30,
    marginBottom: 20,
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 4,
  },
  DatePickerDate: {fontSize: 16, lineHeight: 24, fontWeight: '500'},
  //BottomTabBar
  BottomTabBarSubContainer: {backgroundColor: 'black', height: 50},
  BottomTabBarBannerPrice: {
    color: Colors?.white,
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 24,
  },
  BottomTabBarBannerProceed: {
    color: Colors?.white,
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 24,
  },
  BottomTabBarBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  BottomTabBarTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderColor: Colors?.grayText,
    borderTopWidth: 0.5,
  },

  //BottomOverlay
  BottomOverlayClose: {
    borderRadius: 15,
    backgroundColor: Colors?.typeOfOrange,
    justifyContent: 'center',
    alignSelf: 'center',
    height: 30,
    width: 30,
    margin: 10,
  },
  BottomOverlayContainer: {
    minHeight: Dimensions.get('window').height * 0.5,
    paddingVertical: 20,
    backgroundColor: Colors?.white,
  },
  BottomOverlayLocationIcon: {
    flexDirection: 'row',
    marginLeft: -25,
    alignItems: 'center',
  },
  BottomOverlayAddress: {
    borderWidth: 1.5,
    borderRadius: 10,
    marginTop: 10,
  },
  BottomOverlayAddressName: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  BottomOverlayAddAddressButton: {
    marginTop: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors?.typeOfOrange,
    width: 140,
    borderRadius: 60,
    height: 40,
  },
});

export default App;
