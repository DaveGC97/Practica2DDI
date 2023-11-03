import { View, Text, Sty } from 'react-native';
import React from 'react';
import { styles } from './TableDetail.styles';
import { Row, Rows, Table, Cell } from 'react-native-table-component';

export default function TableDetail(props) {
    const { params } = props;
    const tableHead = ['Estado', 'Especie', 'Género'];
    const tableData = [[[params.status], [params.species], [params.gender]]];
    return (
        <View style={styles.container}>
            <Table borderStyle={styles.border}>
                <Row
                    data={tableHead}
                    style={styles.head}
                    textStyle={styles.headText}
                />
                <Rows data={tableData} textStyle={styles.rowText} />
            </Table>
        </View>
    );
}
