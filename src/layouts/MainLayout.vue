<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-blue-grey-10 header">
        <q-toolbar>
          <q-toolbar-title class="text-h4">{{ header }}</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
        class="bg-blue-grey-7 text-blue-grey-1"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; ">
          <q-list padding>
            <q-item clickable v-ripple active-class="bg-grey-2 text-grey-8" v-for="item of menu" :key="item.id" :to="item.to">
              <q-item-section avatar>
                <q-icon :name=item.icon />
              </q-item-section>

              <q-item-section>
                {{ item.title }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top " src="../assets/img/cover2.jpeg" fit="cover" style="height: 140px">
          <div class="absolute-full">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://github.com/matheuswesley.png">
            </q-avatar>
            <div class="text-weight-bold">Matheus Wesley</div>
            <div>@math.w</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- <q-footer elevated class="bg-blue-grey-10 flex text-center">
      <q-toolbar>
        <q-toolbar-title>© 2024 Math</q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      drawer: ref(false)
    }
  },
  data () {
    return {
      header: "Minha Locadora",
      menu: [
        { id: 1, title: "Dashboard", to: "/", icon: "dashboard" },
        { id: 2, title: "Livros", to: "/livros", icon: "books" },
        { id: 3, title: "Usuários", to: "/usuarios", icon: "person" },
        { id: 4, title: "Clientes", to: "/clientes", icon: "people" },
        { id: 5, title: "Alugueis", to: "/alugueis", icon: "style" },
      ]
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

body {
  font-family: 'Inter', sans-serif;
}


.header {
  display: flex;
  height: 8vh;
}

</style>
