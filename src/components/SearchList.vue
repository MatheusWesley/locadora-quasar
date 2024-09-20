<template>
  <!-- Barra de Pesquisa -->
  <q-input v-model="searchTerm" :label="label" debounce="300" class="q-mb-md" standout="bg-blue-grey-7 text-white">
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>

  <!-- Lista de Itens -->
  <q-list bordered separator>
    <!-- Itera sobre os itens filtrados -->
    <q-item v-for="item in filteredItems" :key="item.id" clickable>
      <q-item-section>
        <q-item-label>{{ item.title }}</q-item-label>
        <q-item-label caption>{{ item.subtitle }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-btn-group push>
          <!-- Botão de Detalhes -->
          <q-btn flat color="primary" @click="viewDetails(item)" icon="visibility" padding="xs" size="sm" />
          <!-- Botão de Edição -->
          <q-btn flat color="orange" @click="editItem(item)" icon="edit" padding="xs" size="sm" />
          <!-- Botão de Exclusão -->
          <q-btn flat color="red" @click="deleteItem(item.id)" icon="delete" padding="xs" size="sm" />
        </q-btn-group>
      </q-item-section>
    </q-item>
  </q-list>

  <!-- DIALOGS -->
  <!-- Dialog de detalhes. -->
  <q-dialog v-model="showDetailsDialog" backdrop-filter="blur(20px) brightness(30%)">
    <q-card class="my-card" style="width: 500px;">
      <q-img src=".././assets/img/book-view.jpg" style="height: 150px;" />

      <q-card-section>
        <q-btn fab color="blue-grey-8" icon="auto_stories" class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);" />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ selectedItem?.title }}
            <div class="text-caption text-grey">
              {{ selectedItem?.subtitle }}
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle2">
          {{ selectedItem?.description }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn v-close-popup color="blue-grey-10" label="Sair" icon="exit_to_app" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Dialog de edição -->
  <q-dialog v-model="showEditDialog" persistent transition-show="scale" transition-hide="scale"
    backdrop-filter="blur(20px) brightness(30%)">
    <q-card class="bg-blue-grey-1 text-blue-grey-10" style="width: 500px">
      <q-form @submit.prevent="onSubmit">
        <q-card-section>
          <div class="text-h6">Editar</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input filled v-model="title" :label="titleLabel" hint="Campo obrigatório" lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor digite uma informação valida.']" class="q-mb-md" />
          <q-input filled v-model="subtitle" :label="subtitleLabel" hint="Campo obrigatório" lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor digite uma informação valida.']" class="q-mb-md" />
          <q-input filled v-model="description" autogrow :label="descriptionLabel" hint="Campo Opcional"
            class="q-mb-md" />
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-2 text-blue-grey-1">
          <q-btn outline color="secondary" label="Cancelar" v-close-popup />
          <q-btn color="blue-10" type="submit" label="Salvar Alterações" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>

  <!-- Dialog de Exclusão -->
  <q-dialog v-model="showDeleteDialog" persistent backdrop-filter="blur(20px) brightness(30%)">
    <q-card class="bg-blue-grey-1 text-blue-grey-10" style="width: 500px">
      <q-card-section class="row items-center">
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            <div class="q-mb-md">
              Deletar
            </div>
            <div class="text-body1 text-grey-10">
              {{ selectedItem?.title }}
            </div>
            <div class="text-caption text-grey">
              {{ selectedItem?.subtitle }}
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn outline label="Cancelar" color="secondary" v-close-popup />
        <q-btn label="Deletar" icon="delete" color="negative" @click="confirmDelete(selectedItem.id)" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
export default {
  name: 'SearchList',
  props: {
    items: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      default: 'Pesquisar'
    },
    titleLabel: {
      type: String,
      default: 'Informe um titulo'
    },
    subtitleLabel: {
      type: String,
      default: 'Informe um subtitulo'
    },
    descriptionLabel: {
      type: String,
      default: 'Informe a descrição'
    }
  },
  emits: ['view-details', 'edit-item', 'delete-item'], // Declaração dos eventos
  data() {
    return {
      title: '',
      subtitle: '',
      description: '',
      searchTerm: '',
      selectedItem: null, // Armazena o item selecionado para exibição
      showDetailsDialog: false, // Variável que controle a abertura do modal de detalhes
      showEditDialog: false, // Variável que controle a abertura do modal de edição
      showDeleteDialog: false // Variável que controle a abertura do modal de exclusão
    };
  },
  computed: {
    filteredItems() {
      const term = this.searchTerm.toLowerCase();

      // Verifica se items é um array válido
      if (!Array.isArray(this.items)) {
        return [];
      }

      return this.items.filter(item => {
        const title = item.title ? item.title.toLowerCase() : '';
        const subtitle = item.subtitle ? item.subtitle.toLowerCase() : '';

        // Verifica se o termo aparece em title ou subtitle
        return title.includes(term) || subtitle.includes(term);
      });
    }

  },
  watch: {
    items: {
      handler() {
        // Reagir a alterações nos items
        console.log('A lista de items foi alterada.');
      },
      deep: true // Observar alterações profundas (dentro do array)
    },
    searchTerm() {
      // Reagir a alterações no termo de busca
      console.log('O termo de busca foi alterado.');
    }
  },
  methods: {
    // Exibe os detalhes em um dialog
    viewDetails(item) {
      this.$emit('view-details', item); // Emite o evento view-details
      this.selectedItem = item; // Armazena o item selecionado
      this.showDetailsDialog = true; // Mostra o dialog
    },
    editItem(item) {
      this.selectedItem = { ...item }; // Clona o item para edição
      this.title = this.selectedItem.title;
      this.subtitle = this.selectedItem.subtitle;
      this.description = this.selectedItem.description;
      this.showEditDialog = true; // Exibe o dialog de edição
    },
    deleteItem(id) {
      this.selectedItem = this.items.find(item => item.id === id); // Define o item a ser deletado
      this.showDeleteDialog = true; // Exibe o dialog de exclusão
    },
    confirmDelete(id) {
      const deletedItem = this.selectedItem;
      this.$emit('delete-item', id); // Emite evento de deleção
      this.showDeleteDialog = false; // Fecha o dialog de exclusão

      // Exibe notificação de exclusão
      this.$q.notify({
        color: 'red-5',
        position: 'bottom-right',
        message: `Item "${deletedItem.title}" foi deletado com sucesso!`,
        icon: 'delete_forever',
        timeout: 2000
      });
    },
    onSubmit() {
      // Atualiza o item original com os novos valores
      this.selectedItem.title = this.title;
      this.selectedItem.subtitle = this.subtitle;
      this.selectedItem.description = this.description === '' ? 'Sem Descrição' : this.description;

      // Emite o evento de edição concluída
      this.$emit('edit-item', this.selectedItem);

      // Exibe uma notificação de confirmação
      this.$q.notify({
        color: 'teal-9',
        position: 'bottom-right',
        message: 'Item editado com sucesso!',
        icon: 'check_circle',
        timeout: 1000 // Tempo em milissegundos antes de a notificação desaparecer
      });

      // Fecha o dialog de edição
      this.showEditDialog = false;
    }
  }
};
</script>

<style scoped>
.q-item-section {
  display: flex;
  align-items: center;
}
</style>
