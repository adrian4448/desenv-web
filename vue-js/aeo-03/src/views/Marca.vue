<template>
  <div class="marca-view">
      <button @click="showForm = true">Adicionar</button>
      <MarcaTable :marcas="marcas" @excluir="updateTable"/>
      <MarcaForm v-if="showForm || this.$route.params.id" @fechar="showForm = $event" @marcaCadastrada="updateTable" />
  </div>
</template>

<script>
import MarcaTable from '@/components/marca/MarcaTable.vue'
import MarcaForm from '@/components/marca/MarcaForm.vue'

export default {
    name: 'Marca',
    components: { MarcaTable, MarcaForm },
    data() {
        return {
            showForm: false,
            marcas: []
        }
    },
    methods: {
        updateTable() {    
            this.$http.get('marca').then(resp => {
                this.marcas = resp.data;
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