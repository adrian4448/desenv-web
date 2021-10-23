<template>
  <div class="carro-view">
      <button @click="showForm = true">Adicionar</button>
      <CarroTable :carros="carros" @excluir="updateTable"/>
      <CarroForm v-if="showForm || this.$route.params.id" @fechar="showForm = $event" @carroCadastrado="updateTable"/>
  </div>
</template>

<script>
import CarroTable from '@/components/carro/CarroTable.vue'
import CarroForm from '@/components/carro/CarroForm.vue';

export default {
    name: 'Carro',
    components: { CarroTable, CarroForm },
    data() {
        return {
            showForm: false,
            carros: []
        }
    },
    methods: {
        updateTable() {    
            this.$http.get('carro').then(resp => {
                this.carros = resp.data;
            })
        }
    },
    created() {
        this.updateTable();
    }
}
</script>

<style>

</style>