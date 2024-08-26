<template>
  <q-dialog v-model="localShowDialog">
    <q-card>
      <q-card-section>
        <div v-if="actionType === 'edit'" class="text-h6">Editar Item</div>
        <div v-else-if="actionType === 'view'" class="text-h6">Visualizar Detalhes</div>
        <div v-else-if="actionType === 'delete'" class="text-h6">Confirmar Exclusão</div>
      </q-card-section>

      <q-card-section>
        <!-- Conteúdo do Diálogo de Edição -->
        <div v-if="actionType === 'edit'">
          <q-input v-model="localItem.title" label="Título" filled />
          <q-input v-model="localItem.details" label="Detalhes" filled class="q-mt-md" />
        </div>

        <!-- Conteúdo do Diálogo de Visualização -->
        <div v-else-if="actionType === 'view'">
          <div><strong>Título:</strong> {{ localItem.title }}</div>
          <div class="q-mt-md"><strong>Detalhes:</strong> {{ localItem.details }}</div>
        </div>

        <!-- Conteúdo do Diálogo de Exclusão -->
        <div v-else-if="actionType === 'delete'">
          <div>Tem certeza que deseja excluir o item "{{ localItem.title }}"?</div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="negative" @click="cancel" />
        <q-btn v-if="actionType !== 'view'" flat label="Confirmar" color="positive" @click="confirm" />
      </q-card-actions>
    </q-card>

    <!-- Diálogo de Sucesso (Inception) -->
    <q-dialog v-model="successDialog">
      <q-card>
        <q-card-section class="text-center">
          <q-icon name="check_circle" size="48px" color="green" />
          <div class="text-h6 q-mt-md">Ação realizada com sucesso!</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="closeSuccessDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-dialog>
</template>

<script>
export default {
  // Aqui está informando que esse componente precisa de 3 propriedades
  // deve ter o item, o tipo de ação (Edita, Deletar...) e a exibição do dialog
  props: {
    item: {
      type: Object,
      required: true
    },
    actionType: {
      type: String,
      required: true
    },
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localItem: { ...this.item }, // Cópia local do item
      localShowDialog: this.showDialog, // Cópia local do estado de exibição do diálogo
      successDialog: false // Controle do diálogo de sucesso
    };
  },
  methods: {
    cancel() {
      this.$emit('close'); // Emitir o evento para fechar o diálogo
    },
    confirm() {
      if (this.actionType === 'edit') {
        // Emitir o item atualizado
        this.$emit('edit', this.localItem);
        this.successDialog = true;
      } else if (this.actionType === 'delete') {
        // Emitir o item para exclusão
        this.$emit('delete', this.localItem);
      }
      this.$emit('close');
    },
    closeSuccessDialog() {
      this.successDialog = false;
    }
  },
  watch: {
    // Monitorar mudanças na prop 'item' e atualizar a cópia local
    item: {
      handler(newValue) {
        this.localItem = { ...newValue };
      },
      deep: true
    },
    // Monitorar mudanças na prop 'showDialog' e atualizar a cópia local
    showDialog: {
      handler(newValue) {
        this.localShowDialog = newValue;
      }
    },
    // Quando o localShowDialog for fechado, emitir o evento para o pai
    localShowDialog(newValue) {
      if (!newValue) {
        this.$emit('close');
      }
    }
  }
};
</script>

<style scoped>
.q-card {
  max-width: 400px;
  margin: 0 auto;
}
</style>
