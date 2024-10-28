import React from 'react';
import {View, Button, Text} from 'react-native';
import styles from '../styles/paginationStyles';

const Pagination = ({currentPage, totalPages, onPageChange}) => {
  return (
    <View style={styles.container}>
      <Button
        title="Önceki"
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      <Text style={styles.pageText}>
        {currentPage} / {totalPages}
      </Text>
      <Button
        title="Sonraki"
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </View>
  );
};

export default Pagination;
