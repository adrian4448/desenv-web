<template>
  <div>
    <div>
      <form>
        <label for="nome">Nome</label>
        <input type="text" name="nome" v-model="pessoa.nome" required>   
        <label for="email">Email</label>
        <input type="email" name="email" v-model="pessoa.email" required>       
        <input @click="cadastrarPessoa" type="button" :value="savePerson">
        <input @click="sortearPessoa" type="button" value="Sortear">
      </form>  
      <label for="filter">Pesquisar</label>
      <input type="text" name="filter" v-model="filter">
    </div>
    <div> 
      <table>
        <tr> 
          <th>Código</th>
          <th @click="ordenarNomes()">Nome</th>
          <th>E-mail</th> {{filter}}
        </tr>
        <tr v-for="p in getPessoas" :key="p.id">
          <td>{{p.id}}</td>
          <td>{{p.nome}}</td>
          <td>{{p.email}}</td>
          <td><button @click="excluirPessoa(p)" type="button">Excluir</button></td>
          <td><button @click="alterarPessoa(p)">Alterar</button></td>
        </tr>
        <tr>
          <td style="text-align: left" colspan="3">Total de pessoas: {{totalPessoas}}</td>
        </tr>    
      </table>  
    </div>
  </div>  
</template>

<script>

export default {
  data() {
    return {
      pessoas: [],
      pessoa: { id: "", nome: "", email: "" },
      isAlteracao: false,
      filter: "",
      asc: true
    }
  },
  methods: {
    cadastrarPessoa() {
      const pessoaToSave = Object.assign({}, this.pessoa);
      const pessoaIsExists = this.pessoas.find(p => p.nome == pessoaToSave.nome);
      if(!pessoaIsExists) {
        if(this.isAlteracao) {
          this.pessoas[pessoaToSave.id - 1] = this.pessoa;         
        } else {
          pessoaToSave.id = this.pessoas.length + 1;
          this.pessoas.push(pessoaToSave);
        }
        this.reset();
      }else {
        alert('Já possui uma pessoa cadastrada com este nome !');
      }
    },
    excluirPessoa(pessoaToExclude) {
      this.pessoas.splice(this.pessoas.indexOf(pessoaToExclude), 1);
    },
    sortearPessoa() {
      alert(`Parábens ${this.pessoas[Math.floor(Math.random() * this.pessoas.length)].nome} você é o ganhador`);
    },
    alterarPessoa(pessoaToAlter) {
      this.isAlteracao = true;
      this.pessoa = Object.assign({}, pessoaToAlter);
    },
    ordenarNomes() {
      if(this.asc) {
        this.asc = false;
        this.pessoas.sort(function (a, b) {
          if(a.nome > b.nome) {
            return 1;
          }if(a.nome < b.nome) {
            return -1;
          }
          return 0
        });
      }else {
        this.asc = true;
        this.pessoas.sort(function (a, b) {
          if(a.nome < b.nome) {
            return 1;
          }if(a.nome > b.nome) {
            return -1;
          }
          return 0
        });
      }
    },
    reset() {
      this.pessoa = {};
      this.isAlteracao = false;
    }
  },
  computed: {
    totalPessoas() {
      return this.getPessoas.length;
    },
    savePerson() {
      return this.isAlteracao ? 'Alterar' : 'Salvar';
    },
    getPessoas() {
      if(this.filter == "") {
        return this.pessoas;
      }else {
        return this.pessoas.filter(p => p.nome.includes(this.filter));
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

table {
  margin: auto;
  margin-top: 50px;
}

table td {
  padding: 15px;
}

.labelled-input {
  display: flex;
  flex-direction: column;
  width: 15%;
  margin: auto;
}

</style>
