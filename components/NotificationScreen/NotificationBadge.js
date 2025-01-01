// NotificationBadge.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationBadge = ({ numberOfUnseenNotifications }) => {
    // Only render the badge if the count is greater than 0
    if (numberOfUnseenNotifications <= 0) return null;

    return (
        <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{numberOfUnseenNotifications}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badgeContainer: {
        position: 'absolute',
        right: -15,
        top: -10,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
    }
});

// Use React.memo to prevent unnecessary re-renders
export default React.memo(NotificationBadge);
