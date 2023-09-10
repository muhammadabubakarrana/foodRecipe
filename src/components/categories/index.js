import React, {useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {totalSize, height, width} from 'react-native-dimension';
import {Images, Text, Wrapper} from '../../components';
import {DummyData, baseStyle, colors, sizes} from '../../services';
import {useSelector} from 'react-redux';

export default function Categories({CategoriesData, handleChangeCategory}) {
  const [activeTab, setActivetab] = useState(0);
  const handleBoth = (x, y) => {
    setActivetab(x);
    handleChangeCategory(y);
    console.log(x, y);
  };
  const THEME = useSelector(state => state.theme);
  return (
    <Wrapper animation={'slideInRight'}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CategoriesData?.map((val, key) => {
          return (
            <TouchableOpacity
              key={key}
              onPress={() => handleBoth(key, val?.strCategory)}
              style={{
                alignItems: 'center',
                marginLeft: key === 0 ? totalSize(2) : 0,
                marginRight: DummyData?.length - 1 === key ? totalSize(2) : 0,
                paddingHorizontal: totalSize(1),
              }}>
              <Wrapper
                style={{
                  borderRadius: sizes.ModalRadius,
                  padding: baseStyle.padding(5),
                  backgroundColor: activeTab === key ? 'orange' : 'transparent',
                }}>
                <Images.Round source={{uri: val?.strCategoryThumb}} />
              </Wrapper>
              <Text
                isMedium
                style={{
                  color:
                    activeTab === key
                      ? 'red'
                      : THEME.data == 'LIGHT'
                      ? colors.black
                      : colors.snow,
                  fontWeight: '400',
                }}>
                {val?.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Wrapper>
  );
}
