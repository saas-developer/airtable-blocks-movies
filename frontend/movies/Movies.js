import React from 'react';
import { useBase } from '@airtable/blocks/ui'
import MoviesList from './MoviesList';
import MoviesApplication from './MoviesApplication';

function Movies() {
    const base = useBase();
    const tables = base.tables;

    return (
        <div>
            <MoviesApplication />
            <hr/>
            <div>Movies component here</div>
            <div>ID : {base.id}</div>
            <div>Name : {base.name}</div>

            <div>Number of tables: {tables.length}</div>
            
            <h3>Table Information</h3>
            {
                tables.map((table, index) => {
                    return (
                        <div key={index}>
                            <br />
                            <div>Name: {table.name}</div>
                            <div>ID: {table.id}</div>
                            <div>Description: {table.description}</div>

                            <h4>Records Information</h4>
                            <MoviesList table={table}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Movies;
