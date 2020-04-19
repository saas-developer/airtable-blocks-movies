import React from 'react';
import { cursor } from '@airtable/blocks';
import { useGlobalConfig, Box, Button, useBase, useLoadable, useWatchable, useRecordById } from '@airtable/blocks/ui';
import Settings from './Settings';

export default function MoviesApplication() {
    const base = useBase();
    const globalConfig = useGlobalConfig();
    useLoadable(cursor);
    useWatchable(cursor, ['activeTableId', 'selectedRecordIds']);

    // const record = useRecordById(cursor.activeTableId, cursor.selectedRecordIds);

    const table = base.getTableById(cursor.activeTableId);
    const queryResult = table.selectRecords();
    let record = null;

    try {
        record = queryResult.getRecordById(cursor.selectedRecordIds[0]);
    } catch (e) {
        record = null;
    }

    const handleFetchRatingClick = (record) => {
        const name = record.getCellValueAsString('Name');

        const apiKey = globalConfig.get(['settings', 'omdbApiKey']);
        // Make API call to OMDB API here
        const omdbApiUrl = 'https://cors-anywhere.herokuapp.com/https://www.omdbapi.com/?t=' +name + '&apikey=' + apiKey ;

        fetch(omdbApiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then(err => {throw err});
            }
            return response.json();
        })
        .then((response) => {
            const imdbRating = response.imdbRating;
            console.log('imdbRating', imdbRating);

            updateRecord(record, {
                'IMDB Rating': imdbRating
            });
            return response;
        })
        .catch( (error) => {
            console.log('error ', error);
        });

    }

    const updateRecord = (record, recordFields) => {
        if (table.hasPermissionToUpdateRecord(record, recordFields)) {
            table.updateRecordAsync(record, recordFields);
        }
    }

    return (
        <div>
            <h2>Movies Application</h2>
            <Settings />
            <div>
                Selected Record Ids: {cursor.selectedRecordIds.join(' ')}
            </div>
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
            
        </div>

    )


}