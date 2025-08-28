import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Users, Plus, Phone, MessageCircle, MapPin, CreditCard as Edit3, Trash2, Shield } from 'lucide-react-native';

export default function ContactsScreen() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: 'Mom', phone: '+1 (555) 123-4567', relationship: 'Family' },
    { id: 2, name: 'Sarah (Roommate)', phone: '+1 (555) 987-6543', relationship: 'Friend' },
    { id: 3, name: 'Campus Security', phone: '+1 (555) 555-0911', relationship: 'Security' },
  ]);

  const handleAddContact = () => {
    if (newContactName && newContactPhone) {
      const newContact = {
        id: emergencyContacts.length + 1,
        name: newContactName,
        phone: newContactPhone,
        relationship: 'Friend',
      };
      setEmergencyContacts([...emergencyContacts, newContact]);
      setNewContactName('');
      setNewContactPhone('');
      setShowAddForm(false);
    }
  };

  const handleCallContact = (contact: any) => {
    Alert.alert(
      'Call Contact',
      `Call ${contact.name} at ${contact.phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log(`Calling ${contact.phone}`) },
      ]
    );
  };

  const handleSendLocation = (contact: any) => {
    Alert.alert(
      'Share Location',
      `Send your current location to ${contact.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send', onPress: () => console.log(`Sharing location with ${contact.name}`) },
      ]
    );
  };

  const handleEmergencyAlert = () => {
    Alert.alert(
      'Emergency Alert',
      'Send emergency alert to all contacts with your location?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Send Alert', 
          style: 'destructive',
          onPress: () => console.log('Emergency alert sent to all contacts') 
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Emergency Contacts</Text>
          <Text style={styles.subtitle}>Manage your trusted contacts</Text>
        </View>

        {/* Emergency Alert Button */}
        <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyAlert}>
          <Shield size={24} color="#FFFFFF" />
          <Text style={styles.emergencyButtonText}>Send Emergency Alert to All</Text>
        </TouchableOpacity>

        {/* Add Contact Button */}
        <TouchableOpacity 
          style={styles.addContactButton}
          onPress={() => setShowAddForm(!showAddForm)}
        >
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.addContactText}>Add Emergency Contact</Text>
        </TouchableOpacity>

        {/* Add Contact Form */}
        {showAddForm && (
          <View style={styles.addForm}>
            <Text style={styles.formTitle}>New Emergency Contact</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Contact Name"
              placeholderTextColor="#6B7280"
              value={newContactName}
              onChangeText={setNewContactName}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#6B7280"
              value={newContactPhone}
              onChangeText={setNewContactPhone}
              keyboardType="phone-pad"
            />
            
            <View style={styles.formButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowAddForm(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.saveButton, (!newContactName || !newContactPhone) && styles.saveButtonDisabled]}
                onPress={handleAddContact}
                disabled={!newContactName || !newContactPhone}
              >
                <Text style={styles.saveButtonText}>Add Contact</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Emergency Contacts List */}
        <View style={styles.contactsContainer}>
          <Text style={styles.sectionTitle}>Your Emergency Contacts</Text>
          {emergencyContacts.map((contact) => (
            <View key={contact.id} style={styles.contactCard}>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
                <Text style={styles.contactRelationship}>{contact.relationship}</Text>
              </View>
              
              <View style={styles.contactActions}>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.callButton]}
                  onPress={() => handleCallContact(contact)}
                >
                  <Phone size={18} color="#FFFFFF" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, styles.messageButton]}
                  onPress={() => console.log(`Message ${contact.name}`)}
                >
                  <MessageCircle size={18} color="#FFFFFF" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, styles.locationButton]}
                  onPress={() => handleSendLocation(contact)}
                >
                  <MapPin size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Safety Features */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Safety Features</Text>
          
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Shield size={24} color="#10B981" />
            </View>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>Auto Location Sharing</Text>
              <Text style={styles.featureDescription}>
                Automatically share your location when walking at night
              </Text>
            </View>
            <TouchableOpacity style={styles.toggleSwitch}>
              <View style={styles.switchActive} />
            </TouchableOpacity>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Phone size={24} color="#3B82F6" />
            </View>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>Emergency Call Shortcut</Text>
              <Text style={styles.featureDescription}>
                Double tap power button to call emergency contacts
              </Text>
            </View>
            <TouchableOpacity style={styles.toggleSwitch}>
              <View style={styles.switchActive} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Important Numbers */}
        <View style={styles.numbersContainer}>
          <Text style={styles.sectionTitle}>Important Numbers</Text>
          
          <TouchableOpacity style={styles.numberCard}>
            <Text style={styles.numberTitle}>Emergency Services</Text>
            <Text style={styles.numberPhone}>911</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.numberCard}>
            <Text style={styles.numberTitle}>Campus Security</Text>
            <Text style={styles.numberPhone}>(555) 555-0911</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.numberCard}>
            <Text style={styles.numberTitle}>Local Police (Non-Emergency)</Text>
            <Text style={styles.numberPhone}>(555) 555-0311</Text>
          </TouchableOpacity>
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
    paddingBottom: 20,
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
  emergencyButton: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  addContactButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  addContactText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  addForm: {
    backgroundColor: '#1F2937',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#374151',
    color: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
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
  saveButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#374151',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  contactsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  contactCard: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactPhone: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 2,
  },
  contactRelationship: {
    color: '#6B7280',
    fontSize: 12,
  },
  contactActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  callButton: {
    backgroundColor: '#10B981',
  },
  messageButton: {
    backgroundColor: '#3B82F6',
  },
  locationButton: {
    backgroundColor: '#F59E0B',
  },
  featuresContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  featureCard: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    marginRight: 16,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  toggleSwitch: {
    width: 44,
    height: 24,
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  switchActive: {
    width: 20,
    height: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  numbersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  numberCard: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numberTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  numberPhone: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
  },
});