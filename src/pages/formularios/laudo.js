import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { Throw } from "src/components/functions/Rdminethrow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    position: 'absolute',
    zIndex: -1,
    left: "15px",
    color: "#000"
});

export default function Laudo() {
    const { handleSubmit, control } = useForm();
    const [selectedImage, setSelectedImage] = useState([]);
    const [sectors, setSectors] = useState([{}])
    const [currentuser, setCurrentUser] = useState([{}])

    const onSubmit = (data) => {

        Throw(currentuser, data, selectedImage)
        // Handle form submission logic here
    };

    const handleImageChange = (event) => {
        const files = event.target.files;
        const imagesArray = [];

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
            };

            reader.readAsDataURL(files[i]);
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

    const json = [
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

    ]
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "30px" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name={'reportname'}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                style={{ marginLeft: "30%" }}
                                id="outlined-static"
                                label="Nome do Laudo"

                                {...field}
                            />
                        )}
                    />

                    <br></br>
                    <div className="mainform">
                        {/* Loop through columns in JSON and create form fields */}
                        {json.map((column) => (
                            <div className="item" key={column.name}>
                                {/* Use Controller to integrate React Hook Form with input fields */}
                                <Controller
                                    name={column.name}
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
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

                        <div className="item">
                            <Controller
                                name={'sector'}
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <FormControl size="small">
                                        <InputLabel id="setor-label">Setor</InputLabel>
                                        <Select
                                            labelId="setor-label"
                                            label="Setor"
                                            style={{ minWidth: "120px" }}
                                            id="demo-simple-select"
                                            {...field}
                                        >
                                            {sectors.map((sec) => (
                                                <MenuItem value={sec.sectoraka}>{sec.sectoraka}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            />

                        </div>
                        <Controller
                            name={'notes'}
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    className="item"
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

                    <Button
                        size="small"
                        color="primary"
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
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

                    <br />



                    <Button
                        style={{ marginTop: "10px" }}
                        fullWidth
                        type="submit"
                        color="primary"
                        variant="contained"
                    >
                        Submit
                    </Button>

                </form>

            </div>


        </div>
    );
}