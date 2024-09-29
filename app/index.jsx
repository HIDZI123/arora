import {Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";



const index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className='text-3xl' >Mustafa in React-Native</Text>
      <StatusBar style="auto" />
      <Link href={'/Profile'} className="text-blue-700" > Click to go to Profile</Link>
    </View>
  );
};

export default index;

