import React from 'react';
import { useBase } from '@airtable/blocks/ui'

function Movies() {
    const base = useBase();
    console.log('base', base);
    const tables = base.tables;
    console.log('tables', tables);

    return (
        <div>
            <div>Movies component here</div>
            <div>ID : {base.id}</div>
            <div>Name : {base.name}</div>

            <div>Number of tables: {tables.length}</div>
        </div>
    )
}

export default Movies;
