import React, { useState } from 'react'

export default function DeleteButton({ callback, size }) {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const classes = (size === 'small') ? "btn-small btn-caution" : "btn btn-caution";

    return (
        <div>
            {showConfirmation  
            ? (<div>
                    <button className={classes} onClick={() =>setShowConfirmation(false)}>Cancel Deletion</button>
                    <button className={classes} onClick={callback}>Confirm Deletion</button>
                </div>)
            : (<button className={classes} onClick={() => setShowConfirmation(true)}>Delete</button>)
            }
        </div>
    )
}
