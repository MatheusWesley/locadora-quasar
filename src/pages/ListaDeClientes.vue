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
      :items="clients"
      label="Pesquisar Clientes"
      @view-details="viewDetails"
      @edit-item="editClient"
      @delete-item="deleteClient"
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
        title: "Listagem de clientes",
        info: "Seja bem-vindo à página de clientes",
        labelBtn: "Novo Cliente",
        iconBtn: "group_add",
      },
      clients: [
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
        },
        {
          id: 3,
          title: 'Ana Silva',
          subtitle: 'Autor',
          description: 'Autora de vários best-sellers na área de ficção científica.'
        },
        {
          id: 4,
          title: 'Carlos Souza',
          subtitle: 'Revisor',
          description: 'Especialista em revisão de textos acadêmicos e técnicos.'
        },
        {
          id: 5,
          title: 'Maria Oliveira',
          subtitle: 'Designer de Capas',
          description: 'Criadora de capas premiadas para livros de fantasia.'
        },
        {
          id: 6,
          title: 'Lucas Ferreira',
          subtitle: 'Tradutor',
          description: 'Tradutor experiente, fluente em inglês, espanhol e francês.'
        }
      ]

    };
  },
  methods: {
    viewDetails(item) {
      console.log('Visualizar detalhes:', item);
    },
    editClient(item) {
      console.log('Editar cliente:', item);
      // Lógica de edição pode ser implementada aqui
    },
    deleteClient(id) {
      const index = this.clients.findIndex(client => client.id === id);
      if (index !== -1) {
        this.clients.splice(index, 1);
        console.log(`Cliente ${id} excluído.`);
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
