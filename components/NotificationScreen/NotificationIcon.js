import React, { memo, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { useUserDataContext } from "../../hooks/userDataContext";

const NotificationIcon = ({ color }) => {
    const { notifications } = useUserDataContext();

    // Memoize the calculation of unseen notifications
    const numberOfUnseenNotifications = useMemo(() => {
        return notifications.filter(notification => !notification.seen).length;
    }, [notifications]);

    return (
        <View style={styles.container}>
            <FontAwesome name='bell' size={24} color={color} />
            {numberOfUnseenNotifications > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{numberOfUnseenNotifications}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 24, // Set a width and height for the parent container
        height: 24,
    },
    badge: {
        position: 'absolute',
        right: -10, // Adjust positioning to ensure it appears correctly
        top: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, // Ensure the badge is on top of the icon
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
    }
});

export default memo(NotificationIcon);

