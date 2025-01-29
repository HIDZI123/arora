import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons } from "@expo/vector-icons";

/* interface DecodedData {
  version: string
  email_mobile_status: string
  referenceid: string
  name: string
  dob: string
  gender: string
  careof: string
  district: string
  landmark: string
  house: string
  location: string
  pincode: string
  postoffice: string
  state: string
  street: string
  subdistrict: string
  vtc: string
  last_4_digits_mobile_no: string
  aadhaar_last_4_digit: string
  aadhaar_last_digit: string
  email: boolean
  mobile: boolean
}

interface ApiResponse {
  decoded_data: DecodedData
  image_base64: string
} */

const QRScannerComponent = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    try {
      const response = await fetch(
        "https://9b5jzj6h-8000.inc1.devtunnels.ms/decode_qr",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ qr_data: data }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log("Result:", result);
      setApiResponse(result);

    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to process QR code: ${error}`);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!scanned && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {scanned && apiResponse && (
        <ScrollView contentContainerStyle={styles.resultContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>Scanned Data</Text>
            <View style={styles.row}>
              <Ionicons name="person" size={24} color="#4A90E2" />
              <View style={styles.textContainer}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.value}>
                  {apiResponse.decoded_data.name}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <Ionicons name="calendar" size={24} color="#4A90E2" />
              <View style={styles.textContainer}>
                <Text style={styles.label}>Date of Birth</Text>
                <Text style={styles.value}>{apiResponse.decoded_data.dob}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Ionicons name="male-female" size={24} color="#4A90E2" />
              <View style={styles.textContainer}>
                <Text style={styles.label}>Gender</Text>
                <Text style={styles.value}>
                  {apiResponse.decoded_data.gender}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <Ionicons name="card" size={24} color="#4A90E2" />
              <View style={styles.textContainer}>
                <Text style={styles.label}>Aadhaar</Text>
                <Text style={styles.value}>
                  XXXX XXXX {apiResponse.decoded_data.aadhaar_last_4_digit}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <Ionicons name="home" size={24} color="#4A90E2" />
              <View style={styles.textContainer}>
                <Text style={styles.label}>Address</Text>
                <Text style={styles.value}>
                  {apiResponse.decoded_data.house},{" "}
                  {apiResponse.decoded_data.street},{" "}
                  {apiResponse.decoded_data.location},{" "}
                  {apiResponse.decoded_data.district},{" "}
                  {apiResponse.decoded_data.state} -{" "}
                  {apiResponse.decoded_data.pincode}
                </Text>
              </View>
            </View>
          </View>
          {apiResponse.image_base64 && (
            <Image
              source={{
                uri: `data:image/png;base64,${apiResponse.image_base64}`,
              }}
              style={styles.image}
            />
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.buttonText}>Scan Again</Text>
          </TouchableOpacity>
          
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  resultContainer: {
    padding: 20,
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default QRScannerComponent;
