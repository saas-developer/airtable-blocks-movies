import React from 'react';
import { useRecords } from '@airtable/blocks/ui'

export default function MoviesList(props) {
    const {
        table
    } = props;
    const records = useRecords(table);
    console.log('records', records);


    return (
        <div>
            {
                records.map((record, index) => {
                    return (
                        <div key={index}>
                            <div>Primary Cell Value: {record.primaryCellValue}</div>
                        </div>
                    )
                })
            }
        </div>
    )


}