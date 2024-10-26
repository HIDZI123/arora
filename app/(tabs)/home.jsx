import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import PostCard from "../../components/PostCard"; // Import PostCard component
import { icons, images } from "./../../constants";
import HomePageCard from "../../components/HomepageCard";
import axios from "axios";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user } = useGlobalContext();

  const cardData = [
    { title: "Safest Route", img: icons.safest_route, link: "/heatmap" },
    { title: "Book A Ride", img: icons.book_a_ride, link: "/book-a-ride" },
    { title: "Report Incident", img: icons.report_incident, link: "/create" },
    {
      title: "Safety Alerts",
      img: icons.safety_alerts,
      link: "/safety-alerts",
    },
    {
      title: "Educational Resources",
      img: icons.find_nearby,
      link: "/educational-resources",
    },
    {
      title: "S. O. S.",
      img: icons.emergency_contacts,
      link: "/emergency-contacts",
    },
    { title: "Join Webinars", img: icons.webinar, link: "/webinar" },
    { title: "Chat Bot", img: icons.chat_bot, link: "/chatbot" },
  ];

  const [postData, setPostData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const response = await axios.get(
        "https://tf43zhh1-8000.inc1.devtunnels.ms/api/posts/get-post"
      );
      console.log("Fetched post data:", response.data); // Debugging line

      // Assuming response.data is an array of post objects
      if (response.data && response.data.length > 0) {
        setPostData(response.data.data);
      } 
    } catch (error) {
      console.error(
        "Error during fetching posts:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#FAF7F0] mt-10">
      <ScrollView
        contentContainerStyle="flex-grow p-4"
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={fetchData} // Call fetchData when user pulls to refresh
          />
        }
      >
        <View className="mt-10 flex-row justify-between mx-3">
          <View>
            <Text className="text-xl text-gray-500">Hello, </Text>
            <Text className="text-2xl font-extrabold">
              Hi{" "}
              {user?.data?.user?.username ? user.data.user.username : "Guest"}
            </Text>
          </View>

          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Image source={images.profile} className="rounded-full h-16 w-16" />
          </TouchableOpacity>
        </View>

        <View className="bg-orange-400 rounded-md mx-4 mt-12 p-4">
          <View className="flex-row justify-around items-center">
            <Image
              source={icons.location_marker}
              className="h-16 w-16 rounded-full"
            />
            <Text className="text-white font-psemibold text-xl">
              Your Location
            </Text>
          </View>
          <Text className="text-white font-pmedium text-right mr-12">
            Kurla
          </Text>
        </View>

        <View className="flex-row flex-wrap mt-8">
          {cardData.map((card, index) => (
            <View key={index} className="w-1/3 p-2">
              <HomePageCard
                title={card.title}
                img={card.img}
                link={card.link}
              />
            </View>
          ))}
        </View>

        {/* Nearest Posts Section */}
        <View className="mx-4 mt-5">
          <Text className="font-pbold text-xl mb-4">Nearest Posts</Text>
          {postData && postData.length > 0 ? (
            postData.map((post) => (
              <PostCard
                key={post._id}
                description={post.description}
                location={post.location}
                type={post.type}
                audioFile={post.audioFile}
                videoFile={post.videoFile}
                imageFiles={post.imageFiles} // if you have images to display
                like={post.like}
                dislike={post.dislike}
                createdAt={post.createdAt}
              />
            ))
          ) : (
            <Text className="text-gray-500">No posts available.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
