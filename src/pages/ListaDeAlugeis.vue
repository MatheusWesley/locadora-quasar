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
      :items="rentedBooks"
      label="Pesquisar Clientes"
      @view-details="viewDetails"
      @edit-item="editRent"
      @delete-item="deleteRent"
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
        title: "Listagem de alugueis",
        info: "Seja bem-vindo à página de alugueis",
        labelBtn: "Novo Aluguel",
        iconBtn: "add_shopping_cart",
      },
      rentedBooks: [
        {
          id: 1,
          title: 'O Senhor do Anéis',
          subtitle: 'Matheus Wesley',
          description: 'Devolução prevista para o próximo mês.'
        },
        {
          id: 2,
          title: 'To Kill a Mockingbird',
          subtitle: 'John Doe',
          description: 'Cliente fiel, sempre devolve os livros em ótimo estado.'
        },
        {
          id: 3,
          title: 'Pride and Prejudice',
          subtitle: 'Jane Smith',
          description: 'Cliente nova, gosta de literatura clássica.'
        },
        {
          id: 4,
          title: 'The Great Gatsby',
          subtitle: 'Alice Johnson',
          description: 'Primeira vez que aluga um livro na locadora.'
        },
        {
          id: 5,
          title: 'Moby Dick',
          subtitle: 'Robert Brown',
          description: 'Solicitou extensão no prazo de devolução.'
        }
      ]
    };
  },
  methods: {
    viewDetails(item) {
      console.log('Visualizar detalhes:', item);
    },
    editRent(item) {
      console.log('Editar aluguel:', item);
      // Lógica de edição pode ser implementada aqui
    },
    deleteRent(id) {
      const index = this.rentedBooks.findIndex(rent => rent.id === id);
      if (index !== -1) {
        this.rentedBooks.splice(index, 1);
        console.log(`Aluguel ${id} excluído.`);
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
