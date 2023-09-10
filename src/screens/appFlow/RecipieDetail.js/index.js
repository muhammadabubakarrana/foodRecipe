import React, {useEffect, useState} from 'react';
import {Image, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import {
  Wrapper,
  Text,
  Spacer,
  StatusBars,
  Icons,
  Loaders,
} from '../../../components';
import {baseStyle, colors, sizes} from '../../../services';
import {totalSize, height, width} from 'react-native-dimension';
import {Icon} from '@rneui/base';
import {goBack} from '../../../navigation/rootNavigation';
import axios from 'axios';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated from 'react-native-reanimated';
import {useSelector} from 'react-redux';

export default function RecipeDetail(props) {
  const THEME = useSelector(state => state.theme);
  const {idMeal, strMeal, strMealThumb} = props.route.params;
  const [isFavourite, setIsFavourite] = useState(false);
  const [DescriptionData, setDescriptionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //getting indexes
  const IngredientIndexes = meal => {
    if (!DescriptionData) return null;
    let indexes = [];
    for (let i = 0; i <= 20; i++) {
      if (DescriptionData['strIngredient' + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  // getting youtube videoid
  const getYoutubeVideoId = url => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  //getting meal data when screen mounts
  useEffect(() => {
    getMealData(idMeal);
  }, []);

  const getMealData = async id => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      //console.log('Muhammad', response.data.meals[0]);
      if (response && response.data) {
        setDescriptionData(response.data.meals[0]);
        setIsLoading(false);
      }
    } catch (e) {
      console.log('error', e.message);
    }
  };
  return (
    <Wrapper
      isMain
      style={{
        backgroundColor:
          THEME.data == 'LIGHT' ? colors.appBgColor1 : colors.black,
      }}>
      {/* <Spacer isStatusBarHeigt /> */}
      <StatusBars.Light />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: baseStyle.paddingBottom(50),
        }}>
        <Wrapper alignItemsCenter paddingVerticalTiny>
          <Animated.Image
            sharedTransitionTag="sharedTag"
            //sharedTransitionTag={strMeal}
            source={{uri: strMealThumb}}
            style={{
              width: '98%',
              height: Dimensions.get('window').height / 2,
              borderRadius: sizes.cardRadius,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}
          />
        </Wrapper>
        {/* Back button */}
        <Wrapper
          style={{width: '100%'}}
          paddingHorizontalBase
          flexDirectionRow
          alignItemsCenter
          justifyContentSpaceBetween
          paddingVerticalLarge
          isAbsolute>
          <TouchableOpacity
            onPress={() => goBack()}
            style={{
              backgroundColor:
                THEME.data == 'LIGHT' ? colors.snow : colors.black,
              borderRadius: 150,
              padding: baseStyle.padding(2),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icons.Back
              size={totalSize(5)}
              style={{
                color: THEME.data == 'LIGHT' ? colors.bloodOrange : colors.snow,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsFavourite(!isFavourite)}
            style={{
              backgroundColor:
                THEME.data == 'LIGHT' ? colors.snow : colors.black,
              borderRadius: 150,
              padding: baseStyle.padding(2),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              type="material-community"
              name="heart"
              size={totalSize(5)}
              color={isFavourite ? 'red' : colors.appBgColor3}
            />
          </TouchableOpacity>
        </Wrapper>
        {/* meal description */}
        {isLoading ? (
          <Loaders.Tertiary />
        ) : (
          <Wrapper marginVerticalTiny marginHorizontalBase>
            {/* name & Area */}
            <Wrapper>
              <Text isMediumTitle>{DescriptionData?.strMeal}</Text>
              <Text isMedium>{DescriptionData?.strArea}</Text>
            </Wrapper>
            {/* misc data */}
            <Wrapper
              marginVerticalTiny
              flexDirectionRow
              justifyContentSpaceEvenly>
              {/* card 1 */}
              <Wrapper
                alignItemsCenter
                style={{
                  padding: baseStyle.padding(10),
                  backgroundColor: 'orange',
                  borderRadius: sizes.ModalRadius,
                }}>
                <Wrapper
                  style={{
                    backgroundColor: colors.snow,
                    borderRadius: baseStyle.borderRadius(35),
                    padding: baseStyle.padding(3),
                  }}>
                  <Icon
                    name="clock-outline"
                    type="material-community"
                    size={totalSize(4)}
                  />
                </Wrapper>
                <Text isMedium isMediumFont>
                  35
                </Text>
                <Text isSmall isRegularFont>
                  Mins
                </Text>
              </Wrapper>
              <Wrapper
                alignItemsCenter
                style={{
                  padding: baseStyle.padding(10),
                  backgroundColor: 'orange',
                  borderRadius: sizes.ModalRadius,
                }}>
                {/* card 2 */}
                <Wrapper
                  style={{
                    backgroundColor: colors.snow,
                    borderRadius: baseStyle.borderRadius(35),
                    padding: baseStyle.padding(3),
                  }}>
                  <Icon
                    name="account-group"
                    type="material-community"
                    size={totalSize(4)}
                  />
                </Wrapper>
                <Text isMedium isMediumFont>
                  35
                </Text>
                <Text isSmall isRegularFont>
                  Mins
                </Text>
              </Wrapper>
              {/* card 3 */}
              <Wrapper
                alignItemsCenter
                style={{
                  padding: baseStyle.padding(10),
                  backgroundColor: 'orange',
                  borderRadius: sizes.ModalRadius,
                }}>
                <Wrapper
                  style={{
                    backgroundColor: colors.snow,
                    borderRadius: baseStyle.borderRadius(50),
                    padding: baseStyle.padding(3),
                  }}>
                  <Icon name="flame" type="octicon" size={totalSize(4)} />
                </Wrapper>
                <Text isMedium isMediumFont>
                  35
                </Text>
                <Text isSmall isRegularFont>
                  Mins
                </Text>
              </Wrapper>
              {/* card 4 */}
              <Wrapper
                alignItemsCenter
                style={{
                  padding: baseStyle.padding(10),
                  backgroundColor: 'orange',
                  borderRadius: sizes.ModalRadius,
                }}>
                <Wrapper
                  style={{
                    backgroundColor: colors.snow,
                    borderRadius: baseStyle.borderRadius(35),
                    padding: baseStyle.padding(3),
                  }}>
                  <Icon
                    name="layers-outline"
                    type="material-community"
                    size={totalSize(4)}
                  />
                </Wrapper>
                <Spacer isTiny />
                <Text isMedium isMediumFont>
                  Easy
                </Text>
              </Wrapper>
            </Wrapper>
            {/* Ingredients */}
            <Wrapper marginVerticalTiny>
              <Text isSmallTitle>Ingredients</Text>
              <Wrapper marginVerticalTiny>
                {IngredientIndexes(DescriptionData).map(i => {
                  return (
                    <Wrapper key={i} alignItemsCenter flexDirectionRow>
                      <Wrapper
                        style={{
                          height: 10,
                          width: 10,
                          borderRadius: 10 / 2,
                          backgroundColor: 'orange',
                          marginRight: baseStyle.marginRight(5),
                        }}
                      />

                      <Text isMedium isBoldFont>
                        {DescriptionData['strMeasure' + i]}
                      </Text>
                      <Text
                        style={{marginLeft: baseStyle.marginLeft(5)}}
                        isMedium>
                        {DescriptionData['strIngredient' + i]}
                      </Text>
                    </Wrapper>
                  );
                })}
              </Wrapper>
            </Wrapper>

            {/* Instructions */}
            <Wrapper marginVerticalTiny>
              <Text isSmallTitle>Instructions</Text>
              <Wrapper marginVerticalTiny>
                <Text isMedium>
                  {'                  '}
                  {DescriptionData?.strInstructions}
                </Text>
              </Wrapper>
            </Wrapper>

            {/* Recipe Video  */}
            {DescriptionData?.strYoutube && (
              <Wrapper marginVerticalBase>
                <Text isSmallTitle>Recipe Video </Text>
                <Wrapper marginVerticalTiny>
                  <YoutubeIframe
                    videoId={getYoutubeVideoId(DescriptionData?.strYoutube)}
                    height={height(30)}
                  />
                </Wrapper>
              </Wrapper>
            )}
          </Wrapper>
        )}
      </ScrollView>
    </Wrapper>
  );
}
