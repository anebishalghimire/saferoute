import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { User, Bell, Shield, MapPin, Moon, Smartphone, CircleHelp as HelpCircle, Settings, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [locationSharing, setLocationSharing] = React.useState(true);
  const [nightMode, setNightMode] = React.useState(true);
  const [emergencyMode, setEmergencyMode] = React.useState(false);

  const settingsOptions = [
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Safety alerts and updates',
      hasSwitch: true,
      value: notifications,
      onToggle: setNotifications,
    },
    {
      icon: MapPin,
      title: 'Location Sharing',
      description: 'Share location with emergency contacts',
      hasSwitch: true,
      value: locationSharing,
      onToggle: setLocationSharing,
    },
    {
      icon: Moon,
      title: 'Night Mode',
      description: 'Optimized for low light conditions',
      hasSwitch: true,
      value: nightMode,
      onToggle: setNightMode,
    },
    {
      icon: Shield,
      title: 'Emergency Mode',
      description: 'Enhanced safety features',
      hasSwitch: true,
      value: emergencyMode,
      onToggle: setEmergencyMode,
    },
  ];

  const menuOptions = [
    {
      icon: Smartphone,
      title: 'Privacy Settings',
      description: 'Data and privacy controls',
      onPress: () => console.log('Privacy Settings'),
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Get help and report issues',
      onPress: () => console.log('Help & Support'),
    },
    {
      icon: Settings,
      title: 'App Settings',
      description: 'General app preferences',
      onPress: () => console.log('App Settings'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>Manage your safety preferences</Text>
        </View>

        {/* User Profile */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <User size={40} color="#3B82F6" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Alex Johnson</Text>
            <Text style={styles.userEmail}>alex.johnson@university.edu</Text>
            <Text style={styles.userStatus}>🟢 Safe and Active</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Safety Statistics */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Your Safety Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Safe Routes Taken</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statNumber, { color: '#10B981' }]}>7</Text>
              <Text style={styles.statLabel}>Reports Submitted</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statNumber, { color: '#3B82F6' }]}>156</Text>
              <Text style={styles.statLabel}>Hours Protected</Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Safety Settings</Text>
          {settingsOptions.map((option, index) => (
            <View key={index} style={styles.settingCard}>
              <View style={styles.settingIcon}>
                <option.icon size={24} color="#3B82F6" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>{option.title}</Text>
                <Text style={styles.settingDescription}>{option.description}</Text>
              </View>
              {option.hasSwitch && (
                <Switch
                  value={option.value}
                  onValueChange={option.onToggle}
                  trackColor={{ false: '#374151', true: '#10B981' }}
                  thumbColor={option.value ? '#FFFFFF' : '#9CA3AF'}
                />
              )}
            </View>
          ))}
        </View>

        {/* Menu Options */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>More Options</Text>
          {menuOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.menuCard} onPress={option.onPress}>
              <View style={styles.menuIcon}>
                <option.icon size={24} color="#9CA3AF" />
              </View>
              <View style={styles.menuInfo}>
                <Text style={styles.menuTitle}>{option.title}</Text>
                <Text style={styles.menuDescription}>{option.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Emergency Information */}
        <View style={styles.emergencyInfo}>
          <View style={styles.emergencyIcon}>
            <Shield size={24} color="#EF4444" />
          </View>
          <View style={styles.emergencyText}>
            <Text style={styles.emergencyTitle}>Emergency Information</Text>
            <Text style={styles.emergencyDescription}>
              In case of emergency, the app will automatically notify your emergency contacts 
              and share your location. Make sure your contacts are up to date.
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>SafeRoute v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  profileCard: {
    backgroundColor: '#1F2937',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 4,
  },
  userStatus: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#1F2937',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'center',
  },
  settingsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  settingCard: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 16,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  menuCard: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuInfo: {
    flex: 1,
  },
  menuTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuDescription: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  emergencyInfo: {
    backgroundColor: '#1F2937',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  emergencyIcon: {
    marginRight: 16,
  },
  emergencyText: {
    flex: 1,
  },
  emergencyTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  emergencyDescription: {
    color: '#9CA3AF',
    fontSize: 14,
    lineHeight: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2937',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EF4444',
    marginBottom: 20,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  versionText: {
    color: '#6B7280',
    fontSize: 12,
    textAlign: 'center',
    paddingBottom: 30,
  },
});