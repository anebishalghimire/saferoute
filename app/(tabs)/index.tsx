import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Dimensions
} from 'react-native';
import { MapPin, Navigation, Shield, Zap, Users, CircleAlert as AlertCircle, Phone } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function RouteScreen() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [isRoutePlanning, setIsRoutePlanning] = useState(false);

  const handleSOS = () => {
    // SOS functionality would be implemented here
    console.log('SOS activated!');
  };

  const handlePlanRoute = () => {
    setIsRoutePlanning(true);
    // Route planning logic would be implemented here
    setTimeout(() => setIsRoutePlanning(false), 2000);
  };

  const safetyMetrics = [
    { icon: Shield, label: 'Street Lighting', value: '85%', color: '#10B981' },
    { icon: Users, label: 'Crowd Density', value: 'Medium', color: '#F59E0B' },
    { icon: AlertCircle, label: 'Recent Reports', value: '2 this week', color: '#EF4444' },
  ];

  return (
    <View style={styles.container}>
      {/* Emergency SOS Button */}
      <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
        <Phone size={32} color="#FFFFFF" />
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SafeRoute</Text>
          <Text style={styles.subtitle}>Plan your safest route home</Text>
        </View>

        {/* Location Inputs */}
        <View style={styles.locationContainer}>
          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <MapPin size={20} color="#10B981" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="From (Current Location)"
              placeholderTextColor="#6B7280"
              value={fromLocation}
              onChangeText={setFromLocation}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Navigation size={20} color="#EF4444" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="To (Destination)"
              placeholderTextColor="#6B7280"
              value={toLocation}
              onChangeText={setToLocation}
            />
          </View>

          <TouchableOpacity 
            style={[styles.planButton, isRoutePlanning && styles.planButtonDisabled]}
            onPress={handlePlanRoute}
            disabled={isRoutePlanning}
          >
            <Text style={styles.planButtonText}>
              {isRoutePlanning ? 'Finding Safest Route...' : 'Plan Safe Route'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Safety Metrics */}
        <View style={styles.metricsContainer}>
          <Text style={styles.sectionTitle}>Current Area Safety</Text>
          {safetyMetrics.map((metric, index) => (
            <View key={index} style={styles.metricCard}>
              <View style={styles.metricIcon}>
                <metric.icon size={24} color={metric.color} />
              </View>
              <View style={styles.metricInfo}>
                <Text style={styles.metricLabel}>{metric.label}</Text>
                <Text style={[styles.metricValue, { color: metric.color }]}>
                  {metric.value}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Zap size={28} color="#F59E0B" />
              <Text style={styles.actionText}>Report Incident</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Shield size={28} color="#10B981" />
              <Text style={styles.actionText}>Share Location</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Safety Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>Night Safety Tips</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>
              • Stay in well-lit areas when possible
            </Text>
            <Text style={styles.tipText}>
              • Keep your phone charged and accessible
            </Text>
            <Text style={styles.tipText}>
              • Trust your instincts - if something feels wrong, find help
            </Text>
          </View>
        </View>
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
  sosButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#EF4444',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sosText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
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
  locationContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 16,
  },
  planButton: {
    backgroundColor: '#10B981',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  planButtonDisabled: {
    backgroundColor: '#6B7280',
  },
  planButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  metricsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  metricCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  metricIcon: {
    marginRight: 16,
  },
  metricInfo: {
    flex: 1,
  },
  metricLabel: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#1F2937',
    width: (width - 56) / 2,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center',
  },
  tipsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  tipCard: {
    backgroundColor: '#1F2937',
    padding: 20,
    borderRadius: 12,
  },
  tipText: {
    color: '#D1D5DB',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 8,
  },
});