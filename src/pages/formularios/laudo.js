import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, Select, MenuItem } from "@mui/material";
import { CloudUpload, TipsAndUpdatesOutlined } from "@mui/icons-material";
import { Tipo } from "./tiposLaudo/aguaTipos";
//import { Throw } from "src/components/functions/Rdminethrow";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import './Laudo.css'
// import UploadFileIcon from '@mui/icons-material/UploadFile';
import { VisuallyHiddenInput } from "@chakra-ui/visually-hidden";

export default function Laudo() {
    const { handleSubmit, control } = useForm();
    const [selectedImage, setSelectedImage] = useState([]);
    const [sectors, setSectors] = useState([{}])
    const [currentuser, setCurrentUser] = useState([{}])
    const [selectedName, setSelectedName] = useState("");
    const [fotoMensagem, setFotoMensagem] = useState("");

    const onSubmit = (data) => {

        console.log(data)
        // Throw(currentuser,data,selectedImage)
    };

    const handleSelect = (data) => {
        // console.log(data)

        Tipo({"agua": "agua_bruta", "report": data}).then((e)=>{
            // console.log(typeof(e))
            setJson(e)
        })
    }

    const handleImageChange = (event) => {
        const files = event.target.files;
        const imagesArray = [];
        const file = event.target.files[0];
        setSelectedName(file.name);

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
                }
                if (files.length >= 2) {
                    setSelectedName(`${files.length} arquivos escolhidos`)
                }
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

    };

    useEffect(() => {
        const autoexec = async () => {
            const elaborate = await axios.get('http://10.254.4.132:3010/api/sectors')
            const user = await AsyncStorage.getItem('@user')
            setSectors(elaborate.data)
            setCurrentUser(JSON.parse(user))
        }

        autoexec()
    }, [])

    const [tipos, setTipos] = useState ([
        {"tipo": "fisico_quimico", "name":"FÍSICO QUIMICO"},
        {"tipo": "bacteriologica", "name":"BACTERIOLOGICA"},
        {"tipo": "clorofila", "name": "CLOROFILA"}
    
    ])

    const [json, setJson] = useState ( [
        { "name": "ph", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "corverdadeira", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "turbidez", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "condutanciaespecifica", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "acidez", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "alcalinidadeoh", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "alcalinidadeco", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "alcalinidadehco", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "durezatotal", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "durezacarbonatos", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "durezancarbonatos", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "calcio", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "magnesio", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "cloretos", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "silica", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "sulfato", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "amonia", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "nitrato", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "nitrito", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "ferrototal", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "sodio", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "potassio", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "solidostotais", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "colifornestotais", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "escherichiacoli", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "indice_nitrato_nitrito", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },

    ]) 
    
    return (

        <div>

            <div>
                <Button style={{backgroundColor:`wheat`}}>ÁGUA BRUTA</Button>
                <Button>ÁGUA TRATADA</Button>

                {tipos.map((column) => (
                 <div key={column.tipo}>
                 <Button onClick={()=>{handleSelect(column.tipo)}}>{column.name}</Button>
                 </div>
                ))}

            </div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <Controller
                        name={'reportname'}
                        control={control}
                        defaultValue="" 
                        render={({ field }) => (
                            <TextField
                                variant="outlined" 
                                InputProps={{ sx: { borderRadius: "10px" } }}
                                style={{ minWidth: "100%", marginTop: "15px" }}
                                id="outlined-static" 
                                label="Nome do Laudo" 
                                size="small" 
                                {...field}
                            />
                        )}
                    /></div>

                <br></br>
                <div className="mainform">
                    {/* Loop through columns in JSON and create form fields */}
                    {json.map((column) => (
                        <div key={column.name}>
                            {/* Use Controller to integrate React Hook Form with input fields */}

                            <Controller
                                name={column.name}
                                control={control}
                                defaultValue="" 
                                render={({ field }) => (
                                    <TextField
                                        InputProps={{ sx: { borderRadius: "10px" } }}
                                        style={{ minWidth: "100%" }}
                                        id="outlined-basic" 
                                        label={column.name}
                                        variant="outlined" 
                                        size="small" 
                                        type="text" 
                                        {...field}

                                    />
                                )}
                            />
                        </div>
                    ))}

                        <Controller
                            name={'sector'}
                            control={control}
                            defaultValue="" 
                            render={({ field }) => (
                                <Select
                                    sx={{ borderRadius: "10px" }}
                                    placeholder="Setor" 
                                    id="demo-simple-select" 
                                    size="small" 
                                    defaultValue="Setor" 
                                    {...field}
                                >
                                    {sectors.map((sec) => (
                                        <MenuItem value={sec.sectoraka}>{sec.sectoraka}</MenuItem>
                                    ))}
                                </Select>
                            )}
                        />

                    <Controller
                        name={'notes'}
                        control={control}
                        defaultValue="" 
                        render={({ field }) => (
                            <TextField
                                InputProps={{ sx: { borderRadius: "10px" } }}
                                className="item-select" 
                                id="outlined-multiline-static" 
                                label="Nota" 
                                multiline
                                rows={4}
                                defaultValue="Default Value" 
                                {...field}
                            />
                        )}
                    />
                </div>

                  <div style={{display: "flex", alignItems: "center", justifyContent: "space-evenly", flexDirection:"column"}}>
                        <Button
                            size="small" 
                            color="secondary" 
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

                        <div style={{display:"flex", justifyContent:"center", paddingBottom:"20px"}}>
                        <p style={{fontSize: 16, }}>{fotoMensagem}</p>
                        </div>
                  </div>

                  

                    <Button
                        style={{ marginTop: "20px", padding: 10 }}
                        fullWidth
                        type="submit" 
                        color="primary" 
                        variant="contained" 
                    >
                        Submit
                    </Button>
            </form>
        </div>
    );
}