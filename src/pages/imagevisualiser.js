import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
                            <div>
                                <img key={item} src={`data:image/jpeg;base64,${item.image}`} />;
                            </div>
                        )
                    })}

                </div>
            )}
        </div>
    );
};

export default DataComponent;
