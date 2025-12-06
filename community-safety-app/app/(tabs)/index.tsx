import { useState } from "react";
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

type ReportCategory = "Suspicious" | "Noise" | "Property" | "Other";

type Report = {
  id: string;
  title: string;
  description: string;
  location: string;
  createdAt: string;
  category: ReportCategory;
};

const initialReports: Report[] = [
  {
    id: "1",
    title: "Suspicious vehicle",
    description: "Car circling the block several times late at night.",
    location: "Queens, NY",
    createdAt: "2025-12-06T04:22:00Z",
    category: "Suspicious",
  },
  {
    id: "2",
    title: "Loud disturbance",
    description: "Group arguing loudly near the subway entrance.",
    location: "Brooklyn, NY",
    createdAt: "2025-12-06T02:10:00Z",
    category: "Noise",
  },
];

const bgImage = {
  uri: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
};

export default function HomeScreen() {
  // "Auth"
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Incident state
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<ReportCategory>("Suspicious");
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      Alert.alert("Missing info", "Please enter email and password.");
      return;
    }
    setIsLoggedIn(true);
  };

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
      category,
    };

    setReports((prev) => [newReport, ...prev]);
    setTitle("");
    setDescription("");
    setLocation("");
    setCategory("Suspicious");
  };

  const renderReport = ({ item }: { item: Report }) => {
    const isExpanded = expanded === item.id;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => setExpanded(isExpanded ? null : item.id)}
        activeOpacity={0.8}
      >
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.categoryPill}>
            <Text style={styles.categoryPillText}>{item.category}</Text>
          </View>
        </View>

        <Text style={styles.cardMeta}>
          {item.location} · {new Date(item.createdAt).toLocaleString()}
        </Text>

        <Text
          numberOfLines={isExpanded ? undefined : 2}
          style={styles.cardText}
        >
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
            {!isLoggedIn ? (
              <View style={styles.loginCard}>
                <Text style={styles.appName}>Community Safety NYC</Text>
                <Text style={styles.loginSubtitle}>
                  Sign in to log and review incidents around your neighborhood.
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#BDC3C7"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={loginEmail}
                  onChangeText={setLoginEmail}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#BDC3C7"
                  secureTextEntry
                  value={loginPassword}
                  onChangeText={setLoginPassword}
                />

                <View style={styles.buttonWrapper}>
                  <Button title="Login" onPress={handleLogin} />
                </View>

                <Text style={styles.loginHint}>
                  Demo account – any email & password will sign you in.
                </Text>
              </View>
            ) : (
              <>
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

                  {/* Category chips */}
                  <View style={styles.chipRow}>
                    {(
                      ["Suspicious", "Noise", "Property", "Other"] as ReportCategory[]
                    ).map((cat) => {
                      const isActive = category === cat;
                      return (
                        <TouchableOpacity
                          key={cat}
                          onPress={() => setCategory(cat)}
                          style={[styles.chip, isActive && styles.chipActive]}
                        >
                          <Text
                            style={[
                              styles.chipText,
                              isActive && styles.chipTextActive,
                            ]}
                          >
                            {cat}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

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
              </>
            )}
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

  // Login styles
  loginCard: {
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 16,
    padding: 20,
    marginTop: 60,
    borderWidth: 1,
    borderColor: "rgba(236, 240, 241, 0.4)",
  },
  appName: {
    fontSize: 26,
    fontWeight: "800",
    color: "#ECF0F1",
    marginBottom: 8,
    textAlign: "center",
  },
  loginSubtitle: {
    fontSize: 14,
    color: "#ECF0F1",
    marginBottom: 18,
    textAlign: "center",
  },
  loginHint: {
    fontSize: 12,
    color: "#BDC3C7",
    marginTop: 10,
    textAlign: "center",
  },

  // Main header
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

  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(236, 240, 241, 0.7)",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  chipActive: {
    backgroundColor: "#f1c40f",
    borderColor: "#f1c40f",
  },
  chipText: {
    fontSize: 12,
    color: "#ECF0F1",
  },
  chipTextActive: {
    color: "#2C3E50",
    fontWeight: "700",
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
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2C3E50",
  },
  categoryPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#f1c40f",
  },
  categoryPillText: {
    fontSize: 10,
    fontWeight: "700",
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
