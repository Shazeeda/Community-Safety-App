import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

type Report = {
  id: string;
  title: string;
  description: string;
  location: string;
  createdAt: string;
};

const initialReports: Report[] = [
  {
    id: "1",
    title: "Suspicious vehicle",
    description: "Car circling the block several times late at night.",
    location: "Queens, NY",
    createdAt: "2025-12-06T04:22:00Z",
  },
  {
    id: "2",
    title: "Loud disturbance",
    description: "Group arguing loudly near the subway entrance.",
    location: "Brooklyn, NY",
    createdAt: "2025-12-06T02:10:00Z",
  },
];


const bgImage = {
  uri: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
};

export default function HomeScreen() {
  const [reports, setReports] = useState(initialReports);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const submitReport = () => {
    if (!title || !description || !location) {
      Alert.alert("Missing Info", "Please fill all fields.");
      return;
    }

    const newReport: Report = {
      id: Date.now().toString(),
      title,
      description,
      location,
      createdAt: new Date().toISOString(),
    };

    setReports([newReport, ...reports]);
    setTitle("");
    setDescription("");
    setLocation("");
  };

  const renderReport = ({ item }: { item: Report }) => {
    const isExpanded = expanded === item.id;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => setExpanded(isExpanded ? null : item.id)}
        activeOpacity={0.8}
      >
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardMeta}>
          {item.location} · {new Date(item.createdAt).toLocaleString()}
        </Text>

        <Text numberOfLines={isExpanded ? undefined : 2} style={styles.cardText}>
          {item.description}
        </Text>

        <Text style={styles.cardHint}>
          {isExpanded ? "Tap to collapse" : "Tap to expand"}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={bgImage} style={styles.bg} resizeMode="cover">
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.header}>Community Safety NYC</Text>
            <Text style={styles.subheader}>
              Log and review safety incidents around your neighborhood.
            </Text>

            {/* New Report Form */}
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>New Incident Report</Text>

              <TextInput
                style={styles.input}
                placeholder="Title"
                placeholderTextColor="#BDC3C7"
                value={title}
                onChangeText={setTitle}
              />

              <TextInput
                style={[styles.input, styles.multiline]}
                placeholder="Description"
                placeholderTextColor="#BDC3C7"
                value={description}
                onChangeText={setDescription}
                multiline
              />

              <TextInput
                style={styles.input}
                placeholder="Location (borough, cross streets, landmark)"
                placeholderTextColor="#BDC3C7"
                value={location}
                onChangeText={setLocation}
              />

              <View style={styles.buttonWrapper}>
                <Button title="Submit Report" onPress={submitReport} />
              </View>
            </View>

            {/* Recent Reports */}
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Recent Reports</Text>

              <FlatList
                data={reports}
                keyExtractor={(item) => item.id}
                renderItem={renderReport}
                scrollEnabled={false}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)", 
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: "800",
    color: "#ECF0F1",
    marginBottom: 4,
  },
  subheader: {
    fontSize: 14,
    color: "#ECF0F1",
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ECF0F1",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(236, 240, 241, 0.6)",
    backgroundColor: "rgba(0,0,0,0.4)",
    color: "#ECF0F1",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  multiline: {
    height: 90,
    textAlignVertical: "top",
  },
  buttonWrapper: {
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 4,
  },
  card: {
    backgroundColor: "rgba(236, 240, 241, 0.97)",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
    color: "#2C3E50",
  },
  cardMeta: {
    fontSize: 12,
    color: "#7F8C8D",
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: "#2C3E50",
    marginBottom: 6,
  },
  cardHint: {
    fontSize: 12,
    color: "#7F8C8D",
  },
});
