import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {
  Images,
  Spacer,
  StatusBars,
  Text,
  Wrapper,
  TextInputs,
  Categories,
  Recipies,
  Loaders,
} from '../../../components';
import {appImages, baseStyle, colors, theme} from '../../../services';
import {totalSize, height, width} from 'react-native-dimension';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Avatar, Badge, Icon, withBadge} from '@rneui/themed';
import {useSelector} from 'react-redux';

function Home(props) {
  const THEME = useSelector(state => state.theme);
 // console.log(THEME);
  // const navigation = useNavigation();
  // const [activeTab, setActivetab] = useState(0);
  const [CategoriesData, setCategoriesData] = useState([]);
  const [Meals, setMeals] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getCategories();
    getRecipies();
  }, []);

  const handleChangeCategory = category => {
    getRecipies(category);
    //  setActivetab(category);
    setMeals([]);
  };

  //Getting Categories
  const getCategories = async () => {
    try {
      const response = await axios.get(
        'https://themealdb.com/api/json/v1/1/categories.php',
      );
      // console.log('got my categories', response.data);
      if (response && response.data) {
        setCategoriesData(response.data.categories);
      }
    } catch (e) {
      console.log('error', e.message);
    }
  };

  //Getting Recipies
  const getRecipies = async (category = 'Beef') => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );

      //console.log('got my Recipies', response.data);
      if (response && response.data) {
        setMeals(response.data.meals);
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
      <Spacer isStatusBarHeigt />
      <StatusBars.Dark />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: baseStyle.paddingBottom(50),
        }}>
        {/* Avatar And bell Icon */}
        <Wrapper
          marginHorizontalBase
          justifyContentSpaceBetween
          alignItemsCenter
          flexDirectionRow
          marginVerticalTiny>
          <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
            <Icon
              color={THEME.data == 'LIGHT' ? colors.black : colors.snow}
              type="material-community"
              name="menu"
              size={totalSize(4)}
            />
          </TouchableOpacity>
          <View>
            <Icon
              color={THEME.data == 'LIGHT' ? colors.black : colors.snow}
              type="feather"
              name="bell"
              size={totalSize(4)}
            />
            <Badge
              status="success"
              value={10}
              containerStyle={{position: 'absolute', top: -5, left: 20}}
            />
          </View>
        </Wrapper>
        {/* Greetings */}
        <Wrapper marginHorizontalBase marginVerticalTiny>
          <Text isMedium>Hello, Abubakar</Text>
          <Wrapper>
            <Text isMediumTitle isMediumFont>
              Make your own food
            </Text>
          </Wrapper>
          <Text isMediumTitle isMediumFont>
            stay at
            <Text style={{color: 'orange'}}> Home</Text>
          </Text>
        </Wrapper>
        {/* Search Bar */}
        <Wrapper>
          <TextInputs.Colored
            //inputStyle={colors.snow}
            // onChangeText={handleTextDebounce}
            placeholder={'Search Any Recipe'}
            placeholderTextColor={colors.snow}
            inputContainerStyle={{
              backgroundColor: colors.appBgColor2,
              marginVertical: height(0.5),
            }}
            iconNameRight={'search'}
            iconTypeRight={'feather'}
            // onPressIconRight={() => toggleShow(!show)}
            iconColorRight={'black'}
            //  iconRightContainer={styles.iconContainerRight}
          />
        </Wrapper>

        {/* Categories */}
        <Wrapper marginVerticalTiny>
          {CategoriesData.length > 0 && (
            <Categories
              CategoriesData={CategoriesData}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </Wrapper>

        {/* Resipies */}
        <Wrapper marginVerticalTiny>
          <Recipies meals={Meals} categories={CategoriesData} />
        </Wrapper>
      </ScrollView>
      {/* <Loaders.Secondary isVisible={isLoading} /> */}
    </Wrapper>
  );
}

export default Home;
