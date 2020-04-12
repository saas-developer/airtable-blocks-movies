import React from 'react';
import { Box, RecordCardList, RecordCard, CellRenderer, useRecords } from '@airtable/blocks/ui'

export default function MoviesList(props) {
    const {
        table
    } = props;
    const records = useRecords(table);
    console.log('records', records);
    const fields = table.fields;

    return (
        <div>
            <h4>RecordCardList</h4>
            <Box height="300px" border="thick" backgroundColor="lightGray1">
                <RecordCardList records={records} />
            </Box>
            <h4>Individual Record Cards</h4>
            {
                records.map((record, index) => {
                    return (
                        <div key={Math.random()}>
                            <RecordCard record={record} />
                        </div>
                    )
                })
            }

            <h4>CellRenderer</h4>
            {
                records.map((record, index) => {
                    return fields.map((field, fieldIndex) => {
                        return (
                            <div key={Math.random()}>
                                <div>{field.name}</div>
                                <div>
                                    <CellRenderer field={field} record={record} />
                                </div>
                                
                            </div>
                        )
                    })
                })
            }
        </div>
    )


}