import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PrayerRequestScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const colors = Colors[colorScheme ?? 'light'];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [prayerRequest, setPrayerRequest] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [category, setCategory] = useState('General');

  const categories = ['General', 'Health', 'Family', 'Financial', 'Spiritual', 'Work/Career', 'Relationships'];

  const handleSubmit = () => {
    if (!prayerRequest.trim()) {
      Alert.alert('Error', 'Please enter your prayer request');
      return;
    }

    if (!isAnonymous && !name.trim()) {
      Alert.alert('Error', 'Please enter your name or select anonymous');
      return;
    }

    Alert.alert(
      'Prayer Request Submitted',
      'Thank you for sharing your prayer request. Our prayer team will be praying for you.',
      [
        { text: 'OK', onPress: () => router.back() }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left.forwardslash.chevron.right" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prayer Request</Text>
        <Text style={styles.headerSubtitle}>Share your prayer needs with us</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Encouragement */}
        <View style={[styles.encouragementCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.encouragementText, { color: colors.text }]}>
            "Therefore confess your sins to each other and pray for each other so that you may be healed. 
            The prayer of a righteous person is powerful and effective."
          </Text>
          <Text style={[styles.encouragementReference, { color: colors.tint }]}>James 5:16</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Personal Information</Text>
          
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, { backgroundColor: isAnonymous ? colors.primary : colors.card, borderColor: colors.border }]}
              onPress={() => setIsAnonymous(!isAnonymous)}
            >
              {isAnonymous && <IconSymbol name="house.fill" size={16} color="white" />}
            </TouchableOpacity>
            <Text style={[styles.checkboxLabel, { color: colors.text }]}>Submit anonymously</Text>
          </View>

          {!isAnonymous && (
            <>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Your Name *</Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                  placeholder="Enter your full name"
                  placeholderTextColor={colors.icon}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Email (Optional)</Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                  placeholder="Enter your email for updates"
                  placeholderTextColor={colors.icon}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>
            </>
          )}
        </View>

        {/* Prayer Request Category */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Prayer Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryContainer}>
              {categories.map((cat, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryChip,
                    {
                      backgroundColor: category === cat ? colors.primary : colors.card,
                      borderColor: colors.border,
                    }
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      {
                        color: category === cat ? 'white' : colors.text,
                      }
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Prayer Request */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Prayer Request *</Text>
          <TextInput
            style={[styles.textArea, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
            placeholder="Please share what you would like us to pray for..."
            placeholderTextColor={colors.icon}
            value={prayerRequest}
            onChangeText={setPrayerRequest}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Options */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Prayer Options</Text>
          
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, { backgroundColor: isUrgent ? '#E74C3C' : colors.card, borderColor: colors.border }]}
              onPress={() => setIsUrgent(!isUrgent)}
            >
              {isUrgent && <IconSymbol name="house.fill" size={16} color="white" />}
            </TouchableOpacity>
            <View style={styles.checkboxTextContainer}>
              <Text style={[styles.checkboxLabel, { color: colors.text }]}>Urgent Prayer Request</Text>
              <Text style={[styles.checkboxDescription, { color: colors.icon }]}>
                Mark as urgent for immediate prayer team attention
              </Text>
            </View>
          </View>
        </View>

        {/* Prayer Team Information */}
        <View style={styles.section}>
          <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.infoHeader}>
              <IconSymbol name="person.2.fill" size={24} color={colors.primary} />
              <Text style={[styles.infoTitle, { color: colors.text }]}>Our Prayer Team</Text>
            </View>
            <Text style={[styles.infoDescription, { color: colors.icon }]}>
              Your prayer request will be shared with our dedicated prayer team who commit to praying 
              regularly for all requests. All requests are kept confidential within the prayer team.
            </Text>
            
            <View style={styles.teamStats}>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.primary }]}>25+</Text>
                <Text style={[styles.statLabel, { color: colors.icon }]}>Prayer Warriors</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.primary }]}>24/7</Text>
                <Text style={[styles.statLabel, { color: colors.icon }]}>Prayer Coverage</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.primary }]}>500+</Text>
                <Text style={[styles.statLabel, { color: colors.icon }]}>Prayers This Month</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: colors.primary }]}
            onPress={handleSubmit}
          >
            <IconSymbol name="paperplane.fill" size={20} color="white" />
            <Text style={styles.submitButtonText}>Submit Prayer Request</Text>
          </TouchableOpacity>

          <Text style={[styles.disclaimer, { color: colors.icon }]}>
            By submitting, you acknowledge that your request will be shared with our prayer team for the purpose of prayer.
          </Text>
        </View>

        {/* Alternative Contact */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Need Immediate Prayer?</Text>
          
          <TouchableOpacity style={[styles.contactItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.contactIcon, { backgroundColor: '#27AE60' }]}>
              <IconSymbol name="paperplane.fill" size={20} color="white" />
            </View>
            <View style={styles.contactContent}>
              <Text style={[styles.contactTitle, { color: colors.text }]}>Call Prayer Hotline</Text>
              <Text style={[styles.contactDescription, { color: colors.icon }]}>
                Available 24/7 for immediate prayer support
              </Text>
              <Text style={[styles.contactNumber, { color: colors.tint }]}>+1 (555) PRAY-NOW</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.contactItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.contactIcon, { backgroundColor: colors.primary }]}>
              <IconSymbol name="paperplane.fill" size={20} color="white" />
            </View>
            <View style={styles.contactContent}>
              <Text style={[styles.contactTitle, { color: colors.text }]}>Email Pastor</Text>
              <Text style={[styles.contactDescription, { color: colors.icon }]}>
                Reach out directly to our pastoral team
              </Text>
              <Text style={[styles.contactNumber, { color: colors.tint }]}>prayer@gccma.org</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 30,
    paddingTop: 60,
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
    marginTop: 5,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  encouragementCard: {
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  encouragementText: {
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  encouragementReference: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    minHeight: 120,
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  checkboxTextContainer: {
    flex: 1,
  },
  checkboxDescription: {
    fontSize: 14,
    marginTop: 2,
    lineHeight: 18,
  },
  infoCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  infoDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  teamStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  disclaimer: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  contactItem: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  contactNumber: {
    fontSize: 16,
    fontWeight: '600',
  },
});
