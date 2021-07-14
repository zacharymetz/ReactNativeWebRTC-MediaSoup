import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';

import Home from '../screens/MapScreen';
import Progress from '../screens/CreateEventScreen';
import Facts from '../screens/facts';
import Account from '../screens/account';
import {COLORS, FONTS, icons} from '../constants';
import {uiText} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import comboSessionLandingView from '../screens/comboSessionLandingView';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: COLORS.white,
          borderTopColor: 'trasnparent',
          ...(Platform.OS == 'ios' ? {} : {height: 64}),
        },
      }}>
      <Tab.Screen
        name={uiText.menuLabels.home}
        component={Home}
        options={{
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <RegularNavItem
              focused={focused}
              icon={icons.map}
              label={uiText.menuLabels.home}
            />
          ),
        }}
      />
      <Tab.Screen
        name={uiText.menuLabels.progress}
        component={Progress}
        options={{
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <RegularNavItem
              focused={focused}
              icon={icons.add_location_point}
              label={uiText.menuLabels.progress}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Transaction"
        component={comboSessionLandingView}
        options={{
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <Image
              source={icons.target}
              resizeMode="contain"
              style={{
                width: 42,
                height: 42,
                tintColor: COLORS.white,
              }}
            />
          ),
          tabBarButton: (props: any) => <CustomButton {...props}  />,
        }}
      /> */}
      {/* <Tab.Screen
        name={uiText.menuLabels.facts}
        component={Facts}
        options={{
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <RegularNavItem
              focused={focused}
              icon={icons.book}
              label={uiText.menuLabels.facts}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name={uiText.menuLabels.account}
        component={Account}
        options={{
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <RegularNavItem
              focused={focused}
              icon={icons.user}
              label={uiText.menuLabels.account}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const RegularNavItem = ({
  focused,
  icon,
  label,
}: {
  focused: boolean;
  icon: any;
  label: String;
}) => (
  <View
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      ...(Platform.OS == 'ios' ? {paddingTop: 14} : {}),
    }}>
    <Image
      source={icon}
      resizeMode="contain"
      style={{
        width: 32,
        height: 32,
        tintColor: focused ? COLORS.primary : COLORS.black,
      }}
    />
    {/* <Text
      style={{
        color: focused ? COLORS.primary : COLORS.black,
        ...FONTS.body5,
      }}>
      {label}
    </Text> */}
  </View>
);

const CustomButton = ({
  children,
  onPress,
}: {
  children: React.ReactChildren;
  onPress: any;
}) => {
  return (
    <TouchableOpacity
      style={{
        top: Platform.OS === 'ios' ? -12 : -24,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
      onPress={onPress}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
        }}>
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default Tabs;
