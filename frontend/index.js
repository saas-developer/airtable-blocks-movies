import {initializeBlock} from '@airtable/blocks/ui';
import React from 'react';
import Movies from './movies/Movies'

function HelloWorldBlock() {
    return (
        <Movies />
    );
}

initializeBlock(() => <HelloWorldBlock />);
