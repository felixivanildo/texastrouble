import { useForm, Controller } from "react-hook-form";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from "axios";

export default function CadastrarUnidadeOrganizacional() {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm();

    const handleSubmitData = async (data) => {
        
        try {
            await axios.post('http://10.254.4.132:3010/api/cadastrar', {dados: data, mode: "unidade"}).then((e)=>{
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
            <h2>Cadastrar Unidade Organizacional</h2>
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <TextField
                    {...register("nomeUnidadeOrg", { required: true })}
                    error={!!errors.nomeUnidadeOrg}
                    helperText={errors.nomeUnidadeOrg ? 'Text cannot be empty' : ''}
                    id="nome-unidade-org" 
                    label="Nome da Unidade Organizacional" 
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
                            control={<Switch/>}
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