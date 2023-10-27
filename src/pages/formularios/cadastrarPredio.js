import { Controller, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from "axios";

export default function CantonadastrarPredio() {
  const [cidades, setCidades] = useState([{}])

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

  const handleSubmitData = (data) => {
    console.log('submit', data);
    reset();
  }

  useEffect(() => {
    const retrieve = async () => {
      const retrieved = await axios.get('http://10.254.4.132:3010/api/consultarcidade')
      console.log(retrieved)
      setCidades(retrieved.data)
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
      <h2>Cadastrar Prédio</h2>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <TextField
          style={{ marginBottom: 10 }}
          fullWidth
          variant="outlined"
          label="Nome do Prédio"
          {...register("nomePredio", { required: "* Text cannot be empty" })}
          error={!!errors.nomePredio}
          helperText={errors.nomePredio ? errors.nomePredio.message : ""}
        />

        <TextField
          style={{ marginBottom: 10 }}
          fullWidth
          variant="outlined"
          label="Nome Abreviado"
          {...register("nomeSetor", { required: "* Text cannot be empty" })}
          error={!!errors.nomeAbreviado}
          helperText={errors.nomeAbreviado ? errors.nomeAbreviado.message : ""}
        />

        <Controller
          name="Cidade"
          control={control}
          rules={{ required: "* Select an option" }}
          render={({ field, fieldState: { error } }) => {
            const { onChange, ref, value } = field;
            return (
              <Autocomplete
                style={{ marginTop: 10, marginBottom: 10 }}
                options={cidades}
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
                    label="Cidade"
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