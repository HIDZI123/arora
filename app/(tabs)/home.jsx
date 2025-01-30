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
    { title: "Adhaar Verfification", img: icons.adhaar, link: "/adhaar" },
    { title: "Safest Route", img: icons.safest_route, link: "/heatmap" },
    { title: "Book A Ride", img: icons.book_a_ride, link: "/book-a-ride" },
    { title: "Report Case", img: icons.report_incident, link: "/create" },
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
    { title: "Webinars & Drills", img: icons.webinar, link: "/webinar" },
    { title: "Chat Bot", img: icons.chat_bot, link: "/chatbot" },
    { title: "create2", img: icons.report_incident, link: "/create2" },
  ];

  const [postData, setPostData] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const missingChildrenData = [
    {
      adhaar: "1234-5678-9101",
      fullName: "Aarav Sharma",
      age: "12",
      aliases: "Avi",
      lastLocation: "Mumbai, Maharashtra",
      lastSeenDate: "2024-01-15",
      lastSeenTime: "14:30",
      emergencyContact: {
        name: "Neha Sharma",
        phone: "9876543210",
        email: "neha.sharma@email.com",
      },
      image:
        "https://images.generated.photos/1zt-Lw23Phdy1H2m9ZGPbhRsDdKGpQj-rpPyMnBU_-U/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDE1NzMzLmpwZw.jpg",
    },
    {
      adhaar: "2345-6789-0123",
      fullName: "Sanya Gupta",
      age: "9",
      aliases: "Sanu",
      lastLocation: "Delhi",
      lastSeenDate: "2024-01-10",
      lastSeenTime: "18:00",
      emergencyContact: {
        name: "Rohit Gupta",
        phone: "9876541230",
        email: "rohit.gupta@email.com",
      },
      image:
        "https://images.generated.photos/Ue6VJO_Vpht_z8CYWPXzs8tf-Ym2SkBWk32dF9DONdg/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/Nzc2MTc2LmpwZw.jpg",
    },
    {
      adhaar: "3456-7890-1234",
      fullName: "Kabir Singh",
      age: "14",
      aliases: "Kabi",
      lastLocation: "Bangalore, Karnataka",
      lastSeenDate: "2024-01-20",
      lastSeenTime: "20:00",
      emergencyContact: {
        name: "Anjali Singh",
        phone: "9876509876",
        email: "anjali.singh@email.com",
      },
      image:
        "https://images.generated.photos/YJJJkoxsyHqj1qbQdgZ9kMbZ7Z5G3ESN4mPIOoN2VfI/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzQ0Nzg5LmpwZw.jpg",
    },
  ];

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const response = await axios.get(
        "https://2xrn8gcc-3000.inc1.devtunnels.ms/api/posts/get-post"
      );
      //console.log("Fetched post data:", response.data.data); // Debugging line

      // Assuming response.data is an array of post objects
      if (response.data.data && response.data.data.length > 0) {
        setPostData(response.data.data || []);
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
    <SafeAreaView className="flex-1 bg-[#f9e8c1] pt-8">
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
            Bandra
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

        <View className="mx-4 mt-5">
          <Text className="font-pbold text-xl mb-4">Missing Children</Text>
          {missingChildrenData.length > 0 ? (
            missingChildrenData.map((child, index) => (
              <View
                key={index}
                className="mb-4 p-4 bg-[#eedec2] rounded-lg shadow"
              >
                <Image
                  source={{ uri: child.image }}
                  className="h-60 w-full rounded-md object-cover"
                />
                <Text className="text-lg font-bold mt-2">
                  {child.fullName} ({child.age} years old)
                </Text>
                <Text className="text-gray-600">
                  Last Seen: {child.lastLocation} on {child.lastSeenDate} at{" "}
                  {child.lastSeenTime}
                </Text>
                <Text className="text-gray-600">
                  Clothing: {child.clothingDescription}
                </Text>
                <Text className="text-gray-600">
                  Distinguishing Features: {child.distinguishingFeatures}
                </Text>
                <Text className="text-gray-600">
                  Guardian: {child.emergencyContact.name} (
                  {child.emergencyContact.relationship})
                </Text>
                <Text className="text-gray-600">
                  Contact: {child.emergencyContact.phone}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-500">
              No missing children data available.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
