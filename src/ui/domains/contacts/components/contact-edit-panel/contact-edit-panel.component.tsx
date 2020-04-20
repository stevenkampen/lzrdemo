import * as React from 'react';

import { Text, View, Button, StyleSheet, TextInput, Image, TouchableOpacity, Linking, TouchableHighlight, Alert, BackHandler } from 'react-native';

import {
  ContactEditPanelProps,
} from './contact-edit-panel.types';

export const ContactEditPanelComponent = ({
  contact,
  onSave,
  onCancel,
}: ContactEditPanelProps) => {
  const [editedContact, setEditedContact] = React.useState(contact);
  const [editable, setEditable] = React.useState(false);

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      onCancel();
      return true;
    });
  }, []);

  return (
    <View style={[styles.profileContainer]}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: contact.avatar }}
        />
      </View>
      <TextInput
        editable={editable}
        autoCorrect={false}
        defaultValue={editedContact.firstName}
        onChangeText={newValue => setEditedContact({ ...editedContact, firstName: newValue})}
        accessibilityLabel="Edit First Name"
      />
      <TextInput
        editable={editable}
        autoCorrect={false}
        defaultValue={editedContact.lastName}
        onChangeText={newValue => setEditedContact({ ...editedContact, lastName: newValue})}
        accessibilityLabel="Edit Last Name"
      />
      {editable
        ? <TextInput
            autoCorrect={false}
            defaultValue={editedContact.email}
            onChangeText={newValue => setEditedContact({ ...editedContact, email: newValue})}
            accessibilityLabel="Edit Email Address"
          />
        : <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => {
              const mailURL = `mailto:${contact.email}`;
              Linking.canOpenURL(mailURL)
                .then((supported) => {
                  if (supported) {
                    // alert('Attempting to open...');
                    return Linking.openURL(mailURL)
                      .catch(() => null);
                  } else {
                    // alert('Are you on an ios Simulator, then mailto: possibly won\'t work.');
                  }
                });
            }}>
            <Text>{contact.email}</Text>
          </TouchableHighlight>
      }
      {editable
        ? <View>
          <Button
            title={'Save'}
            onPress={() => {
              onSave(editedContact);
              setEditable(false);
            }}
          />
          <Button
            title={'Cancel'}
            onPress={() => {
              setEditable(false);
              setEditedContact({ ...contact });
            }}
          />
        </View>
      : <View>
          <Button
            title={'Edit'}
            onPress={() => setEditable(true)}
          />
          <Button
            title={'Back'}
            onPress={() => onCancel()}
          />
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {

  },
  avatar: {
    height: 100,
    width: 100,
    resizeMode: 'stretch',
  },
});

