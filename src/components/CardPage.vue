<template>
  <div>
    <q-card class="my-card bg-blue-grey-10 text-blue-grey-1 q-mb-md">
    <q-card-section>
      <div class="text-h6">{{ titleCard }}</div>
    </q-card-section>
    <q-card-section>
      {{ infoCard }}
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn
        glossy
        color="indigo-6"
        align="around"
        class="text-bold"
        :label="labelAction"
        :icon="iconAction"
        @click="openDialog"
      />
    </q-card-actions>
  </q-card>

  <!-- Dialog de adição de um novo item -->
  <q-dialog
    v-model="addNewItem"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
    backdrop-filter="blur(20px) brightness(30%)"
  >
  <q-card class="bg-blue-grey-1 text-blue-grey-10" style="width: 500px">
      <q-form @submit.prevent="submitForm" class="q-pt-none">
      <q-bar>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Fechar</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="text-h6">Novo Cadastro</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
          <q-input
            filled
            v-model="title"
            label="Informe o título *"
            hint="Campo obrigatório"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor, digite uma informação válida.']"
            class="q-mb-md"
          />
          <q-input
            filled
            v-model="subtitle"
            label="Informe o subtítulo *"
            hint="Campo obrigatório"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor, digite uma informação válida.']"
            class="q-mb-md"
          />
          <q-input
            filled
            v-model="description"
            autogrow
            label="Informe a descrição"
            hint="Campo Opcional"
            class="q-mb-md"
          />

          <q-card-actions align="right" class="text-blue-grey-1">
            <q-btn color="blue-10" type="submit" icon="save" label="Salvar" />
          </q-card-actions>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'CardPage',
  props: {
    titleCard: {
      type: String,
      required: true
    },
    infoCard: {
      type: String,
      default: '' // Valor padrão para evitar undefined
    },
    labelAction: {
      type: String,
      default: 'Adicionar' // Valor padrão
    },
    iconAction: {
      type: String,
      default: 'add' // Valor padrão
    },
    onSubmit: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      addNewItem: false,
      title: '',
      subtitle: '',
      description: ''
    };
  },
  methods: {
    openDialog() {
      this.addNewItem = true;
    },
    submitForm() {
      // Prepara os dados para submissão
      const newItem = {
        id: Date.now(),
        title: this.title,
        subtitle: this.subtitle,
        description: this.description || 'Sem Descrição'
      };

      // Chama a função passada via prop onSubmit
      this.onSubmit(newItem);

      // Fecha o dialog de edição
      this.addNewItem = false;

      // Exibe uma notificação de confirmação
      this.$q.notify({
        color: 'teal-9',
        position: 'bottom-right',
        message: 'Item editado com sucesso!',
        icon: 'check_circle',
        timeout: 1000
      });
    },
  }
};
</script>
