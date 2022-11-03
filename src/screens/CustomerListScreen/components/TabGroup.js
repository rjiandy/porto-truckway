import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import {
  Section,
  StyledText
} from '../../../components';

import colors from '../../../themes/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  headers: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: 'white',
    minHeight: 40
  },
  tabHeader: {
    alignSelf: 'flex-start',
    // paddingTop: 10,
    marginRight: 10
  },
  headerText: {
    fontSize: 14,
    color: colors.davysGrey,
    marginBottom: 8,
    marginHorizontal: 14,
    fontWeight: 'bold'
  },
  bar: {
    height: 2,
    backgroundColor: colors.white,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  }
});

function TabGroup(props) {

  const [activeIndex, setActiveIndex] = useState(0);

  const { headers, contents } = props;


  return (
    <Section style={styles.container}>
      <Section>
        <ScrollView style={styles.headers} horizontal showsHorizontalScrollIndicator={false}>
          {
            headers && headers.map((title, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.tabHeader}
                  onPress={() => setActiveIndex(index)}
                >
                  <StyledText style={[styles.headerText, activeIndex === index && { color: colors.brightNavyBlue }]}>
                    {title}
                  </StyledText>
                  <Section style={[styles.bar, activeIndex === index && { backgroundColor: colors.brightNavyBlue }]} />
                </TouchableOpacity>
              );
            })
          }
        </ScrollView>
      </Section>
      <ScrollView>
        { contents[activeIndex] }
      </ScrollView>
    </Section>
  );
}

TabGroup.defaultProps = {
  headers: []
};

export default TabGroup;
