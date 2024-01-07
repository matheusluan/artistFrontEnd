import axios from "axios";

export interface ViaCepProps {
    cep: string | "";
    logradouro: string | "";
    complemento: string | "";
    bairro: string | "";
    localidade: string | "";
    uf: string | "";
    erro?: boolean;
}

export async function consultarCEP(cep: string){
    try {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        return ({
            cep: data.cep,
            logradouro: data.logradouro,
            complemento: data.complemento,
            bairro: data.bairro,
            localidade: data.localidade,
            uf: data.uf,
            erro: data.erro
        })
    } catch (error: any) {
        console.log(error.message)
        return undefined;
    }
}