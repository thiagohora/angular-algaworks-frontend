interface Pessoa {
    nome: string;
    codigo: number;
    ativo: boolean;
    endereco: Endereco;
}

export interface Endereco {
    logradouro: string;
    numero: string;
    bairro: string;
    complemento: string;
    cep: string;
    cidade: string;
    estado: string;
}

export default Pessoa;
