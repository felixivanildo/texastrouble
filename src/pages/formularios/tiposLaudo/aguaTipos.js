

export async function Tipo (data){

    // console.log(data.report)

    if(data.agua==="agua_bruta"){
        
            if(data.report==="fisico_quimico"){
                return [{ "name": "ph" },
                { "name": "cor_aparente" },
                { "name": "turbidez" },
                { "name": "condutancia_especifica" },
                { "name": "acidez" },
                { "name": "alcalinidade_oh" },
                { "name": "alcalinidade_co" },
                { "name": "alcalinidade_hco" },
                { "name": "dureza_total" },
                { "name": "dureza_carbonatos" },
                { "name": "dureza_ncarbonatos" },
                { "name": "calcio" },
                { "name": "magnesio" },
                { "name": "cloretos" },
                { "name": "silica" },
                { "name": "sulfato" },
                { "name": "amonia" },
                { "name": "nitrato" },
                { "name": "nitrito" },
                { "name": "indice_nitrato_nitrito" },
                { "name": "ferro_total" },
                { "name": "sodio" },
                { "name": "potassio" },
                { "name": "solidos_totais" },
                { "name": "cloro_residual_livre" },
                { "name": "coliformes_totais" },
                { "name": "escherichia_coli" }]
            }
            if(data.report==="bacteriologica"){
                // console.log('entrei')
                return [
                    { "name": "nmr_amostra" },
                    { "name": "data_coleta" },
                    { "name": "local_coleta" },
                    { "name": "cor" },
                    { "name": "turbidez" },
                    { "name": "cloro_residual_livre" },
                    { "name": "coliformes_totais" },
                    { "name": "escherichia_coli" },
                    { "name": "ph" }
                ]
            }



            if(data.report==="clorofila"){
                return [{ "name": "procedencia" },
                { "name": "endereco" },
                { "name": "data_coleta" },
                { "name": "hora_coleta" },
                { "name": "observacao-do-ambiente" },
                { "name": "entrada-no-laboratorio" },
                { "name": "condicao-da-amostra" },
                { "name": "inicio-analise" },
                { "name": "termino-analise" },
                { "name": "volume-filtrado" },
                { "name": "metodo" },
                { "name": "resultado" }]
            }
    }


    if(data.agua==="agua_tratada"){
        if(data.report==="fisico_quimico"){
            return [ { "name": "ph", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "cor_verdadeira", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "turbidez", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "condutancia_especifica", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "acidez", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "alcalinidade_oh", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "alcalinidade_co", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "alcalinidade_hco", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "dureza_total", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "dureza_carbonatos", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "dureza_ncarbonatos", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "calcio", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "magnesio", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "cloretos", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "silica", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "sulfato", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "amonia", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "nitrato", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "nitrito", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "ferro_total", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "sodio", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "potassio", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "solidos_totais", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "coliformes_totais", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "escherichia_coli", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
            { "name": "clorofila_a", "text": "character varying(15) COLLATE pg_catalog.\"default\"" }]
        }


        if(data.report==="bacteriologica"){
            return [
                { "name": "numero_amostra", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "data_coleta", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "local_coleta", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "cor", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "turbidez", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "cloro_residual_livre", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "coliformes_totais", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "escherichia_coli", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "ph", "text": "character varying(15) COLLATE pg_catalog.\"default\"" }
            ]
        }



        if(data.report==="iqa_eta_poco"){
            console.log('entrei')
            return [
                { "name": "data_coleta", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "ponto_coleta", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "cor", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "turbidez", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "cloro", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "coliformeis", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "e_coli", "text": "character varying(15) COLLATE pg_catalog.\"default\"" }
            ]
        }



        if(data.report==="snis"){
            return [
                { "name": "municipio", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "quantidade_minima_amostras_cloro_residual", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "quantidade_amostras_cloro_residual", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "quantidade_amostras_cloro_residual_fora_do_padrao", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "quantidade_minima_amostras_turbidez", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "quantidade_amostras_turbidez", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "quantidade_amostras_turbidez_fora_do_padrao", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "quantidade_minima_amostras_coliformes_totais", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "quantidade_amostras_coliformes_totais", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
                { "name": "quantidade_amostras_coliformes_totais_fora_do_padrao", "text": "character varying(15) COLLATE pg_catalog.\"default\"" }
            ]
        }
    }
   
}