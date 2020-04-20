import * as React from 'react';

import { ContactsListProps } from './contacts-list.types';
import { View, TouchableHighlight, FlatList, Text, ActivityIndicator, StyleSheet, Platform, Button } from 'react-native';

export const ContactsList = ({
  contacts,
  contactIdList,
  getNextPage,
  gotoContactDetailRoute,
  lastPage,
  totalPages,
}: ContactsListProps) => {
  const atFinish = totalPages <= lastPage;
  return (
    <>
      {!contactIdList.length
        ? <View style={[styles.activityContainer]}>
            <ActivityIndicator size="large" color="#000000" />
          </View>
        : <View style={[styles.listContainer]}>
            <FlatList
              style={styles.flatList}
              data={contactIdList.concat([-1])}
              keyExtractor={item => item.toString()}
              renderItem={({ item }) => (
                item !== -1
                  ? <TouchableHighlight
                      style={styles.row}
                      key={item}
                      onPress={() => gotoContactDetailRoute(item)}>
                      <Text>ID: {item} - {contacts[item].firstName} {contacts[item].lastName}</Text>
                    </TouchableHighlight>
                  : <View style={styles.loadMore}>
                      {atFinish && <Text>You've reached the end...</Text>}
                      <Button key={-1} title="Load More" disabled={atFinish} onPress={() =>
                        {
                          if (!atFinish) {
                            getNextPage(lastPage + 1);
                          }
                        }}
                      ></Button>
                    </View>
              )}
            />
          </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadMore: {
    paddingTop: 8,
    alignItems: 'center',
  },
  listContainer: {
    // alignItems: 'center',
    paddingTop: '20%',
  },
  flatList: {
    height: '100%',
  },
  row: {
    padding: 5,
  }
});