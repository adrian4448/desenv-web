<template>
  <div class="table-container">
      <table class="table">
          <thead>
              <tr> 
                <th v-for="column in columns" :key="column">{{ column }}</th>
                <th>Deletar</th>
              </tr>    
          </thead>
          <tbody>
              <tr v-for="(row, index) in rows" :key="index" class="row" :class="[{selected: rowSelected == index }]">
                  <td v-for="rowItem in row" :key="rowItem" @click="selectItem(row, index)">{{ rowItem }}</td>
                  <td><button @click="deleteItem(index)">Excluir</button></td> 
              </tr>    
              <tr v-show="rows.length">
                  <td :colspan="(columns.length + 1) / 2">Número de Itens: {{ rows.length }}</td>
                  <td :colspan="(columns.length + 1) / 2"> Total: {{ totalToShow }}</td>
              </tr>
          </tbody>        
      </table>    
  </div>    
</template>

<script>
export default {
    name: 'Table',
    props: {
        columns: { required: true, type: Array },
        rows: { required: true, type: Array },
        totalToShow: { required: false, type: Number }
    },
    data() {
        return {
            rowSelected: -1
        }
    },
    methods: {
        selectItem(row, index) {
            this.rowSelected = index;
            this.$emit('selectItem', row);
        },
        deleteItem(index) {
            if(confirm('Você deseja deletar o item ?')) {
                this.$emit('deleteItem', index);
            }
        }
    }
}
</script>

<style>
    .table-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 50px
    }

    .table {
        padding: 20px;
        border-collapse: collapse;
        font-size: 20px;
        font-family: sans-serif;
        border: 1px solid rgb(94, 94, 94);
    }

    .table td, th {
        padding: 20px;
        text-align: center;
        color: black;
    }

    .table th {
        border: 1px solid rgb(94, 94, 94);
    }

    .table tr:nth-child(even) {
        background-color: rgb(216, 215, 215);
    }

    .table .row:hover {
        background-color: rgb(180, 178, 178);
    }

    .selected {
        background-color: rgb(141, 141, 141)!important;
    }
    
    .table button {
        border: none;
        background-color: rgb(65, 64, 64);
        font-size: 20px;
        color: white;
        width: 100px;
        height: 45px;
        border-radius: 5px;
    }
</style>