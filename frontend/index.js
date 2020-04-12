import {initializeBlock} from '@airtable/blocks/ui';
import React from 'react';
import Movies from './movies/Movies'

function HelloWorldBlock() {
    return (
        <div style={{ padding: 20 }}>
            <Movies />
        </div>
    );
}

initializeBlock(() => <HelloWorldBlock />);
