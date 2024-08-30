<template>
  <q-page padding>
    <!-- Componente do card -->
    <card-page
      :titleCard="card.title"
      :infoCard="card.info"
      :labelAction="card.labelBtn"
      :iconAction="card.iconBtn"
      class="q-mb-md"
    />

    <!-- Componente de Pesquisa -->
    <search-list
      :items="users"
      label="Pesquisar Usuários"
      @view-details="viewDetails"
      @edit-item="editUser"
      @delete-item="deleteUser"
    />
  </q-page>
</template>

<script>
import SearchList from '../components/SearchList.vue';
import CardPage from '@/components/CardPage.vue';

export default {
  components: {
    SearchList,
    CardPage,
  },
  data() {
    return {
      card: {
        title: "Listagem de Usuários",
        info: "Seja bem-vindo à página de usuários",
        labelBtn: "Novo Usuario",
        iconBtn: "person_add",
      },
      users: [
        { 
          id: 1, 
          title: 'Matheus Wesley',
          subtitle: 'Leitor',
          description: ''
        },
        { 
          id: 2,
          title: 'John Doe',
          subtitle: 'Editor',
          description: ''
        }
      ]
    };
  },
  methods: {
    viewDetails(item) {
      console.log('Visualizar detalhes:', item);
    },
    editUser(item) {
      console.log('Editar livro:', item);
      // Lógica de edição pode ser implementada aqui
    },
    deleteUser(id) {
      const index = this.users.findIndex(user => user.id === id);
      if (index !== -1) {
        this.users.splice(index, 1);
        console.log(`Usuário ${id} excluído.`);
      }
    }
  }
};
</script>

<style scoped>
.q-page {
  max-width: 90vw;
  margin: 0 auto;
}
</style>
