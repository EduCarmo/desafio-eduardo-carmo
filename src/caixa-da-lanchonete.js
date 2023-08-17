import { metodoPagamento } from "./metodo-pagamento.js";
import { produtos } from "./produtos.js";

function formatarValor(valor) {
    //22.80 -> R$ 22,00
    valor = 'R$ ' + valor.toString().replaceAll('.',',');
    return valor;
}

function quantidadeValida(itens) {
    for (let i = 0; i < itens.length; i++) {
        var quantidade = itens[i].charAt(itens[i].length-1)
        if(quantidade == 0){
            return false
        }else{
            return true;
        }
    }
}

function carrinhoVazio(itens) {
    if(itens.length > 0) 
        return false 
    else 
        return true;
}

function formaPagamentoValida(formaPagamento) {
    if(formaPagamento) return true;
}

function codigoItemValido(itens) {
    
    var arrayAuxiliar = [];
    
    for (let i = 0; i < produtos.length; i++) {
        arrayAuxiliar.push(produtos[i].codigo)
    }

    for (let j = 0; j < itens.length; j++) {
        var itemCodigo = itens[j].slice(0,itens[j].length-2)
        if(arrayAuxiliar.includes(itemCodigo) ){
            return true;
        }else{
            return false;
        }
    } 
}

function itemExtraValido(itens) {

    var extras = [];
    var principais = [];

    for (let i = 0; i < itens.length; i++) {
        var item = itens[i].slice(0,itens[i].length-2);
        if(item == 'queijo' || item == 'chantily'){
            extras.push(item);
        }
    }

    for (let i = 0; i < itens.length; i++) {
        var item = itens[i].slice(0,itens[i].length-2);
        if(item == 'cafe' || item == 'sanduiche'){
            principais.push(item);
        }
    }

    for (let k = 0; k < itens.length; k++) {

        if(extras.includes(principais[k])){
            console.log('sim')    
            break;    
        }else{
            console.log('nao')        
            break;
        }
    }

    console.log('extras ', extras)
    console.log('principais ', principais)

}

function somaItens(itens, formaPagamento) {
    var total = 0.0;

    for (let i = 0; i < itens.length; i++) {

        for (let j = 0; j < produtos.length; j++) {
            
            var itemCodigo = itens[i].slice(0,itens[i].length-2)
            
            if(itemCodigo == produtos[j].codigo ){

                var produto = produtos[j];
                var quantidade = itens[i].charAt(itens[i].length-1)
                total = (produto.valor * quantidade) + total;

            }
        }
    }
    total = (total * formaPagamento.taxa).toFixed(2);
    return formatarValor(total);
}

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        console.log('itens: ', itens);

        var formaPagamento = metodoPagamento.find(el => el.descricao == metodoDePagamento);

        if(formaPagamentoValida(formaPagamento)){

            if(!carrinhoVazio(itens)){

                if(quantidadeValida(itens)){

                    if(codigoItemValido(itens)){

                        if(itemExtraValido(itens)){
                            return somaItens(itens, formaPagamento);
                        }else{
                            return "Item extra não pode ser pedido sem o principal";
                        }

                    }else{
                        return "Item inválido!";
                    }

                }else{
                    return "Quantidade inválida!";
                }

            }else
                return "Não há itens no carrinho de compra!";           
            
        }else
            return "Forma de pagamento inválida!"
    }

}

export { CaixaDaLanchonete };
