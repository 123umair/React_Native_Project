import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Share } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/services/Colors'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'; // 1. Add this import

export default function Profile() {


const { user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  // 2. Add this Effect to handle auto-redirect
  useEffect(() => {
    if (isLoaded && !user) {
      router.replace('/'); // Redirect to your login/index page
    }
  }, [user, isLoaded]);
  // Menu List Data
  const menuList = [
    {
      id: 1,
      name: 'Explore',
      icon: 'search-outline',
      path: '/tabs/Explore' // Update path based on your expo-router config
    },
    {
      id: 2,
      name: 'Favorite',
      icon: 'heart-outline',
      path: '/tabs/Favourite'
    },
    {
      id: 3,
      name: 'Share',
      icon: 'share-social-outline',
      path: 'share'
    },
    {
      id: 4,
      name: 'Contact us',
      icon: 'mail-outline',
      path: 'contact'
    },
    {
      id: 5,
      name: 'Logout',
      icon: 'log-out-outline',
      path: 'logout'
    }
  ];

  const onMenuPress = async (menu: any) => {
    if (menu.path === 'logout') {
      await signOut();
      return;
    }
    if (menu.path === 'share') {
      Share.share({
        message: 'Check out this Business Directory App!'
      });
      return;
    }
    
    // Navigate to tabs
    router.push(menu.path);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Upper Green Background Section */}
      <View style={styles.headerBackground}>
        <Text style={styles.headerTitle}>Profile</Text>
        
        {/* User Info Card */}
        <View style={styles.userCard}>
          <Image 
            source={{ uri: user?.imageUrl }} 
            style={styles.userImage} 
          />
          <View>
            <Text style={styles.userName}>{user?.fullName}</Text>
            <Text style={styles.userEmail}>{user?.primaryEmailAddress?.emailAddress}</Text>
          </View>
        </View>
      </View>

      {/* Menu List */}
      <View style={styles.menuContainer}>
        <FlatList
          data={menuList}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => onMenuPress(item)}
              style={styles.menuItem}
            >
              <View style={styles.menuLeftSection}>
                <View style={[styles.iconBg, item.name === 'Logout' && {backgroundColor: '#fff1f1'}]}>
                   <Ionicons 
                    name={item.icon as any} 
                    size={22} 
                    color={item.name === 'Logout' ? '#ff4d4d' : Colors.PRIMARY} 
                  />
                </View>
                <Text style={[styles.menuText, item.name === 'Logout' && {color: '#ff4d4d'}]}>
                  {item.name}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={item.name === 'Logout' ? '#ff4d4d' : Colors.Gray} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerBackground: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.PRIMARY, // Ensure this is Green in your Colors file
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: 200
  },
  headerTitle: {
    fontFamily: 'appFontBold',
    fontSize: 24,
    color: Colors.WHITE,
    marginBottom: 20
  },
  userCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 15,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 99
  },
  userName: {
    fontFamily: 'appFontBold',
    fontSize: 18
  },
  userEmail: {
    fontFamily: 'appFont',
    fontSize: 12,
    color: Colors.Gray
  },
  menuContainer: {
    marginTop: 40,
    paddingHorizontal: 25
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 10
  },
  menuLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  iconBg: {
    padding: 10,
    backgroundColor: '#f0f0ff', // Light shade of primary
    borderRadius: 10
  },
  menuText: {
    fontFamily: 'appFont',
    fontSize: 16
  }
})