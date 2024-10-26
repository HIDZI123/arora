import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, ActivityIndicator } from "react-native";
import MapView, { UrlTile, Marker } from "react-native-maps";
import axios from "axios";

const MapScreen = () => {
  const mapTilerAPIKey = "aHUEnRceg03OQys2K9jt"; // Replace with your MapTiler API key

  const [showIncidents, setShowIncidents] = useState(true); // Toggle to show/hide incidents
  const [incidents, setIncidents] = useState([]); // Incident data from the backend
  const [loading, setLoading] = useState(false); // Loading state
  const [dummyIncidents, setDummyIncidents] = useState([]); // Dummy incidents

  useEffect(() => {
    // Fetch incidents from the backend
    const fetchIncidents = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        const response = await axios.get(
          "https://tf43zhh1-8000.inc1.devtunnels.ms/api/posts/get-post"
        ); // Replace with your actual API URL
        const data = response.data; // Assuming response.data contains an array of incidents
        console.log("Incidents fetched:", data.data);
        setIncidents(data.data); // Update incidents state with the API response
      } catch (error) {
        console.error("Error fetching incidents:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchIncidents(); // Call the function to fetch data on component mount

    // Create dummy incidents
    const dummyIncidents = [
      {
        latitude: 19.0653,
        longitude: 72.8797,
        type: " Incident 7",
        description: "Suspicious activity reported near Kurla Railway Station",
      },
      {
        latitude: 19.0698,
        longitude: 72.8744,
        type: " Incident 8",
        description: "Loud noise complaint from residential area in Kurla West",
      },
      {
        latitude: 19.0634,
        longitude: 72.8805,
        type: " Incident 9",
        description: "Traffic congestion observed near Phoenix Marketcity Mall",
      },
      {
        latitude: 19.0679,
        longitude: 72.8732,
        type: " Incident 10",
        description: "Stray dog sighting near Kurla bus depot",
      },
      {
        latitude: 19.0617,
        longitude: 72.8789,
        type: " Incident 11",
        description: "Minor accident near BKC connector, Kurla East",
      },
      {
        latitude: 19.0721,
        longitude: 72.8708,
        type: " Incident 12",
        description: "Unauthorized parking reported in a commercial area, Kurla",
      },
      // Additional  Incidents
      {
        latitude: 19.0758,
        longitude: 72.8679,
        type: " Incident 13",
        description: "Theft reported near Lokmanya Tilak Terminus, Kurla",
      },
      {
        latitude: 19.0669,
        longitude: 72.8812,
        type: " Incident 14",
        description: "Fire alarm triggered in an office building, Kurla East",
      },
      {
        latitude: 19.0625,
        longitude: 72.8768,
        type: " Incident 15",
        description: "Fight reported at a local bar near Kurla West",
      },
      {
        latitude: 19.0743,
        longitude: 72.8741,
        type: " Incident 16",
        description: "Vehicle breakdown causing traffic near LBS Road, Kurla",
      },
      {
        latitude: 19.0681,
        longitude: 72.8735,
        type: " Incident 17",
        description: "Noise complaint from construction site, Kurla East",
      },
      {
        latitude: 19.0710,
        longitude: 72.8782,
        type: " Incident 18",
        description: "Street light malfunction reported near Kurla Market",
      }
    ];
    setDummyIncidents(dummyIncidents);

    setIncidents((prevIncidents) => [...prevIncidents, ...dummyIncidents]);
  }, []);

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 19.076, // Center around Mumbai (latitude and longitude)
          longitude: 72.8777,
          latitudeDelta: 0.05, // Zoom level
          longitudeDelta: 0.05,
        }}
      >
        {/* MapTiler Tile Layer */}
        <UrlTile
          urlTemplate={`https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.png?key=${mapTilerAPIKey}`}
          maximumZ={19}
          flipY={false} // For non-flipped tiles
        />

        {/* Show incidents if toggled on */}
        {showIncidents &&
          dummyIncidents.map((incident, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: incident.latitude,
                longitude: incident.longitude,
              }}
              title={incident.type}
              description={incident.description}
            />
          ))}
      </MapView>

      {/* Buttons to toggle incidents visibility */}
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title={showIncidents ? "Hide Incidents" : "Show Incidents"}
            onPress={() => setShowIncidents(!showIncidents)}
            color={showIncidents ? "red" : "green"}
          />
        </View>
      </View>

      {/* Loading Spinner */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20, // Position the buttons near the bottom
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center", // Center buttons horizontally
  },
  button: {
    width: 150, // Button width
    marginHorizontal: 10, // Space between buttons
    borderRadius: 10, // Rounded corners for the button container
    overflow: "hidden", // Ensures rounded corners on Button
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});

export default MapScreen;
