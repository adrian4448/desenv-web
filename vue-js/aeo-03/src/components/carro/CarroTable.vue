<template>
  <div class="carro-table">
      <table>
          <thead>
              <tr>
                  <th>Código</th>
                  <th>Nome</th>
                  <th>Ano de fabricação</th>
                  <th>Ano Modelo</th>
                  <th>Preço</th>
                  <th>Marca</th>
                  <th>Cor</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="carro in carros" :key="carro.id">
                  <td>{{carro.id}}</td>
                  <td>{{carro.nome}}</td>
                  <td>{{carro.anoFabricacao}}</td>
                  <td>{{carro.anoModelo}}</td>
                  <td>{{carro.preco}}</td>
                  <td><span v-if="carro.marca">{{carro.marca.nome}}</span></td>
                  <td><span v-if="carro.cor">{{carro.cor.nome}}</span></td>
                  <td><button @click="alterarMarca(carro.id)">Alterar</button></td>
                  <td><button @click="excluirMarca(carro.id)">Excluir</button></td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
export default {
    name: 'CarroTable',
    props: ['carros'],
    methods: {
        excluirMarca(carroId) {
            this.$http.delete(`carro/${carroId}`).then(() => {
                this.$emit('excluir');
            });
        },
        alterarMarca(carroId) {
            this.$router.push(`/carro/alterar/${carroId}`);
        }
    }
}
</script>

<style>

</style>