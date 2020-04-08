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
            
            <h3>Table Information</h3>
            {
                tables.map((table) => {
                    return (
                        <div>
                            <br />
                            <div>Name: {table.name}</div>
                            <div>ID: {table.id}</div>
                            <div>Description: {table.description}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Movies;
