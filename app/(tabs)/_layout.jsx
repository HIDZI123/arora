import { View, Text } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { Image } from "react-native";
import { icons } from "../../constants";

const TabIcon = ({ icons, color, focused, name }) => {
  return (
    <View className="items-center justify-center gap-1">
      <Image
        source={icons}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={` ${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style = {{color : color}}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle : {
            backgroundColor : "#161622",
            height:84,
            borderTopWidth: 1,
            borderTopColor: "#232533",
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icons={icons.home}
                name={"Home"}
                focused={focused}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icons={icons.plus}
                name={"Create"}
                focused={focused}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icons={icons.bookmark}
                name={"Bookmark"}
                focused={focused}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icons={icons.profile}
                name={"Profile"}
                focused={focused}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
