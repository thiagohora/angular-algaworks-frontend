import Pessoa from '../../pessoa/domain/pessoa.model';

interface Lancamento {
    codigo: number;
    tipo: Tipo;
    descricao: string;
    dataVencimento: Date;
    dataPagamento: Date;
    valor: number;
    observacao: string;
    pessoa: Pessoa;
    categoria: Categoria;
}

export interface Categoria {
    codigo: number;
    nome: string;
}

export enum Tipo {
    RECEITA = 'RECEITA',
    DESPESA = 'DESPESA'
}

export default Lancamento;
