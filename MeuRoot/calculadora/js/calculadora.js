const textoOperacaoAnterior = document.querySelector("#previous-operation");
const textoOperacaoAtual = document.querySelector("#current-operation");
const botoes = document.querySelectorAll("#buttons-container button");

class Calculadora {
  constructor(textoOperacaoAnterior, textoOperacaoAtual) {
    this.textoOperacaoAnterior = textoOperacaoAnterior;
    this.textoOperacaoAtual = textoOperacaoAtual;
    this.operacaoAtual = "";
  }

  adicionarDigito(digito) {
    console.log(digito);

    if (digito === "." && this.textoOperacaoAtual.innerText.includes(".")) {
      return;
    }

    this.operacaoAtual = digito;
    this.atualizarTela();
  }

  processarOperacao(operacao) {

    if (this.textoOperacaoAtual.innerText === "" && operacao !== "C") {

      if (this.textoOperacaoAnterior.innerText !== "") {
        this.mudarOperacao(operacao);
      }
      return;
    }
    let valorOperacao;
    let anterior = +this.textoOperacaoAnterior.innerText.split(" ")[0];
    let atual = +this.textoOperacaoAtual.innerText;

    switch (operacao) {
      case "+":
        valorOperacao = anterior + atual;
        this.atualizarTela(valorOperacao, operacao, atual, anterior);
        break;
      case "-":
        valorOperacao = anterior - atual;
        this.atualizarTela(valorOperacao, operacao, atual, anterior);
        break;
      case "*":
        valorOperacao = anterior * atual;
        this.atualizarTela(valorOperacao, operacao, atual, anterior);
        break;
      case "/":
        valorOperacao = anterior / atual;
        this.atualizarTela(valorOperacao, operacao, atual, anterior);
        break;
      case "DEL":
        this.processarOperadorDel();
        break;
      case "CE":
        this.processarLimparOperacaoAtual();
        break;
      case "C":
        this.processarLimparOperacao();
        break;
      case "=":
        this.processarOperadorIgual();
        break;
      default:
        return;
    }
  }
  mudarOperacao(operacao) {
    const operacoesMatematicas = ["*", "-", "+", "/"];

    if (!operacoesMatematicas.includes(operacao)) {
      return;
    }

    this.textoOperacaoAnterior.innerText =
      this.textoOperacaoAnterior.innerText.slice(0, -1) + operacao;
  }

  processarOperadorDel() {
    this.textoOperacaoAtual.innerText =
      this.textoOperacaoAtual.innerText.slice(0, -1);
  }
  processarLimparOperacaoAtual() {
    this.textoOperacaoAtual.innerText = "";
  }

  processarLimparOperacao() {
    this.textoOperacaoAtual.innerText = "";
    this.textoOperacaoAnterior.innerText = "";
  }

  processarOperadorIgual() {
    let operacao = this.textoOperacaoAnterior.innerText.split(" ")[1];

    this.processarOperacao(operacao);
  }

  atualizarTela(
    valorOperacao = null,
    operacao = null,
    atual = null,
    anterior = null
  ) {
    if (valorOperacao === null) {

      this.textoOperacaoAtual.innerText += this.operacaoAtual;
    } else {

      if (anterior === 0) {
        valorOperacao = atual;
      }

      this.textoOperacaoAnterior.innerText = `${valorOperacao} ${operacao}`;
      this.textoOperacaoAtual.innerText = "";
    }
  }
}

const calc = new Calculadora(textoOperacaoAnterior, textoOperacaoAtual);

botoes.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const valor = e.target.innerText;

    if (+valor >= 0 || valor === ".") {
      console.log(valor);
      calc.adicionarDigito(valor);
    } else {
      calc.processarOperacao(valor);
    }
  });
});
