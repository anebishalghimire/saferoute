import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { TriangleAlert as AlertTriangle, MapPin, Clock, Plus, Shield, Eye, Lightbulb } from 'lucide-react-native';

export default function ReportsScreen() {
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportDescription, setReportDescription] = useState('');
  const [reportType, setReportType] = useState('');

  const recentReports = [
    {
      id: 1,
      type: 'Poor Lighting',
      location: 'Main St & 5th Ave',
      time: '2 hours ago',
      severity: 'medium',
      icon: Lightbulb,
      color: '#F59E0B',
    },
    {
      id: 2,
      type: 'Suspicious Activity',
      location: 'Park Avenue',
      time: '5 hours ago',
      severity: 'high',
      icon: Eye,
      color: '#EF4444',
    },
    {
      id: 3,
      type: 'Well Lit Area',
      location: 'University District',
      time: '1 day ago',
      severity: 'safe',
      icon: Shield,
      color: '#10B981',
    },
  ];

  const reportTypes = [
    { id: 'lighting', name: 'Poor Lighting', icon: Lightbulb, color: '#F59E0B' },
    { id: 'suspicious', name: 'Suspicious Activity', icon: Eye, color: '#EF4444' },
    { id: 'safe', name: 'Safe Area', icon: Shield, color: '#10B981' },
    { id: 'harassment', name: 'Harassment', icon: AlertTriangle, color: '#EF4444' },
  ];

  const handleSubmitReport = () => {
    // Report submission logic would be implemented here
    console.log('Report submitted:', { reportType, reportDescription });
    setShowReportForm(false);
    setReportDescription('');
    setReportType('');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Safety Reports</Text>
          <Text style={styles.subtitle}>Community-driven safety data</Text>
        </View>

        {/* Add Report Button */}
        <TouchableOpacity 
          style={styles.addReportButton}
          onPress={() => setShowReportForm(!showReportForm)}
        >
          <Plus size={24} color="#FFFFFF" />
          <Text style={styles.addReportText}>Report Incident or Safe Area</Text>
        </TouchableOpacity>

        {/* Report Form */}
        {showReportForm && (
          <View style={styles.reportForm}>
            <Text style={styles.formTitle}>Submit Report</Text>
            
            <View style={styles.reportTypeGrid}>
              {reportTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.reportTypeCard,
                    reportType === type.id && { backgroundColor: type.color + '20', borderColor: type.color }
                  ]}
                  onPress={() => setReportType(type.id)}
                >
                  <type.icon size={20} color={type.color} />
                  <Text style={[styles.reportTypeText, { color: type.color }]}>
                    {type.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.descriptionInput}
              placeholder="Describe the incident or safety information..."
              placeholderTextColor="#6B7280"
              value={reportDescription}
              onChangeText={setReportDescription}
              multiline
              numberOfLines={4}
            />

            <View style={styles.formButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowReportForm(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.submitButton, (!reportType || !reportDescription) && styles.submitButtonDisabled]}
                onPress={handleSubmitReport}
                disabled={!reportType || !reportDescription}
              >
                <Text style={styles.submitButtonText}>Submit Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Recent Reports */}
        <View style={styles.reportsContainer}>
          <Text style={styles.sectionTitle}>Recent Reports</Text>
          {recentReports.map((report) => (
            <View key={report.id} style={styles.reportCard}>
              <View style={styles.reportHeader}>
                <View style={styles.reportIcon}>
                  <report.icon size={20} color={report.color} />
                </View>
                <View style={styles.reportInfo}>
                  <Text style={styles.reportType}>{report.type}</Text>
                  <View style={styles.reportLocation}>
                    <MapPin size={14} color="#6B7280" />
                    <Text style={styles.locationText}>{report.location}</Text>
                  </View>
                </View>
                <View style={styles.reportTime}>
                  <Clock size={14} color="#6B7280" />
                  <Text style={styles.timeText}>{report.time}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Safety Statistics */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>This Week's Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>New Reports</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statNumber, { color: '#10B981' }]}>8</Text>
              <Text style={styles.statLabel}>Safe Areas</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statNumber, { color: '#EF4444' }]}>4</Text>
              <Text style={styles.statLabel}>Incidents</Text>
            </View>
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
  addReportButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  addReportText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  reportForm: {
    backgroundColor: '#1F2937',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  reportTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  reportTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  reportTypeText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '600',
  },
  descriptionInput: {
    backgroundColor: '#374151',
    color: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    fontSize: 14,
    textAlignVertical: 'top',
    minHeight: 100,
    marginBottom: 16,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#6B7280',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#374151',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  reportsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  reportCard: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportIcon: {
    marginRight: 12,
  },
  reportInfo: {
    flex: 1,
  },
  reportType: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  reportLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#6B7280',
    fontSize: 14,
    marginLeft: 4,
  },
  reportTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: '#6B7280',
    fontSize: 12,
    marginLeft: 4,
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
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
});