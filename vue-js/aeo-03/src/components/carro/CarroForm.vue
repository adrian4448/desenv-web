<template>
  <div class="marca-form">
      <label for="">Nome</label>
      <input type="text" v-model="carro.nome">
      
      <label for="">Ano Fabricação</label>
      <input type="text" v-model="carro.anoFabricacao">
      
      <label for="">Ano Modelo</label>
      <input type="text" v-model="carro.anoModelo">
      
      <label for="">Preço</label>
      <input type="number" v-model="carro.preco">
      
      <label for="">Marca</label>
      <select v-model="carro.marca">
          <option v-for="marca in marcas" :key="marca.id" :value="marca">{{ marca.nome }}</option>
      </select>

      <label for="">Cor</label>
      <select v-model="carro.cor">
          <option v-for="cor in cores" :key="cor.id" :value="cor">{{ cor.nome }}</option>
      </select>

      <button @click="fecharForm">Voltar</button>
      <button @click="cadastrarMarca">{{this.$route.params.id ? 'Alterar' : 'Cadastrar'}} Marca</button>
  </div>
</template>

<script>
export default {
    name: 'CarroForm',
    props: ['id'],
    data() {
        return {
            carro: {},
            marcas: [],
            cores: []
        }
    },
    methods: {
        cadastrarMarca() {
            this.$http.post('carro', this.carro).then(() => {
                this.$emit('carroCadastrado');
                this.fecharForm();
            });
        },
        fecharForm() {
            this.carro = {},
            this.$emit('fechar', false);
            this.$router.push({path: '/carro'});
        }
    },
    created() {
        if(this.$route.params.id) {
            this.$http.get(`carro/${this.$route.params.id}`).then(resp => {
                this.carro = resp.data;
            })
        }
        this.$http.get(`marca`).then(resp => {
            this.marcas = resp.data;
        })
        this.$http.get(`cor`).then(resp => {
            this.cores = resp.data;
        })
    }
}
</script>

<style>

</style>