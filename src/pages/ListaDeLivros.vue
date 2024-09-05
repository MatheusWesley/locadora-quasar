<template>
  <q-page padding>
    <!-- Componente do card -->
    <card-page
      :titleCard="card.title"
      :infoCard="card.info"
      :labelAction="card.labelBtn"
      :iconAction="card.iconBtn"
      :onSubmit="addNewBook"
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
import LocalStorageServices from '../services/localStorageServices'

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
      books: [],
      localStorageService: new LocalStorageServices('books')
    };
  },
  mounted() {
    const storedBooks = JSON.parse(localStorage.getItem('books'));
    if (storedBooks) {
      this.books = storedBooks;
      console.log(storedBooks);
      
    } else {
      console.log('Sem nada');
      
    }
  },
  methods: {
    viewDetails(item) {
      console.log('Visualizar detalhes:', item);
    },
    addNewBook(item) {
      const newBook = {
        id: Date.now(),
        title: item.title,
        subtitle: item.subtitle,
        description: item.description
      };
      const books = this.localStorageService.getFromStorage();
      books.push(newBook);
      this.books = books;
      this.localStorageService.saveToStorage(books);
    },
    editBook(item) {
      // console.log('Editar livro:', item);
      let books = this.localStorageService.getFromStorage();
      const index = books.findIndex(book => book.id === item.id);
      if (index !== -1) {
        books[index] = item;
        this.books = books;
        this.localStorageService.saveToStorage(books);
      }
    },
    deleteBook(bookId) {
      let books = this.localStorageService.getFromStorage();
      books = books.filter(book => book.id !== bookId);
      this.books = books;
      this.localStorageService.saveToStorage(books);
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
