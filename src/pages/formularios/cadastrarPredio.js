import { Controller, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';


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

  const handleSubmitData = async (data) => {
    await axios.post('http://10.254.4.132:3010/api/cadastrar', {dados: data, mode: "predio"} ).then((e)=>{
        // alert(String(e.data.message))
        // return <Alert severity="error">This is an error alert — check it out!</Alert>
        toast(String(e.data.message), {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
    })
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
      <ToastContainer />
      <h2>Cadastrar Prédio</h2>
      <form onSubmit={handleSubmit(handleSubmitData)}>
      
        <TextField
          style={{ marginBottom: 10 }}
          fullWidth
          variant="outlined"
          label="Nome do Prédio"
          {...register("nomePredio", { required: "* Não pode ficar vazio" })}
          error={!!errors.nomePredio}
          helperText={errors.nomePredio ? errors.nomePredio.message : ""}
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
          name="Cidade"
          control={control}
          rules={{ required: "* Selecione uma opção" }}
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