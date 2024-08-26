import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ListaDeLivros from '../pages/ListaDeLivros.vue'
import ListaDeUsuarios from '../pages/ListaDeUsuarios.vue'
import ListaDeClientes from '../pages/ListaDeClientes.vue'
import ListaDeAlugueis from '../pages/ListaDeAlugeis.vue'

const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/livros', name: 'ListaDeLivros', component: ListaDeLivros },
  { path: '/usuarios', name: 'ListaDeUsuarios', component: ListaDeUsuarios },
  { path: '/clientes', name: 'ListaDeClientes', component: ListaDeClientes },
  { path: '/alugueis', name: 'ListaDeAlugueis', component: ListaDeAlugueis },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
