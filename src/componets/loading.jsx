import React from 'react';

const Loading = () => {
    return (
        <div className="main__container">
            <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;