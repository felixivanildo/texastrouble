import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { Throw } from "src/components/functions/Rdminethrow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import aguaBruta from "./agua-bruta.json"
import aguaTratada from "./agua-tratada.json"

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function Laudo() {
    const { handleSubmit, control } = useForm();
    const [selectedImage, setSelectedImage] = useState([]);
    const [sectors, setSectors] = useState([{}]);
    const [currentuser, setCurrentUser] = useState([{}]);
    const [fotoMensagem, setFotoMensagem] = useState("");
    const [json, setJson] = useState(aguaBruta);

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

        const txt = files.length > 0 ? `${files.length} Fotos Selecionadas`: "";
        setFotoMensagem(txt);
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

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", margin: 10 }}>
            <FormControl fullWidth style={{ marginBottom: 20 }}>
                    <InputLabel id="qualidade-agua-label">Qualidade da Água</InputLabel>
                    <Select
                        labelId="qualidade-agua-label"
                        id="qualidade-agua"
                        value={json}
                        label="Qualidade da Água"
                        onChange={(event) => {
                            setJson(event.target.value);
                        }}
                    >
                        <MenuItem value={aguaBruta}>Água Bruta</MenuItem>
                        <MenuItem value={aguaTratada}>Água Tratada</MenuItem>
                    </Select>
                </FormControl>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name={'reportname'}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                style={{ width: "100%", marginBottom: 20 }}
                                id="outlined-static"
                                label="Nome do Laudo"

                                {...field}
                            />
                        )}
                    />

                    <div className="mainform">
                        {/* Loop through columns in JSON and create form fields */}
                        {
                            Object.keys(json).map((property) => {
                                return (
                                    <>
                                    <hr/>
                                    <h2>{property.replace(/-+/g, " ")}</h2>
                                    {
                                    property !== "IQA" ?
                                    json[property].map((column) => (
                                        <div className="item" key={column.name}>
                                            {/* Use Controller to integrate React Hook Form with input fields */}
                                            <Controller
                                                name={column.name}
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => (
                                                    <TextField
                                                        label={column.name.replace(/_+/g, " ")}
                                                        variant="outlined"
                                                        size="small"
                                                        type="text"
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </div>
                                    ))
                                    :
                                    <>
                                        <h3>ETA</h3>
                                        {json[property].map((column) => (
                                            <div className="item" key={column.name}>
                                                {/* Use Controller to integrate React Hook Form with input fields */}
                                                <Controller
                                                    name={column.name}
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => (
                                                        <TextField
                                                            label={column.name.replace(/_+/g, " ")}
                                                            variant="outlined"
                                                            size="small"
                                                            type="text"
                                                            {...field}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        ))}
                                        <h3>Poço</h3>
                                        {json[property].map((column) => (
                                        <div className="item" key={column.name}>
                                            {/* Use Controller to integrate React Hook Form with input fields */}
                                            <Controller
                                                name={column.name}
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => (
                                                    <TextField
                                                        label={column.name.replace(/_+/g, " ")}
                                                        variant="outlined"
                                                        size="small"
                                                        type="text"
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </div>
                                    ))}
                                    </>
                                    }
                                    </>
                                )
                            })
                        }

                        <div className="item">
                            <Controller
                                name={'sector'}
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <FormControl size="small" style={{width: "100%"}}>
                                        <InputLabel id="setor-label">Setor</InputLabel>
                                        <Select
                                            labelId="setor-label"
                                            label="Setor"
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

                    <div style={{display: "flex", alignItems: "center"}}>
                        <Button
                            size="small"
                            color="secondary"
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
                        <p style={{fontSize: 16, margin: 0, marginLeft: 10, marginTop: 10}}>{fotoMensagem}</p>
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

        </div>
    );
}