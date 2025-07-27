import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LiveStreamScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const colors = Colors[colorScheme ?? 'light'];
  const [isLive, setIsLive] = useState(true);
  const [viewerCount, setViewerCount] = useState(142);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Simulate viewer count updates
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleShare = () => {
    Alert.alert(
      'Share Live Stream',
      'Share this live service with friends and family!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Share', onPress: () => Alert.alert('Shared!', 'Live stream link shared successfully') },
      ]
    );
  };

  const handleFullscreen = () => {
    Alert.alert('Fullscreen', 'Entering fullscreen mode...');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: '#E74C3C' }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left.forwardslash.chevron.right" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Live Service</Text>
          {isLive && (
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
              <Text style={styles.viewerCount}>{viewerCount} viewers</Text>
            </View>
          )}
        </View>
      </View>

      {/* Video Player Area */}
      <View style={[styles.videoContainer, { backgroundColor: '#000' }]}>
        {!isPlaying ? (
          <View style={styles.videoPlaceholder}>
            <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
              <IconSymbol name="play.circle.fill" size={80} color="white" />
            </TouchableOpacity>
            <Text style={styles.videoTitle}>Sunday Morning Service</Text>
            <Text style={styles.videoSubtitle}>July 27, 2025 • 10:00 AM</Text>
          </View>
        ) : (
          <View style={styles.videoPlayer}>
            {/* Video controls overlay */}
            <View style={styles.videoControls}>
              <TouchableOpacity style={styles.controlButton} onPress={handlePlayPause}>
                <IconSymbol name="play.circle.fill" size={40} color="white" />
              </TouchableOpacity>
              
              <View style={styles.controlsRight}>
                <TouchableOpacity style={styles.controlButton} onPress={handleShare}>
                  <IconSymbol name="paperplane.fill" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton} onPress={handleFullscreen}>
                  <IconSymbol name="house.fill" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            
            <Text style={styles.streamingText}>🔴 Streaming Live</Text>
          </View>
        )}
      </View>

      {/* Service Information */}
      <View style={styles.serviceInfo}>
        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.serviceTitle, { color: colors.text }]}>Sunday Morning Worship</Text>
          <Text style={[styles.serviceTime, { color: colors.icon }]}>10:00 AM - 12:00 PM EST</Text>
          <Text style={[styles.serviceSpeaker, { color: colors.tint }]}>Pastor John Smith</Text>
          <Text style={[styles.serviceDescription, { color: colors.text }]}>
            Join us for a time of worship, prayer, and God's word as we gather as a community of believers.
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/giving')}
          >
            <IconSymbol name="house.fill" size={20} color="white" />
            <Text style={styles.actionButtonText}>Give</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#27AE60' }]}
            onPress={() => router.push('/prayer-request')}
          >
            <IconSymbol name="paperplane.fill" size={20} color="white" />
            <Text style={styles.actionButtonText}>Prayer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#9B59B6' }]}
            onPress={handleShare}
          >
            <IconSymbol name="paperplane.fill" size={20} color="white" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Schedule */}
        <View style={[styles.scheduleCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.scheduleTitle, { color: colors.text }]}>This Week's Services</Text>
          
          <View style={styles.scheduleItem}>
            <View style={styles.scheduleTime}>
              <Text style={[styles.scheduleDay, { color: colors.text }]}>SUN</Text>
              <Text style={[styles.scheduleHour, { color: colors.icon }]}>10:00</Text>
            </View>
            <View style={styles.scheduleDetails}>
              <Text style={[styles.scheduleEventTitle, { color: colors.text }]}>Morning Worship</Text>
              <Text style={[styles.scheduleEventDesc, { color: colors.icon }]}>Main Sanctuary</Text>
            </View>
            <View style={[styles.liveTag, { backgroundColor: '#E74C3C' }]}>
              <Text style={styles.liveTagText}>LIVE</Text>
            </View>
          </View>

          <View style={styles.scheduleItem}>
            <View style={styles.scheduleTime}>
              <Text style={[styles.scheduleDay, { color: colors.text }]}>SUN</Text>
              <Text style={[styles.scheduleHour, { color: colors.icon }]}>18:00</Text>
            </View>
            <View style={styles.scheduleDetails}>
              <Text style={[styles.scheduleEventTitle, { color: colors.text }]}>Evening Service</Text>
              <Text style={[styles.scheduleEventDesc, { color: colors.icon }]}>Main Sanctuary</Text>
            </View>
          </View>

          <View style={styles.scheduleItem}>
            <View style={styles.scheduleTime}>
              <Text style={[styles.scheduleDay, { color: colors.text }]}>WED</Text>
              <Text style={[styles.scheduleHour, { color: colors.icon }]}>19:30</Text>
            </View>
            <View style={styles.scheduleDetails}>
              <Text style={[styles.scheduleEventTitle, { color: colors.text }]}>Bible Study</Text>
              <Text style={[styles.scheduleEventDesc, { color: colors.icon }]}>Conference Room A</Text>
            </View>
          </View>
        </View>

        {/* Previous Services */}
        <View style={[styles.previousCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.previousTitle, { color: colors.text }]}>Previous Services</Text>
          <Text style={[styles.previousDescription, { color: colors.icon }]}>
            Missed a service? Watch previous sermons and catch up on God's word.
          </Text>
          <TouchableOpacity
            style={[styles.previousButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/sermons')}
          >
            <IconSymbol name="play.circle.fill" size={20} color="white" />
            <Text style={styles.previousButtonText}>Watch Previous Services</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 60,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF0000',
    marginRight: 8,
  },
  liveText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  },
  viewerCount: {
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
  },
  videoContainer: {
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    marginBottom: 20,
  },
  videoTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  videoSubtitle: {
    color: 'white',
    fontSize: 16,
    opacity: 0.8,
  },
  videoPlayer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    padding: 20,
  },
  videoControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlButton: {
    padding: 10,
  },
  controlsRight: {
    flexDirection: 'row',
  },
  streamingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  serviceInfo: {
    flex: 1,
    padding: 20,
  },
  infoCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  serviceTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  serviceTime: {
    fontSize: 16,
    marginBottom: 5,
  },
  serviceSpeaker: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  serviceDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  scheduleCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  scheduleTime: {
    alignItems: 'center',
    marginRight: 15,
    minWidth: 50,
  },
  scheduleDay: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  scheduleHour: {
    fontSize: 16,
    fontWeight: '600',
  },
  scheduleDetails: {
    flex: 1,
  },
  scheduleEventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  scheduleEventDesc: {
    fontSize: 14,
  },
  liveTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  liveTagText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  previousCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  previousTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  previousDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 15,
  },
  previousButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  previousButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
