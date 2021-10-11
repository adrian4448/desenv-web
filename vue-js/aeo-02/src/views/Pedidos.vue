<template>
  <div class="pedidos-conteiner">
    <PedidoMake :pedido="pedidoSelecionado" 
                @adicionarItemPedido="adicionarItemPedido"
                @deletarItemPedido="deletarItemPedido"
                @alterarItemPedido="alterarItemPedido"
                @voltar="pedidoSelecionado = {}"
                @alterarPedido="alterarPedido"
                v-if="pedidoSelecionado.codigoPedido"/>    

    <div v-else>
        <Table :columns="labels" 
            :rows="pedidosToShow"
            @selectItem="selecionarPedido"
            @deleteItem="deletarPedido"
            :totalToShow="totalPedidos"
            v-if="pedidos.length"/>

        <div class="buttons">
            <button @click="openModal = true">Adicionar Item</button> 
        </div>      
    </div>    
    

    <Modal v-if="openModal"
        @closeModal="openModal = false">
            <Form :labels="labels"
                  :modelObject="pedidoToSave"
                  @adicionarItem="salvarPedido"/>
    </Modal>

  </div>    
</template>

<script>
import PedidoMake from './PedidoMake.vue';
import Table from '@/components/Table.vue';
import Modal from '@/components/Modal.vue';
import Form from '@/components/Form.vue';

export default {
    name: 'Pedidos',
    components: { PedidoMake, Table, Modal, Form },
    data() {
        return {
            labels: ['Número do pedido', 'Cliente', 'Data de emissão'],
            pedidos: [],
            pedidoSelecionado: {},
            pedidoToSave: { codigoPedido: '', cliente: ''},
            openModal: true
        }
    },
    methods: {
        selecionarPedido(pedido) {
            this.pedidoSelecionado = this.pedidos.filter(p =>
                 p.codigoPedido == pedido.codigoPedido)[0];
        },
        deletarPedido(pedidoIndex) {
            this.pedidos.splice(pedidoIndex, 1);
        },
        adicionarItemPedido(itemPedido) {
            this.pedidoSelecionado.pedidoItens.push(itemPedido);
        },
        deletarItemPedido(itemPedidoIndex) {
            this.pedidoSelecionado.pedidoItens.splice(itemPedidoIndex, 1);
        },
        salvarPedido(pedido) {
            const pedidoToSave = Object.assign({}, pedido);
            pedidoToSave.dataEmissao = new Date().toLocaleDateString();
            pedidoToSave.pedidoItens = [];
            this.pedidos.push(pedidoToSave);
        },
        alterarPedido(pedido) {
            this.pedidos.forEach((p, index) => {
                if(p.codigoPedido == pedido.codigoPedido) {
                    const pedidoItens = p.pedidoItens;
                    pedido.pedidoItens = pedidoItens;
                    this.pedidos[index] = pedido;
                }   
            });    
        }
    },
    computed: {
        pedidosToShow() {
            const pedidosToShow = [];
            this.pedidos.forEach(pedido => {
                const pedidoToShow = Object.assign({}, pedido);
                delete pedidoToShow.pedidoItens;
                pedidosToShow.push(pedidoToShow);
            })
            return pedidosToShow;
        },
        totalPedidos() {
            let total = 0;
            this.pedidos.forEach(p => {
                if(p.pedidoItens.length) {
                    total += p.pedidoItens.reduce((contador, newValue) => contador + newValue.total,0);
                }
            });
            return total;
        }
    }
}
</script>

<style>
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