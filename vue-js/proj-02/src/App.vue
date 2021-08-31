<template>
  <div>
    <h1>Meu projeto Vue.JS</h1>
    <p :title="informacao">Autor: {{autor}} - {{criacao}}</p>

    <button @click="trocarInformacoes">Mostrar/Esconder informacoes</button>
    <div v-show="mostrarInformacoesComplementares">
      <h2>Informações Adicionais</h2>

      <form @submit.prevent="adicionarProjeto">
        <label for="nome">Nome:</label><br/>
        <input type="text" id="nome" autofocus required v-model="projeto.nome"/><br/>
        <label for="tamanho">Tamanho:</label><br/>
        <input type="number" id="tamanho" required min="0" max="100" v-model="projeto.tamanho"/><br/>
        <input type="submit" value="Adicionar Projeto">
      </form>

      <ul>
        <li v-for="p in projetos" :key="p.nome">{{p.nome}} <button @click="removerItem(p)">Remover</button></li>
      </ul>  
    </div> 

  </div>
</template>

<script>
  export default  {
    data() {
      return {
        autor: 'Adrian Morais',
        criacao: `Criado em ${new Date().toLocaleString()}`,
        informacao: 'Aqui eu posso colocar a informação que eu quiser',
        mostrarInformacoesComplementares: false,
        projetos: [
          { nome: "HTML", tamanho: 100 },
          { nome: "CSS", tamanho: 80 },
          { nome: "JavaScript", tamanho: 200 }
        ],
       projeto: {
        nome: null,
        tamanho: 0
       }  
      }
    },
    methods: {
      trocarInformacoes() {
        this.mostrarInformacoesComplementares = !this.mostrarInformacoesComplementares;
      },
      adicionarProjeto() {
        const newProjeto = {
          nome: this.projeto.nome,
          tamanho: this.projeto.tamanho
        }
        this.projetos.push(newProjeto);
      },
      removerItem(itemToRemove) {
        if(confirm("Excluir Registro ?")) {
          this.projetos.splice(this.projetos.indexOf(itemToRemove), 1);
        }
      }
      
    }
  }  
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
