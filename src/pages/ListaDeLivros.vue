<template>
  <q-page padding>
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
import SearchList from '.././components/SearchList.vue';

export default {
  components: {
    SearchList,
  },
  data() {
    return {
      books: [
        { 
          id: 1, 
          title: 'O Senhor dos Anéis',
          subtitle: 'J.R.R. Tolkien',
          description: 'A história narra o conflito contra o mal que se alastra pela Terra-média, através da luta de várias raças - Humanos, Anãos, Elfos, Ents e Hobbits - contra Orques, para evitar que o "Anel do Poder" volte às mãos de seu criador Sauron, o Senhor Sombrio.'
        },
        { 
          id: 2,
          title: '1984',
          subtitle: 'George Orwell',
          description: 'Exatamente como intitula o livro, a história passa-se em 1984. A narrativa revela um futuro distópico em que o Estado é extremamente autoritário e impõe um regime de vigilância sobre a sociedade. O romance acontece na cidade que um dia fora Londres, na fictícia Oceânia, território dominado pela repressão e pelo medo.'
        },
        { 
          id: 3,
          title: 'O Hobbit',
          subtitle: 'J.R.R. Tolkien',
          description: 'Bilbo Bolseiro é um hobbit que leva uma vida confortável e sem ambições. Mas seu contentamento é perturbado quando Gandalf, o mago, e uma companhia de anões batem à sua porta e levam-no para uma expedição. Eles têm um plano para roubar o tesouro guardado por Smaug, o Magnífico, um grande e perigoso dragão.'
        },
        { 
          id: 4,
          title: 'Dom Casmurro',
          subtitle: 'Machado de Assis',
          description: 'Dom Casmurro conta a história de Bento Santiago (Bentinho), apelidado de Dom Casmurro por ser calado e introvertido. Na adolescência, apaixona-se por Capítu, abandonando o seminário e, com ele, os desígnios traçados por sua mãe, Dona Glória, para que se tornasse padre.'
        },
        { 
          id: 5,
          title: 'Moby Dick',
          subtitle: 'Herman Melville',
          description: 'O livro traz o relato de um marinheiro letrado, Ishmael, sobre a última viagem de um navio baleeiro de Nantucket, o Pequod, que parte da costa leste dos Estados Unidos - com sua tripulação multiétnica - rumo ao Pacífico Sul, onde encontra o imenso cachalote branco que, no passado, arrancara a perna do vingativo capitão Ahab.'
        }
      ]
    };
  },
  methods: {
    viewDetails() {},
    editBook(item) {
      console.log(item);
      return item;    
    },
    deleteBook(id) {
      // Encontra o índice do item a ser excluído
      const index = this.books.findIndex(book => book.id === id);
      if (index !== -1) {
        // Remove o item da lista
        this.books.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped>
.q-page {
  max-width: 600px;
  margin: 0 auto;
}
</style>
