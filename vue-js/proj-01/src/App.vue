<template>
  <div>
    <h1>Meu projeto Vue.JS</h1>
    <p :title="informacao">Autor: {{autor}} - {{criacao}}</p>

    <button @click="trocarInformacoes">Mostrar/Esconder informacoes</button>
    <div v-show="mostrarInformacoesComplementares">
      <h2>Informações Adicionais</h2>
    
      <ul>
        <li v-for="p in projetos" :key="p.nome">{{p.nome}}</li>
      </ul>  
    </div> 

  </div>
</template>

<script>

export default {
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
      ] 
    }
  },
  methods: {
    trocarInformacoes() {
      this.mostrarInformacoesComplementares = !this.mostrarInformacoesComplementares;
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
