import Vue from 'vue';
import router from 'vue-router';
import Marca from './views/Marca.vue'
import MarcaForm from './components/marca/MarcaForm.vue'
import Carro from './views/Carros.vue'
import CarroForm from './components/carro/CarroForm.vue'

Vue.use(router)

export default new router({
    mode: 'history',
    routes: [
        { 
            path: '/marca', component: Marca,
            children: [ 
                { path: 'alterar/:id', component: MarcaForm, props: true }
            ]
        },
        {   path: '/carro', component: Carro,
            children: [ 
                { path: 'alterar/:id', component: CarroForm, props: true }
            ]
        }
    ]
})