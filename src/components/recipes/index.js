import React from 'react';
import {Pressable, Image} from 'react-native';
import {Wrapper, Text, Loaders} from '../../components';
import MasonryList from '@react-native-seoul/masonry-list';
import {baseStyle, routes, sizes} from '../../services';
import {height} from 'react-native-dimension';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

export default function Recipies({categories, meals}) {
  const navigation = useNavigation();
  return (
    <Wrapper marginHorizontalBase>
      <Text isLargeTitle>Recipies</Text>
      {categories.length == 0 || meals.length == 0 ? (
        <Loaders.Tertiary />
      ) : (
        <MasonryList
          data={meals}
          keyExtractor={item => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item, i}) => (
            <RecipeCard item={item} index={i} navigation={navigation} />
          )}
          //   refreshing={isLoadingNext}
          //   onRefresh={() => refetch({first: ITEM_CNT})}
          // onEndReachedThreshold={0.1}
          // onEndReached={() => loadNext(ITEM_CNT)}
        />
      )}
    </Wrapper>
  );
}

const RecipeCard = ({item, index, navigation}) => {
  let isEven = index % 2 === 0;
  let isThird = index % 3 === 0;
  return (
    <Animated.View
      key={index}
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}>
      <Wrapper marginVerticalSmall>
        <Pressable
          onPress={() => navigation.navigate(routes.RecipeDetails, {...item})}
          style={{
            width: '100%',
            paddingLeft: isEven ? 0 : baseStyle.paddingLeft(8),
            paddingRight: isEven ? baseStyle.paddingRight(8) : 0,
          }}>
          <Animated.Image
            sharedTransitionTag="sharedTag"
            //sharedTransitionTag={item.strMeal}
            style={{
              width: '100%',
              height: isThird ? height(25) : height(35),
              borderRadius: sizes.cardRadius,
            }}
            source={{uri: item.strMealThumb}}
          />
          {/* <CachedImage
            style={{
              width: '100%',
              height: isThird ? height(25) : height(35),
              borderRadius: sizes.cardRadius,
            }}
            uri={item.strMealThumb}
          /> */}
          <Text isMedium>
            {item.strMeal.length > 20
              ? item.strMeal.slice(0, 15) + '...'
              : item.strMeal}
          </Text>
        </Pressable>
      </Wrapper>
    </Animated.View>
  );
};
