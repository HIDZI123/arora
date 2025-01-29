import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
  Image,
} from "react-native";

const EducationalResources = () => {
  const resources = [
    {
      title: "Understanding Missing Persons Cases",
      description:
        "Learn about the challenges, statistics, and factors involved in missing persons cases.",
      link: "https://www.youtube.com/watch?v=example1",
      thumbnail:
        "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png",
    },
    {
      title: "How to Report a Missing Person",
      description:
        "A step-by-step guide on reporting missing persons, including legal procedures and important contacts.",
      link: "https://www.youtube.com/watch?v=example2",
      thumbnail:
        "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png",
    },
    {
      title: "Role of Aadhaar in Identification",
      description:
        "How Aadhaar’s biometric authentication can aid in tracking and identifying missing individuals.",
      link: "https://www.youtube.com/watch?v=example3",
      thumbnail:
        "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png",
    },
    {
      title: "Using Technology for Search and Rescue",
      description:
        "Exploring modern technology, including AI and biometric systems, for tracking missing persons.",
      link: "https://www.youtube.com/watch?v=example4",
      thumbnail:
        "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png",
    },
    {
      title: "Preventing Child Abductions",
      description:
        "Essential safety tips and awareness programs to prevent child abductions and trafficking.",
      link: "https://www.youtube.com/watch?v=example5",
      thumbnail:
        "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png",
    },
  ];

  return (
    <ScrollView className="flex-1 mt-10 p-4 bg-white">
      <Text className="text-2xl font-bold text-center mb-6">
        Educational Resources
      </Text>
      {resources.map((resource, index) => (
        <View key={index} className="bg-gray-100 rounded-lg shadow-md p-4 mb-6">
          <Image
            source={{ uri: resource.thumbnail }}
            className="w-full h-48 rounded-lg mb-4"
            resizeMode="cover"
          />
          <Text className="text-xl font-semibold mb-2">{resource.title}</Text>
          <Text className="text-gray-700 mb-4">{resource.description}</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(resource.link)}
            className="text-blue-500 hover:underline"
          >
            <Text className="underline">Watch Now</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default EducationalResources;
