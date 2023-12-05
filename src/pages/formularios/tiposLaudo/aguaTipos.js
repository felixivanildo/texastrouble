

export async function Tipo (data){

    // console.log(data.report)

    if(data.agua==="agua_bruta"){
        
            if(data.report==="fisico_quimico"){
                return [{ "name": "fq_ph", "text": "PH"},
                { "name": "fq_cor_aparente", "text": "COR APARENTE"},
                { "name": "fq_turbidez" , "text": "TURBIDEZ"},
                { "name": "fq_condutancia_especifica" , "text": "CONDUTANCIA ESPECIFICA"},
                { "name": "fq_acidez" , "text": "ACIDEZ"},
                { "name": "fq_alcalinidade_oh" , "text": "ALCALINIDADE OH"},
                { "name": "fq_alcalinidade_co" , "text": "ALCALINIDADE CO"},
                { "name": "fq_alcalinidade_hco" , "text": "ALCALINIDADE HCO"},
                { "name": "fq_dureza_total" , "text": "DUREZA TOTAL"},
                { "name": "fq_dureza_carbonatos" , "text": "DUREZA CARBONATOS"},
                { "name": "fq_dureza_ncarbonatos" , "text": "DUREZA N/CARBONATOS"},
                { "name": "fq_calcio" , "text": "CALCIO"},
                { "name": "fq_magnesio" , "text": "MAGNESIO"},
                { "name": "fq_cloretos" , "text": "CLORETOS"},
                { "name": "fq_silica" , "text": "SILICA"},
                { "name": "fq_sulfato" , "text": "SULFATO"},
                { "name": "fq_amonia" , "text": "AMÔNIA"},
                { "name": "fq_nitrato" , "text": "NITRATRO"},
                { "name": "fq_nitrito" , "text": "NITRITO"},
                { "name": "fq_indice_nitrato_nitrito" , "text": "INDICE NITRATO/NITRITO"},
                { "name": "fq_ferro_total" , "text": "FERRO TOTAL"},
                { "name": "fq_sodio" , "text": "SODIO"},
                { "name": "fq_potassio" , "text": "POTASSIO"},
                { "name": "fq_solidos_totais" , "text": "SOLIDOS TOTAIS"},
                { "name": "fq_cloro_residual_livre" , "text": "CLORO RESIDUAL LIVRE"},
                { "name": "fq_coliformes_totais" , "text": "COLIFORMES TOTAIS"},
                { "name": "fq_escherichia_coli" , "text": "E. COLI"}]
            }
            if(data.report==="bacteriologica"){
                // console.log('entrei')
                return [
                    { "name": "bc_cor" , "text": "COR"},
                    { "name": "bc_turbidez", "text": "TURBIDEZ"},
                    { "name": "bc_cloro_residual_livre" , "text": "CLORO RESIDUAL LIVRE"},
                    { "name": "bc_coliformes_totais" , "text": "COLIFORMES TOTAIS"},
                    { "name": "bc_escherichia_coli" , "text": "ESCHERIA COLI"},
                    { "name": "bc_ph" , "text": "PH"}
                ]
            }



            if(data.report==="clorofila"){
                return [{ "name": "clr_procedencia" , "text": "PROCEDENCIA"},                           
                { "name": "clr_observacao_do_ambiente" , "text": "OBSERVAÇÃO DO AMBIENTE"},
                { "name": "clr_entrada_no_laboratorio" , "text": "ENTRADA NO LABORATORIO"},
                { "name": "clr_condicao_da_amostra" , "text": "CONDIÇÃO DA AMOSTRA"},
                { "name": "clr_inicio_analise" , "text": "INICIO DA ANALISE"},
                { "name": "clr_termino_analise" , "text": "TERMINO DA ANALISE"},
                { "name": "clr_volume_filtrado" , "text": "VOLUME FILTRADO"},
                { "name": "clr_resultado" , "text": "RESULTADO"}]
            }
    }


    if(data.agua==="agua_tratada"){
        if(data.report==="fisico_quimico"){
            return [{ "name": "fq_ph", "text": "PH"},
                { "name": "fq_cor_aparente", "text": "COR APARENTE"},
                { "name": "fq_turbidez" , "text": "TURBIDEZ"},
                { "name": "fq_condutancia_especifica" , "text": "CONDUTANCIA ESPECIFICA"},
                { "name": "fq_acidez" , "text": "ACIDEZ"},
                { "name": "fq_alcalinidade_oh" , "text": "ALCALINIDADE OH"},
                { "name": "fq_alcalinidade_co" , "text": "ALCALINIDADE CO"},
                { "name": "fq_alcalinidade_hco" , "text": "ALCALINIDADE HCO"},
                { "name": "fq_dureza_total" , "text": "DUREZA TOTAL"},
                { "name": "fq_dureza_carbonatos" , "text": "DUREZA CARBONATOS"},
                { "name": "fq_dureza_ncarbonatos" , "text": "DUREZA N/CARBONATOS"},
                { "name": "fq_calcio" , "text": "CALCIO"},
                { "name": "fq_magnesio" , "text": "MAGNESIO"},
                { "name": "fq_cloretos" , "text": "CLORETOS"},
                { "name": "fq_silica" , "text": "SILICA"},
                { "name": "fq_sulfato" , "text": "SULFATO"},
                { "name": "fq_amonia" , "text": "AMÔNIA"},
                { "name": "fq_nitrato" , "text": "NITRATRO"},
                { "name": "fq_nitrito" , "text": "NITRITO"},
                { "name": "fq_indice_nitrato_nitrito" , "text": "INDICE NITRATO/NITRITO"},
                { "name": "fq_ferro_total" , "text": "FERRO TOTAL"},
                { "name": "fq_sodio" , "text": "SODIO"},
                { "name": "fq_potassio" , "text": "POTASSIO"},
                { "name": "fq_solidos_totais" , "text": "SOLIDOS TOTAIS"},
                { "name": "fq_cloro_residual_livre" , "text": "CLORO RESIDUAL LIVRE"},
                { "name": "fq_coliformes_totais" , "text": "COLIFORMES TOTAIS"},
                { "name": "fq_escherichia_coli" , "text": "E. COLI"}]
        }
        if(data.report==="bacteriologica"){
            return [
                { "name": "bc_cor" , "text": "COR"},
                { "name": "bc_turbidez", "text": "TURBIDEZ" },
                { "name": "bc_cloro_residual_livre" , "text": "CLORO RESIDUAL LIVRE"},
                { "name": "bc_coliformes_totais" , "text": "COLIFORMES TOTAIS"},
                { "name": "bc_escherichia_coli" , "text": "ESCHERIA COLI"},
                { "name": "bc_ph" , "text": "PH"}
            ]
        }



       
    }
   
}