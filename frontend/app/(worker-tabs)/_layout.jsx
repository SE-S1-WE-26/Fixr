import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";

import TabIcon from "../../components/common/TabIcon";
import { icons } from "../../constants";

const WorkerTabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="myjobs"
          options={{
            title: "My Jobs",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.jobs}
                color={color}
                name="My Jobs"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="earnings"
          options={{
            title: "My Earnings",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.earnings}
                color={color}
                name="My Earnings"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />


      </Tabs>
    </>
  );
};

export default WorkerTabsLayout;
