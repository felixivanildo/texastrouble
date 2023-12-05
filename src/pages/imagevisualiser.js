import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { style } from '@mui/system';

const DataComponent = (props) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Make a GET request to the API endpoint
        const getdata = async () => {
            setData(props.files)
        }
        getdata()

    }
        , []);

    return (
        <div>
            {data && (
                <div>
                    

                    {data.map((item) => {
                        return (
                                < >
                                <img key={item} className='imagemrelatorio' src={`data:image/jpeg;base64,${item.image}` } />
                                <Button>Delete</Button>
                                </>
                        )
                    })}

                </div>
            )}
        </div>
    );
};

export default DataComponent;
