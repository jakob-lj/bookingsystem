

import React from 'react'

const useAsyncError = () => {
    const [_, setError] = React.useState();
    return React.useCallback(
        e => {
        setError(() => {
            throw e;
        });
        },
        [setError],
    );
};


export default useAsyncError
