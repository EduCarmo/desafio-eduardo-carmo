import { CaixaDaLanchonete } from "./caixa-da-lanchonete.js";
import { metodoPagamento } from "./metodo-pagamento.js";
import { produtos } from "./produtos.js";

const compra = new CaixaDaLanchonete();

const valor_total = compra.calcularValorDaCompra('credito', ['chantily,1','cafe,1']);

console.log(valor_total)
