import React from 'react';

const DeleteIcon = ({item, onDelete, onUpdate}) => {
    return (
        <div>
            <i className="fa fa-trash" style={{margin: '10px'}}
               aria-hidden="true" onClick={() => onDelete(item.id)}></i>
            <i className="fa fa-pencil" aria-hidden="true"
               onClick={() => onUpdate(item)}></i>
        </div>
    );
};

export default DeleteIcon;