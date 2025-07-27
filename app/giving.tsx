import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function GivingScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedType, setSelectedType] = useState('General');

  const quickAmounts = ['25', '50', '100', '250'];
  const givingTypes = ['General', 'Missions', 'Building Fund', 'Youth Ministry', 'Benevolence'];

  const handleGiving = () => {
    const amount = selectedAmount || customAmount;
    if (!amount) {
      Alert.alert('Error', 'Please select or enter an amount');
      return;
    }
    
    Alert.alert(
      'Confirm Giving',
      `You are about to give $${amount} to ${selectedType}. Continue to payment?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: () => Alert.alert('Success', 'Thank you for your generous gift!') },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: '#27AE60' }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left.forwardslash.chevron.right" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Give Online</Text>
        <Text style={styles.headerSubtitle}>Support God's work through GCCMA</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Giving Quote */}
        <View style={[styles.quoteCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.quoteText, { color: colors.text }]}>
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
          </Text>
          <Text style={[styles.quoteReference, { color: colors.tint }]}>2 Corinthians 9:7</Text>
        </View>

        {/* Giving Type */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Where would you like to give?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.typeContainer}>
              {givingTypes.map((type, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.typeChip,
                    {
                      backgroundColor: selectedType === type ? colors.primary : colors.card,
                      borderColor: colors.border,
                    }
                  ]}
                  onPress={() => setSelectedType(type)}
                >
                  <Text
                    style={[
                      styles.typeText,
                      {
                        color: selectedType === type ? 'white' : colors.text,
                      }
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Amount Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Select Amount</Text>
          <View style={styles.amountGrid}>
            {quickAmounts.map((amount, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.amountButton,
                  {
                    backgroundColor: selectedAmount === amount ? colors.primary : colors.card,
                    borderColor: colors.border,
                  }
                ]}
                onPress={() => {
                  setSelectedAmount(amount);
                  setCustomAmount('');
                }}
              >
                <Text
                  style={[
                    styles.amountText,
                    {
                      color: selectedAmount === amount ? 'white' : colors.text,
                    }
                  ]}
                >
                  ${amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Custom Amount */}
          <View style={styles.customAmountSection}>
            <Text style={[styles.customAmountLabel, { color: colors.text }]}>Or enter custom amount:</Text>
            <View style={[styles.customAmountInput, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.dollarSign, { color: colors.icon }]}>$</Text>
              <TextInput
                style={[styles.amountTextInput, { color: colors.text }]}
                placeholder="0.00"
                placeholderTextColor={colors.icon}
                value={customAmount}
                onChangeText={(text) => {
                  setCustomAmount(text);
                  setSelectedAmount('');
                }}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Giving Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Impact</Text>
          <View style={[styles.impactCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.impactItem}>
              <View style={[styles.impactIcon, { backgroundColor: '#3498DB' }]}>
                <IconSymbol name="person.2.fill" size={20} color="white" />
              </View>
              <View style={styles.impactContent}>
                <Text style={[styles.impactTitle, { color: colors.text }]}>Community Support</Text>
                <Text style={[styles.impactDescription, { color: colors.icon }]}>
                  Your giving helps support community outreach and local families in need.
                </Text>
              </View>
            </View>

            <View style={styles.impactItem}>
              <View style={[styles.impactIcon, { backgroundColor: '#E74C3C' }]}>
                <IconSymbol name="house.fill" size={20} color="white" />
              </View>
              <View style={styles.impactContent}>
                <Text style={[styles.impactTitle, { color: colors.text }]}>Ministry Growth</Text>
                <Text style={[styles.impactDescription, { color: colors.icon }]}>
                  Support the growth of church ministries and programs for all ages.
                </Text>
              </View>
            </View>

            <View style={styles.impactItem}>
              <View style={[styles.impactIcon, { backgroundColor: '#27AE60' }]}>
                <IconSymbol name="paperplane.fill" size={20} color="white" />
              </View>
              <View style={styles.impactContent}>
                <Text style={[styles.impactTitle, { color: colors.text }]}>Global Missions</Text>
                <Text style={[styles.impactDescription, { color: colors.icon }]}>
                  Help spread the Gospel around the world through missionary work.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Security Information */}
        <View style={styles.section}>
          <View style={[styles.securityCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.securityHeader}>
              <IconSymbol name="house.fill" size={24} color="#27AE60" />
              <Text style={[styles.securityTitle, { color: colors.text }]}>Secure & Safe</Text>
            </View>
            <Text style={[styles.securityDescription, { color: colors.icon }]}>
              Your donation is processed securely using industry-standard encryption. 
              All transactions are protected and your information is kept confidential.
            </Text>
          </View>
        </View>

        {/* Give Button */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.giveButton, { backgroundColor: '#27AE60' }]}
            onPress={handleGiving}
          >
            <Text style={styles.giveButtonText}>
              Give ${selectedAmount || customAmount || '0.00'} to {selectedType}
            </Text>
          </TouchableOpacity>

          <Text style={[styles.disclaimer, { color: colors.icon }]}>
            By proceeding, you agree to our terms of service and privacy policy.
          </Text>
        </View>

        {/* Alternative Giving Methods */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Other Ways to Give</Text>
          
          <TouchableOpacity style={[styles.methodItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.methodIcon, { backgroundColor: colors.primary }]}>
              <IconSymbol name="house.fill" size={20} color="white" />
            </View>
            <View style={styles.methodContent}>
              <Text style={[styles.methodTitle, { color: colors.text }]}>Bank Transfer</Text>
              <Text style={[styles.methodDescription, { color: colors.icon }]}>
                Account: 12345678 | Routing: 987654321
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.methodItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.methodIcon, { backgroundColor: colors.primary }]}>
              <IconSymbol name="paperplane.fill" size={20} color="white" />
            </View>
            <View style={styles.methodContent}>
              <Text style={[styles.methodTitle, { color: colors.text }]}>Mail a Check</Text>
              <Text style={[styles.methodDescription, { color: colors.icon }]}>
                GCCMA, 123 Church Street, Faith City, FC 12345
              </Text>
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
  quoteCard: {
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  quoteReference: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  typeChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  amountButton: {
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  customAmountSection: {
    marginTop: 10,
  },
  customAmountLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  customAmountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  dollarSign: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  amountTextInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  impactCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  impactItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  impactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  impactContent: {
    flex: 1,
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  impactDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  securityCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  securityDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  giveButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  giveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disclaimer: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  methodItem: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  methodContent: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  methodDescription: {
    fontSize: 14,
  },
});
