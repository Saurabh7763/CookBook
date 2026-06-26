import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import tailwind from 'twrnc';
import { useTheme } from "../context/ThemeContext";

const Categories = ({ itemData = [], isActive, setIsActive }) => {
  const { theme } = useTheme();

  return (
    <View style={tailwind`px-1`}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tailwind`px-3 pt-2 pb-2`}
      >
        {itemData.map((item) => {
          const active = isActive === item.strCategory;
          return (
            <TouchableOpacity
              key={item.idCategory}
              onPress={() => setIsActive(item.strCategory)}
              style={tailwind`mr-4 items-center`}
            >
              <View style={[
                  tailwind`p-1.5 rounded-full border-2`,
                  { borderColor: active ? '#f59e0b' : 'transparent' }
              ]}>
                <Image
                  source={{ uri: item.strCategoryThumb }}
                  style={[
                      tailwind`rounded-full`,
                      { width: 50, height: 50 }
                  ]}
                />
              </View>
              <Text style={[
                  tailwind`mt-2 text-xs font-bold`,
                  { color: active ? '#f59e0b' : (theme === 'light' ? '#6b7280' : '#9ca3af') }
              ]}>
                {item.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Categories;

