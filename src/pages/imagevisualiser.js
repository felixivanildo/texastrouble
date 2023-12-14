import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { VisuallyHiddenInput } from "@chakra-ui/visually-hidden";
import { style } from '@mui/system';
import { CloudUpload, TipsAndUpdatesOutlined } from "@mui/icons-material";

const containerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    msTransform: 'translate(-50%, -50%)',
    backgroundColor: '#555',
    color: 'white',
    fontSize: '16px',
    padding: '12px 24px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',

};

const DataComponent = ({ onAdd, reponame, id, files }) => {
    const [data, setData] = useState('')
    const [entered, setEntered] = useState('')
    const [aux, setAux] = useState()
    const [fotoMensagem, setFotoMensagem] = useState("");
    const [selectedImage, setSelectedImage] = useState([]);

    useEffect(() => {
        // Make a GET request to the API endpoint
        const getdata = async () => {            
            if(!aux){
                setData(files)
            }
            
      
        }
        getdata()

    }
        , [data, files]);

        
    
        
    const handleDeleteImage = async(toDelete) => {
        // console.log('http://10.254.4.132:3010/api/deleteimage', {id: toDelete.target.id})
        await axios.put('http://10.254.4.132:3010/api/deleteimage', {id: parseInt(toDelete.target.id)}).then(async (e)=>{
            // var retrieved = await axios.put('http://10.254.4.132:3010/api/getexclusivereport', { id: data.repoid })
            // // console.log(retrieved.data.files)
            // setData(retrieved.data.files)

            updateShown()
            
        })

    }



    const updateShown = async () => {
        // console.log('lion')
        setAux(true)
        var retrieved = await axios.put('http://10.254.4.132:3010/api/getexclusivereport', { id: data[0].repoid })
        // console.log(retrieved.data.files)
        onAdd()
        setData(retrieved.data.files)
    }

    const handleImageChange = (event) => {
        const files = event.target.files;
        const imagesArray = [];
        const file = event.target.files[0];
        // setSelectedName(file.name);

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();

            reader.onload = (e) => {
                imagesArray.push({
                    "imagecode": e.target.result,
                    "extension": files[i].name.substring(files[i].name.length - 3),
                    "name": files[i].name.substring(0, files[i].name.length - 3),
                });

                if (imagesArray.length === files.length) {
                    setSelectedImage(imagesArray);

                    imagesArray.map(async (img) => {
                        console.log(img);
                        await axios.post('http://10.254.4.132:3010/api/imgrecieve', {
                          "image": img.imagecode,
                          "name": img.name,
                          "extension": img.extension,
                          "reponame": reponame
                        }).then((e)=>{
                            updateShown()
                            onAdd()
                        });
                      });
                      
                      

                    }
                    if (files.length >= 2) {
                        setSelectedImage(`${files.length} arquivos escolhidos`)
                    }
                    onAdd()
                };
                
            reader.readAsDataURL(files[i]);


            if (files.length <= 0) {
                setFotoMensagem("");
            }
            else if (files.length === 1) {
                setFotoMensagem(`${files.length} Arquivos Selecionados`);
            }
            else {
                setFotoMensagem(`${files.length} Arquivos Selecionados`);
            }
        }

        // console.log('teste')

    };


    return (
        <div>
            {data && (
                <div style={{ display: "flex" }}>


                    {data.map((item) => {
                        return (

                            <div style={{ position: "relative", width: "50%", margin: "15px", overflow: "scroll" }} onMouseEnter={() => { setEntered(item.image) }} onMouseLeave={() => { setEntered('') }}>
                                <img key={item} className='imagemrelatorio'  src={`data:image/jpeg;base64,${item.image}`} />

                                {entered === item.image && <div >
                                    <Button onClick={handleDeleteImage} id={item.imageid}  style={containerStyle}>Delete

                                    </Button>
                                </div>}

                            </div>
                        )
                    })}



                </div>
            )}

            <Button
                size="small"
                // color="secondary"
                component="label"
                variant="contained"
                startIcon={<CloudUpload />}
                style={{
                    marginTop: "10px",
                    position: "relative",
                }}
            >
                Anexar Fotos
                <VisuallyHiddenInput
                    multiple
                    type="file"
                    onChange={handleImageChange}
                />
            </Button>
            {/* <div style={{ display: "flex", justifyContent: "center", paddingBottom: "20px" }}>
                <p style={{ fontSize: 16, }}>{fotoMensagem}</p>
            </div> */}
        </div>
    );
};

export default DataComponent;
