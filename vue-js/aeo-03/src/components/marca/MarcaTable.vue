<template>
  <div class="marca-table">
      <table>
          <thead>
              <tr>
                  <th>Código</th>
                  <th>Nome</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="marca in marcas" :key="marca.id">
                  <td>{{marca.id}}</td>
                  <td>{{marca.nome}}</td>
                  <td><button @click="alterarMarca(marca.id)">Alterar</button></td>
                  <td><button @click="excluirMarca(marca.id)">Excluir</button></td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
export default {
    name: 'MarcaTable',
    props: ['marcas'],
    methods: {
        excluirMarca(marcaId) {
            this.$http.delete(`marca/${marcaId}`).then(() => {
                this.$emit('excluir');
            });
        },
        alterarMarca(marcaId) {
            this.$router.push(`/marca/alterar/${marcaId}`);
        }
    }
}
</script>

<style>

</style>