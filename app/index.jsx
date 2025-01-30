import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ScrollView, Text, View, Image } from "react-native"; // Import Image here
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton"; // Make sure this path is correct
import { router } from "expo-router";
import { useGlobalContext } from "./../context/GlobalProvider";
import { Video } from "expo-av";

export default function App() {
  const { isLogged } = useGlobalContext();
  useEffect(() => {
    if (isLogged) {
      router.push("/home");
    }
  }, [isLogged]);

  const styles = {
    video: {
      width: "100%",
      backgroundColor: "transparent",
      height: 200,
    },
  };

  return (
    <SafeAreaView className="bg-[#f9e8c1] h-full">
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
            <Video
              source={require("../assets/vid.mp4")} // Replace with your MP4 file path
              style={styles.video}
              shouldPlay
              isLooping
              resizeMode="contain"
            />
          </View>

          <View className="relative mt-10">
            <Text className="text-3xl text-slate-700 font-bold text-center">
              Find{"                          \n"} Protect{" "}
              {"       \n         "}
              <Text className=" text-secondary-200">Reunite</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-[-1]"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-600 mt-10 text-center">
            Because Every Missing Person Deserves to Be Found.
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7 "
          />
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
