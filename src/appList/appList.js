import React from 'react';
import './appList.css';

export default function AppList(props) {
    return (
        <div className = 'app'>
            <h2>{props.App}</h2>
            <div className = 'app_rating'>
                Rating: {props.Rating}
            </div>
            <div className = 'app_genre'>{props.Genre}</div>
        </div>
    );
}