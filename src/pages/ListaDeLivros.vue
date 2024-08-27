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
      :items="books"
      label="Pesquisar Livros"
      @view-details="viewDetails"
      @edit-item="editBook"
      @delete-item="deleteBook"
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
        title: "Listagem de Livros",
        info: "Seja bem-vindo à página de livros",
        labelBtn: "Novo Livro",
        iconBtn: "bookmark_add",
      },
      books: [
        { 
          id: 1, 
          title: 'O Senhor dos Anéis',
          subtitle: 'J.R.R. Tolkien',
          description: 'A história narra o conflito contra o mal que se alastra pela Terra-média...'
        },
        { 
          id: 2,
          title: '1984',
          subtitle: 'George Orwell',
          description: 'A narrativa revela um futuro distópico em que o Estado é extremamente autoritário...'
        },
        { 
          id: 3,
          title: 'O Hobbit',
          subtitle: 'J.R.R. Tolkien',
          description: 'Bilbo Bolseiro é um hobbit que leva uma vida confortável e sem ambições...'
        },
        { 
          id: 4,
          title: 'Dom Casmurro',
          subtitle: 'Machado de Assis',
          description: 'Dom Casmurro conta a história de Bento Santiago (Bentinho), apelidado de Dom Casmurro...'
        },
        { 
          id: 5,
          title: 'Moby Dick',
          subtitle: 'Herman Melville',
          description: 'O livro traz o relato de um marinheiro letrado, Ishmael, sobre a última viagem de um navio...'
        }
      ]
    };
  },
  methods: {
    viewDetails(item) {
      console.log('Visualizar detalhes:', item);
    },
    editBook(item) {
      console.log('Editar livro:', item);
      // Lógica de edição pode ser implementada aqui
    },
    deleteBook(id) {
      const index = this.books.findIndex(book => book.id === id);
      if (index !== -1) {
        this.books.splice(index, 1);
        console.log(`Livro ${id} excluído.`);
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
