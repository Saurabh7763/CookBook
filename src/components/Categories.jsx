import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import tailwind from 'twrnc';

const Categories = ({ itemData = [], isActive, setIsActive }) => {
  return (
    <View style={tailwind`mx-3`}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tailwind`py-1`}
      >
        {itemData.map((item) => (
          <TouchableOpacity
            key={item.idCategory}
            onPress={() => setIsActive(item.strCategory)}
            style={[
              tailwind`mr-1 items-center px-2 py-1 rounded-2xl`,
              {
                backgroundColor:
                  isActive === item.strCategory ? '#ffa62a9c' : '#fff',
              },
            ]}
          >
            <Image
              source={{ uri: item.strCategoryThumb }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
            <Text style={tailwind`mt-2 text-sm text-neutral-500 font-semibold`}>
              {item.strCategory}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;
