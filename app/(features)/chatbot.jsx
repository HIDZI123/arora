import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Using MaterialCommunityIcons
import { HfInference } from "@huggingface/inference";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      text: "How can I assist you with safety information today?",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const client = new HfInference(process.env.VITE_HUGGING_FACE);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, isUser: true }]);
      setLoading(true);

      try {
        const stream = client.chatCompletionStream({
          model: "meta-llama/Llama-3.2-1B-Instruct",
          messages: [{ role: "user", content: input }],
          max_tokens: 250,
        });

        let responseText = "";

        for await (const chunk of stream) {
          if (chunk.choices && chunk.choices.length > 0) {
            const newContent = chunk.choices[0].delta.content;
            responseText += newContent;
            setMessages((prev) => {
              const newMessages = [...prev];
              const lastMessage = newMessages[newMessages.length - 1];
              if (!lastMessage.isUser) {
                newMessages[newMessages.length - 1].text = responseText;
              } else {
                newMessages.push({
                  text: responseText,
                  isUser: false,
                });
              }
              return newMessages;
            });
          }
        }
      } catch (error) {
        console.error("Error getting response:", error);
        setMessages((prev) => [
          ...prev,
          {
            text: "I apologize, but I encountered an error processing your request. Please try again.",
            isUser: false,
          },
        ]);
      }

      setLoading(false);
      setInput("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="robot" size={24} color="#E53E3E" style={styles.icon} />
        <Text style={styles.headerText}>Chat</Text>
      </View>

      <ScrollView style={styles.chatArea} contentContainerStyle={styles.chatContent}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.isUser ? styles.userMessageContainer : styles.botMessageContainer,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                message.isUser ? styles.userMessageBubble : styles.botMessageBubble,
              ]}
            >
              <Text style={message.isUser ? styles.userMessageText : styles.botMessageText}>
                {message.text}
              </Text>
            </View>
          </View>
        ))}
        {loading && (
          <View style={styles.messageContainer}>
            <View style={styles.botMessageBubble}>
              <ActivityIndicator size="small" color="#000" />
              <Text style={styles.botMessageText}>Thinking...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
          editable={!loading}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
          disabled={loading}
        >
          {/* Wrapping the icon in a Text component is not required, as it's a non-text component */}
          <Icon name="send" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFD4E2",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  icon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  chatArea: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
  },
  chatContent: {
    paddingVertical: 10,
  },
  messageContainer: {
    marginVertical: 5,
  },
  userMessageContainer: {
    alignItems: "flex-end",
  },
  botMessageContainer: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
  },
  userMessageBubble: {
    backgroundColor: "#4299E1",
    borderBottomRightRadius: 0,
    marginBottom: 5,
  },
  botMessageBubble: {
    backgroundColor: "#E2E8F0",
    borderBottomLeftRadius: 0,
    marginBottom: 5,
  },
  userMessageText: {
    color: "#FFF",
    fontSize: 15,
  },
  botMessageText: {
    color: "#333",
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFF",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "#F9FAFB",
  },
  sendButton: {
    backgroundColor: "#E53E3E",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Chatbot;
