import { Controller, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from "axios";

export default function CadastrarSetor() {
  const [predios, setPredios] = useState([{}])

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm();

  // const unidades = [
  //   { title: 'Teste 1', id: 1 },
  //   { title: 'Teste 2', id: 2 },
  //   { title: 'Teste 3', id: 3 }
  // ]

  const handleSubmitData = async (data) => {
    console.log(data)
    await axios.post('http://10.254.4.132:3010/api/cadastrar', {dados: data, mode: "setor"} ).then((e)=>{
        alert(e.data.message)
    })
    reset();
  }

  useEffect(() => {
    const retrieve = async () => {
      const retrieved = await axios.get('http://10.254.4.132:3010/api/getbuilding')
      console.log(retrieved)
      setPredios(retrieved.data)
    }

    retrieve()
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 500,
        padding: 3,
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}
    >
      <h2>Cadastrar Setor</h2>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <TextField
          style={{ marginBottom: 10 }}
          fullWidth
          variant="outlined"
          label="Nome do Setor"
          {...register("nomeSetor", { required: "* Não pode ficar vazio" })}
          error={!!errors.nomeSetor}
          helperText={errors.nomeSetor ? errors.nomeSetor.message : ""}
        />

        <TextField
          style={{ marginBottom: 10 }}
          fullWidth
          variant="outlined"
          label="Nome Abreviado"
          {...register("nomeAbreviado", { required: "* Não pode ficar vazio" })}
          error={!!errors.nomeAbreviado}
          helperText={errors.nomeAbreviado ? errors.nomeAbreviado.message : ""}
        />

        <Controller
          name="Predio"
          control={control}
          rules={{ required: "* Selecione uma opção" }}
          render={({ field, fieldState: { error } }) => {
            const { onChange, ref, value } = field;
            return (
              <Autocomplete
                style={{ marginTop: 10, marginBottom: 10 }}
                options={predios}
                value={value || null}
                getOptionLabel={(option) => {
                  return option.title;
                }}
                isOptionEqualToValue={(option, value) => {
                  return option?.id === value?.id;
                }}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    label="Prédio"
                    {...params}
                    inputRef={ref}
                    error={!!errors.Cidade}
                    helperText={errors.Cidade ? error.message : ""}
                  />
                )}
              />
            )
          }}
        />

        <Controller
          name="switchFieldName"
          control={control}
          defaultValue={true}
          render={({ field: { value, ...field } }) => (
            <FormControlLabel
              {...field}
              checked={value}
              control={<Switch />}
              label="Ativa para uso"
            />
          )}
        />

        <Button
          type="submit"
          size="large"
          variant="contained"
          fullWidth
          style={{ marginTop: 10 }}
        >
          Continue
        </Button>
      </form>
    </Box>
  )
}