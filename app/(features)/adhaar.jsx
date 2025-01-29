import { useState, useEffect } from "react"
import { Text, View, StyleSheet, Button, Image } from "react-native"
import { BarCodeScanner } from "expo-barcode-scanner"

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
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [apiResponse, setApiResponse] = useState(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true)
    try {
      const response = await fetch("https://9b5jzj6h-8000.inc1.devtunnels.ms/decode_qr", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qr_data: data }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setApiResponse(result)
    } catch (error) {
      console.error("Error:", error)
      alert(`Failed to process QR code: ${error}`)
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
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
        <View style={styles.resultContainer}>
          <Text style={styles.title}>Scanned Data:</Text>
          <Text>Name: {apiResponse.decoded_data.name}</Text>
          <Text>DOB: {apiResponse.decoded_data.dob}</Text>
          <Text>Gender: {apiResponse.decoded_data.gender}</Text>
          <Text>Aadhaar: XXXX XXXX {apiResponse.decoded_data.aadhaar_last_4_digit}</Text>
          <Text>
            Address: {apiResponse.decoded_data.house}, {apiResponse.decoded_data.street},{" "}
            {apiResponse.decoded_data.location}, {apiResponse.decoded_data.district}, {apiResponse.decoded_data.state} -{" "}
            {apiResponse.decoded_data.pincode}
          </Text>
          {apiResponse.image_base64 && (
            <Image source={{ uri: `data:image/png;base64,${apiResponse.image_base64}` }} style={styles.image} />
          )}
          <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  resultContainer: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
  },
})

export default QRScannerComponent

