import { useForm, Controller } from "react-hook-form";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from "axios";

export default function CadastrarInterecado() {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm();

    const handleSubmitData = async (data) => {

        try {
            await axios.post('http://10.254.4.132:3010/api/cadastrar', { dados: data, mode: "unidade" }).then((e) => {
                alert(e.data.message)
            })
            reset({ nomeUnidadeOrg: "" });
        } catch (error) {
            alert(error)
        }

    }

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
            <h2>Cadastrar Intereçado</h2>
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <TextField
                    {...register("nomeEmpresa", { required: true })}
                    error={!!errors.nomeEmpresa}
                    helperText={errors.nomeEmpresa ? 'Não pode ficar vazio' : ''}
                    id="nome-unidade-org"
                    label="Nome da Empresa"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />

                <TextField
                    {...register("nomeAbreviado", { required: true })}
                    error={!!errors.nomeAbreviado}
                    helperText={errors.nomeAbreviado ? 'Não pode ficar vazio' : ''}
                    id="nome-unidade-org"
                    label="Nome Abreviado"
                    variant="outlined"
                    margin="normal"
                    fullWidth
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