import React from 'react';
import { cursor } from '@airtable/blocks';
import { useGlobalConfig, Box, Button, useBase, useLoadable, useWatchable, useRecordById } from '@airtable/blocks/ui';
import Settings from './Settings';
import SelectedRecord from './SelectedRecord';

export default function MoviesApplication() {
    const base = useBase();
    const globalConfig = useGlobalConfig();
    useLoadable(cursor);
    useWatchable(cursor, ['activeTableId', 'selectedRecordIds']);

    let table;
    if (cursor.activeTableId && cursor.selectedRecordIds.length) {
        table = base.getTableById(cursor.activeTableId);
    }

    const handleFetchRatingClick = async (record) => {
        const name = record.getCellValueAsString('Name');

        const apiKey = globalConfig.get(['settings', 'omdbApiKey']);
        // Make API call to OMDB API here
        const omdbApiUrl = 'https://cors-anywhere.herokuapp.com/https://www.omdbapi.com/?t=' +name + '&apikey=' + apiKey ;

        try {
            const response = await fetch(omdbApiUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            const imdbRating = data.imdbRating;
            console.log('imdbRating', imdbRating);

            updateRecord(record, {
                'IMDB Rating': imdbRating
            });
            
            return response;
        } catch (e) {
            console.log('e ', e);
        }
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
            
            {
                cursor.activeTableId && cursor.selectedRecordIds.length ?
                <SelectedRecord
                    table={table}
                    recordId={cursor.selectedRecordIds[0]}
                    handleFetchRatingClick={handleFetchRatingClick}
                /> :
                null
            }
            
        </div>

    )


}