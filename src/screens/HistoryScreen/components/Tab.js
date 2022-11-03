import React from 'react';
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import {
  Section,
  StyledText
} from '../../../components';

import colors from '../../../themes/colors';
import fonts from '../../../themes/fonts';

const styles = StyleSheet.create({
  tabContainer: {
    height: 30,
    borderBottomWidth: 1,
    borderColor: colors.gainsboro,
    marginBottom: 14,
    flexDirection: 'row',
    paddingHorizontal: 14
  },
  tabHeader: {
    marginRight: 10
  },
  activeBar: {
    height: 2,
    width: '100%',
    backgroundColor: colors.brightNavyBlue,
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  }
});

function Tab(props) {
  const { labels, activeTab, onSelect } = props;
  return (
    <Section style={styles.tabContainer}>
      {
        labels.map((label, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tabHeader}
            onPress={() => onSelect(index)}
          >
            <StyledText
              style={[
                fonts['Roboto-14-davysGrey'],
                { marginHorizontal: 10 },
                activeTab === index && fonts['Roboto-14-blue-bold']
              ]}
            >
              {label}
            </StyledText>
            { activeTab === index && <Section style={styles.activeBar} />}
          </TouchableOpacity>
        ))
      }
    </Section>
  );
}

export default Tab;
