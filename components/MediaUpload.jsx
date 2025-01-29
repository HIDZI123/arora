
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as VideoThumbnails from "expo-video-thumbnails"
import { Audio } from "expo-av"



const MediaUpload = ({ formData, updateFormData }) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      updateFormData({
        media: {
          ...formData.media,
          photos: [...formData.media.photos, result.assets[0].uri],
        },
      })
    }
  }

  const recordVideo = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
      videoMaxDuration: 60,
    })

    if (!result.canceled) {
      const thumbnail = await VideoThumbnails.getThumbnailAsync(result.assets[0].uri, {
        time: 1000,
      })

      updateFormData({
        media: {
          ...formData.media,
          videos: [...formData.media.videos, { uri: result.assets[0].uri, thumbnail: thumbnail.uri }],
        },
      })
    }
  }

  const recordAudio = async () => {
    const { status } = await Audio.requestPermissionsAsync()
    if (status !== "granted") return

    const recording = new Audio.Recording()
    try {
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
      await recording.startAsync()
      // Wait for 2 minutes
      await new Promise((resolve) => setTimeout(resolve, 120000))
      await recording.stopAndUnloadAsync()
      const uri = recording.getURI()
      updateFormData({
        media: {
          ...formData.media,
          audio: [...formData.media.audio, uri],
        },
      })
    } catch (error) {
      console.error("Failed to record", error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Media Upload</Text>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Upload Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={recordVideo}>
        <Text style={styles.buttonText}>Record Video</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={recordAudio}>
        <Text style={styles.buttonText}>Record Audio</Text>
      </TouchableOpacity>
      <View style={styles.mediaPreview}>
        {formData.media.photos.map((photo, index) => (
          <Image key={index} source={{ uri: photo }} style={styles.previewImage} />
        ))}
        {formData.media.videos.map((video, index) => (
          <Image key={index} source={{ uri: video.thumbnail }} style={styles.previewImage} />
        ))}
        {formData.media.audio.map((audio, index) => (
          <Text key={index}>Audio {index + 1}</Text>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2196f3",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  mediaPreview: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  previewImage: {
    width: 100,
    height: 100,
    margin: 5,
  },
})

export default MediaUpload

