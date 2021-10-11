<template>
  <div class="pedido-make-container">
    <div class="pedido-make">
        <div class="pedido-itens">
            <h2> Itens do pedido </h2>
            <Table :columns="pedidoItensLabels" :rows="pedido.pedidoItens" :totalToShow="totalPedidoItens"
                   v-if="pedido.pedidoItens.length"
                   @selectItem="selecionarItem"
                   @deleteItem="deletarItem" />

            <div class="buttons">
                <button @click="openModal = true">Adicionar Item</button>
                <button @click="$emit('voltar')"> Voltar </button> 
            </div>      
        </div>    
        
        <Form :labels="pedidoLabels" :modelObject="pedidoToEdit"
              :objectToEdit="pedidoSelected"
              @alterarItem="alterarPedido" >
        </Form>

        <Modal v-show="openModal" @closeModal="openModal = false">
            <Form :labels="pedidoItensLabels" :modelObject="pedidoItemToEdit" 
                @adicionarItem="adicionarItemPedido"
                @alterarItem="alterarItemPedido"
                :objectToEdit="pedidoItemSelected"/>
        </Modal>
    </div>        
  </div>    
</template>

<script>
import Table from '@/components/Table.vue';
import Form from '@/components/Form.vue';
import Modal from '@/components/Modal.vue'

export default {
    name: 'PedidoMake',
    components: { Table, Form, Modal },
    props: {
        pedido: {
            required: false,
            type: Object
        }
    },
    data() {
        return {
            pedidoItensLabels: ['Produto', 'Quantidade', 'Valor unitario', 'Valor Desconto', 'Total'],
            pedidoLabels: ['Código do pedido', 'Cliente', 'Data de emissão'],
            
            pedidoItemToEdit: {produto: '', quantidade: 0, valorUnitario: 0.0, valorDesconto: 0.0},
            pedidoItemSelected: {},
            
            pedidoToEdit: { codigoPedido: 0, cliente: '', dataEmissao: new Date() },
            pedidoSelected: { },
            openModal: false
        }
    },
    methods: {
        adicionarItemPedido(pedido) {
            const newPedido = Object.assign({}, pedido);
            newPedido.total = (newPedido.valorUnitario * newPedido.quantidade) - newPedido.valorDesconto;
            this.$emit('adicionarItemPedido', newPedido);
        },
        alterarItemPedido() {
            this.pedidoItemSelected.total = (this.pedidoItemSelected.valorUnitario * this.pedidoItemSelected.quantidade) - this.pedidoItemSelected.valorDesconto;
            this.openModal = false;
            this.pedidoItemSelected = {};
        },
        selecionarItem(item) {
            this.pedidoItemSelected = item;
            this.openModal = true;
        },
        deletarItem(item) {
            this.$emit('deletarItemPedido', item);
        },
        alterarPedido(pedido) {
            this.$emit('alterarPedido', pedido);
        }
    },
    computed: {
        totalPedidoItens() {
            return this.pedido.pedidoItens.length ? this.pedido.pedidoItens.reduce((acumulador, newValue) => acumulador + newValue.total, 0) : 0;
        }
    },
    mounted() {
        this.pedidoSelected = { codigoPedido: this.pedido.codigoPedido, dataEmissao: this.pedido.dataEmissao, cliente: this.pedido.cliente };
    }
}
</script>

<style>
    .pedido-make-container {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .pedido-make {
        display: flex;
    }

    .pedido-itens {
        margin: 50px 0px 0px 50px;  
    }

    .pedido-itens h2 {
        font-family: sans-serif;
        margin: 40px;
    }

    .buttons {
        margin: 30px;
    } 

    .buttons button {
        border: none;
        background-color: rgb(65, 64, 64);
        font-size: 18px;
        color: white;
        height: 60px;
        border-radius: 5px;
        width: 150px;
        margin: 20px;
    }
</style>