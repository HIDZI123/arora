import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ScrollView, Text, View, Image } from "react-native"; // Import Image here
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton"; // Make sure this path is correct
import { router } from "expo-router";
import {useGlobalContext} from './../context/GlobalProvider'

export default function App() {

  const {isLogged} = useGlobalContext()
  useEffect(()=>{
    if(isLogged){
      router.push('/home')
    }
  }, [isLogged])


  return (
    <SafeAreaView className="bg-[#FAF7F0] h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <View className="w-full">
            <Image
              source={images.logo}
              className="w-full h-[150px]"
              resizeMode="contain"
            />
            
          </View>
          <View className="shadow-2xl w-full">
            <Image
              source={images.cards}
              className="ml-2 mr-4 max-w-[800px] w-full h-[298px] "
              resizeMode="cover"
            />
          </View>

          <View className="relative mt-5">
            <Text className="text-3xl text-slate-700 font-bold text-center">
              Feel Safe {"           \n              "}
              Feel Free{"                   "}
              <Text className=" text-secondary-200">Navनारी</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-[-30]"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Empowering Safety with Navनारी:                    Step into a World of Boundless Security and Confidence.
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}