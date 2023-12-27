import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, Select, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { CloudUpload, TipsAndUpdatesOutlined } from "@mui/icons-material";
import { Tipo } from "./tiposLaudo/aguaTipos";
import { Throw } from "src/components/functions/Rdminethrow";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import './Laudo.css'
// import UploadFileIcon from '@mui/icons-material/UploadFile';
import { VisuallyHiddenInput } from "@chakra-ui/visually-hidden";
import { getValue } from "@mui/system";


export default function Laudo(props) {
    const { handleSubmit, control } = useForm();
    const [selectedImage, setSelectedImage] = useState([]);
    const [sectors, setSectors] = useState([{}])
    const [currentuser, setCurrentUser] = useState([{}])
    const [colectInterested, setColectInterested] = useState([{}])
    const [cities, setCities] = useState([{}])
    const [colectTypes, setColectTypes] = useState([{}])
    const [selectedName, setSelectedName] = useState("");
    const [fotoMensagem, setFotoMensagem] = useState("");
    const [isVisible, setVisible] = useState(false)
    const [curroption, setCurroption] = useState('')
    const currentDay = new Date ()

    // const [dynamicname, setDynamicName] = useState('clicka')


    // const handleTextFieldChange = (event) => {
    //     const newValue = event.target.value;
    //     setDynamicName(newValue);
    //   };

    const onSubmit = (data) => {
        Throw(currentuser, data, selectedImage)

    };

    const handleSelect = (data) => {
        // console.log(data)
        // console.log({ "agua": props.agua ?? '', "report": data ?? 'fisico_quimico' })
        Tipo({ "agua": props.agua ?? '', "report": data ?? 'fisico_quimico' }).then((e) => {
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

            // console.log(start, rest)
            // console.log()

            setTipos(props.agua === 'agua_bruta' ? [{ "tipo": "fisico_quimico", "name": "FÍSICO QUIMICO" },
            { "tipo": "bacteriologica", "name": "BACTERIOLOGICA" },
            { "tipo": "clorofila", "name": "CLOROFILA" }]
                :
                [{ "tipo": "fisico_quimico", "name": "FÍSICO QUIMICO" },
                { "tipo": "bacteriologica", "name": "BACTERIOLOGICA" }]

            )
            const elaborate = await axios.get('http://10.254.4.132:3010/api/sectors')
            const user = await AsyncStorage.getItem('@user')
            setSectors(elaborate.data)
            setCurrentUser(JSON.parse(user))

        }

        autoexec()
    }, [])



    useEffect(() => {
        const autoexec = async () => {
            const collects = await axios.get('http://10.254.4.132:3010/api/colecttypes')
            const interesteds = await axios.get('http://10.254.4.132:3010/api/interesteds')
            const city = await axios.get('http://10.254.4.132:3010/api/consultarcidade')

            setColectInterested(interesteds.data)
            setColectTypes(collects.data)
            setCities(city.data)
        }

        autoexec()
    }, [])

    const [tipos, setTipos] = useState([
        {}

    ])

    const [json, setJson] = useState([
        { "name": "fq_ph", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },

    ])

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };




    return (

        <div>

            <div >

                <div style={{ display: 'flex', flexDirection: "row", justifyContent: "center" }}>

                    {tipos.map((column) => (
                        <div key={column.tipo}>
                            <Button style={{ backgroundColor: column.name === curroption ? 'wheat' : '' }}
                                onClick={() => {
                                    handleSelect(column.tipo); !isVisible ? setVisible(true) : setVisible(true);
                                    setCurroption(`${column.name}`)
                                }}>
                                {column.name}
                            </Button>
                        </div>
                    ))}
                    {/* </div> */}
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: isVisible ? 'block' : 'none' }}>

                <div className="mainform" >
                    
                        <Controller
                            name={'reportname'}
                            control={control}
                            defaultValue={props.name}  // Set defaultValue to dynamicname
                            render={({ field }) => (
                                <>
                                    <label>NÚMERO DA AMOSTRA</label>
                                    {/* {console.log(field)} */}
                                    <TextField
                                        className="formitem"
                                        variant="outlined"
                                        disabled
                                        InputProps={{ sx: { borderRadius: "10px" } }}
                                        style={{ minWidth: "100%", marginTop: "15px" }}
                                        id="outlined-static"
                                        size="small"
                                        placeholder={props.name}
                                    // {...field}

                                    // {...field}

                                    />
                                </>
                            )}
                        />
                    


                    <Controller
                        name={'sector'}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <>
                                <label style={{ display: "flex", justifyContent: "flex-start", alignContent: "center" }}>SETOR</label>
                                <Select
                                    className="formitem"
                                    sx={{ borderRadius: "10px" }}

                                    id="demo-simple-select"
                                    size="small"

                                    {...field}
                                >
                                    {sectors.map((sec) => (
                                        <MenuItem value={sec.sectoraka}>{sec.sectoraka}</MenuItem>
                                    ))}
                                </Select>
                            </>
                        )}
                    />


                    
                        <Controller
                            name="collected_on"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <>
                                    <label >LOCAL DA COLETA</label>
                                    <Select
                                    className="formitem"
                                    sx={{ borderRadius: "10px" }}

                                    id="demo-simple-select"
                                    size="small"

                                    {...field}
                                >
                                    {cities.map((city) => (
                                        <MenuItem value={city.title}>{city.title}</MenuItem>
                                    ))}
                                </Select>
                                </>
                            )}
                        />
                    




                    <Controller
                        name="collected_at"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <>
                                <label style={{ display: "flex", justifyContent: "flex-start", alignContent: "center" }}>DATA DA COLETA</label>
                                <DatePicker
                                    className="formitem"                                                                  
                                    value={field.value}
                                    inputRef={field.ref}
                                    onChange={(date) => {
                                        field.onChange(date);
                                    }}
                                    renderInput={(props) => (
                                        // Customize the input field here if needed
                                        <TextField {...props} />
                                    )}
                                />
                            </>
                        )}
                    />





                    <Controller
                        name="collect_type"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <>
                                <label style={{ display: "flex", justifyContent: "flex-start", alignContent: "center" }}>INTEREÇADO</label>
                                <Select
                                    className="formitem"
                                    sx={{ borderRadius: "10px" }}

                                    id="demo-simple-select"
                                    size="small"

                                    {...field}
                                >
                                    {colectInterested.map((interested) => (
                                        <MenuItem value={interested.enter_aka}>{interested.enter_aka}</MenuItem>
                                    ))}
                                </Select>
                            </>
                        )}
                    />


                    <Controller
                        name="collect_type"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <>
                                <label style={{ display: "flex", justifyContent: "flex-start", alignContent: "center" }}>TIPO DE COLETA</label>
                                <Select
                                    className="formitem"
                                    sx={{ borderRadius: "10px" }}

                                    id="demo-simple-select"
                                    size="small"

                                    {...field}
                                >
                                    {colectTypes.map((type) => (
                                        <MenuItem value={type.ct_name}>{type.ct_name}</MenuItem>
                                    ))}
                                </Select>
                            </>
                        )}
                    />

                </div>
                <br></br>
                <hr></hr>


                <br></br>
                <div className="mainform">
                    {/* Loop through columns in JSON and create form fields */}
                    {json.map((column) => (
                        <div key={column.name} className="formitem">
                            {/* Use Controller to integrate React Hook Form with input fields */}

                            <Controller
                                name={column.name}
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <div >
                                        <label>{column.text}</label>
                                        <TextField
                                            InputProps={{ sx: { borderRadius: "10px" } }}
                                            style={{ minWidth: "100%" }}
                                            id="outlined-basic"

                                            variant="outlined"
                                            size="small"
                                            type="text"
                                            {...field}


                                        />
                                    </div>
                                )}
                            />
                        </div>
                    ))}

                    {/* <Controller
                        name={'sector'}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <>
                                <label>SETOR</label>
                                <Select
                                    className="formitem"
                                    sx={{ borderRadius: "10px" }}

                                    id="demo-simple-select"
                                    size="small"

                                    {...field}
                                >
                                    {sectors.map((sec) => (
                                        <MenuItem value={sec.sectoraka}>{sec.sectoraka}</MenuItem>
                                    ))}
                                </Select>
                            </>
                        )}
                    /> */}

                    <Controller
                        name={'notes'}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <>
                            <label>NOTA</label>
                            <TextField
                                className="formitem"
                                InputProps={{ sx: { borderRadius: "10px" } }}

                                id="outlined-multiline-static"
                                // label="Nota"
                                multiline
                                rows={4}
                                defaultValue="Default Value"
                                {...field}
                            />
                            </>
                        )}
                    />
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", flexDirection: "column" }}>
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

                    <div style={{ display: "flex", justifyContent: "center", paddingBottom: "20px" }}>
                        <p style={{ fontSize: 16, }}>{fotoMensagem}</p>
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