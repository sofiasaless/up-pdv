export class Pedido {
  constructor (id, descricao, preco, quantidade) {
    this.id = id,
    this.descricao = descricao,
    this.preco = preco,
    this.quantidade = quantidade,
    this.total = quantidade*preco
  }
}