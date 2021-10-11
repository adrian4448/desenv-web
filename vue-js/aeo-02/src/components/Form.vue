<template>
  <div class="form-container" @submit.prevent="saveItem">
      <form class="form">
          <div class="label-container" v-for="(value, key, index) in modelObject" :key="key">
            <label>{{ labels[index] }}</label>
              <input :type="inputTypes[typeof(value)]" v-model.lazy="itemToSave[key]" required/>
          </div>
          <input type="submit" :value="isEditing ? 'Alterar' : 'Salvar'"/>
      </form>
  </div>
</template>

<script>
export default {
    name: "Form",
    props: {
        labels: { required: true, type: Array },
        modelObject: { required: true, type: Object },
        objectToEdit: { required: false, type: Object }
    },
    data() {
        return {
            inputTypes: {
                string: 'text',
                object: 'date',
                number: 'number'
            },
            itemToSave: {},
            isEditing: false
        }
    },
    methods: {
        saveItem() {
            if(!this.isEditing) {
                this.$emit('adicionarItem', this.itemToSave);
                this.itemToSave = {};
            }else {
                this.$emit('alterarItem', this.itemToSave);
                this.isEditing = false;
                this.itemToSave = {};
            }
        }
    },
    beforeUpdate() {
        if(Object.values(this.objectToEdit).length) {
            this.itemToSave = this.objectToEdit;
            this.isEditing = true;
        }
    }
}
</script>

<style>
    .form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 800px;
        margin: 50px;
        font-size: 20px;
        font-family: sans-serif;
        padding: 35px;
    }

    .form input[type=submit] {
        background-color: rgb(65, 64, 64);
        margin: 5px;
        border: none;
        width: 100px;
        height: 40px;
        border-radius: 5px;
        color: white;
        align-self: flex-start;
        font-size: 20px;
    }

    .label-container {
        display: flex;
        flex-direction: column;
    }

    .label-container input {
        width: 600px;
        height: 30px;
        margin: 10px;
        font-size: 20px;
    }
    
</style>