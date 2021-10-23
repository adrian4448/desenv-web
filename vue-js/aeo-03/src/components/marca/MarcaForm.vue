<template>
  <div class="marca-form">
      <label for="">Nome</label>
      <input type="text" v-model="marca.nome">
      <button @click="fecharForm">Voltar</button>
      <button @click="cadastrarMarca">{{this.$route.params.id ? 'Alterar' : 'Cadastrar'}} Marca</button>
  </div>
</template>

<script>
export default {
    name: 'MarcaForm',
    props: ['id'],
    data() {
        return {
            marca: {}
        }
    },
    methods: {
        cadastrarMarca() {
            this.$http.post('marca', this.marca).then(() => {
                this.$emit('marcaCadastrada');
                this.fecharForm();
            });
        },
        fecharForm() {
            this.marca = {},
            this.$emit('fechar', false);
            this.$router.push({path: '/marca'});
        }
    },
    created() {
        if(this.$route.params.id) {
            this.$http.get(`marca/${this.$route.params.id}`).then(resp => {
                this.marca = resp.data;
            })
        }
    }
}
</script>

<style>

</style>