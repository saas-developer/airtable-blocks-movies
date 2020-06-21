import React from 'react';
import { Box, Button, useRecordById } from '@airtable/blocks/ui';

export default function SelectedRecord(props) {
	const {
		handleFetchRatingClick,
		table,
		recordId
	} = props;

	const record = useRecordById(table, recordId);

	return (
		<Box
		    border="thick"
		    backgroundColor="white"
		    borderRadius="large"
		    padding={2}
		    height={100}
		    overflow="hidden"
		  >
		    {
		        record && record.getCellValueAsString('Name')
		    }
		    {
		        !record && <div>Please select a record</div>
		    }

		    <div>
		        <Button
		            onClick={() => handleFetchRatingClick(record)}
		            size="large"
		        >Fetch Ratings
		        </Button>
		    </div>
		  </Box>
	)
}
