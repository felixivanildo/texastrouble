import React from "react";
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField } from "@mui/material";

export default function Laudo() {
    const { handleSubmit, control } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission logic here
    };

    const json = [
        { "name": "measuringid", "text": "serial primary key" },
        { "name": "reportid", "text": "integer not null" },
        { "name": "updatedat", "text": "date" },
        { "name": "createdat", "text": "date DEFAULT CURRENT_DATE" },
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
            <div style={{ marginLeft: "10%", marginRight: "10%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                    </div>


                    <Controller
                        name={'notes'}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                id="outlined-multiline-static"
                                label="Nota"
                                multiline
                                rows={4}
                                defaultValue="Default Value"
                                {...field}
                            />
                        )}
                    />




                </form>
                <Button style={{ marginTop: "10px" }} type="submit" variant="contained" color="primary">
                    Submit
                </Button>

            </div>


        </div>
    );
}