<template>
  <div class="container-fluid">
    <div v-if="nemaData()">
      <div class="alert alert-warning" role="alert">
        <h4 class="alert-heading">Moje prijave na oglas</h4>
        <p>Trenutno nemate niti jednu prijavu na oglas</p>
      </div>
    </div>
    <div v-else class="justify-content-center" style>
      <table class="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Poslodavac</th>
            <th scope="col">Mjesto i Vrijeme</th>
            <th scope="col">Satnica</th>
            <th scope="col">Tel</th>
            <th scope="col">Vrsta</th>
            <th scope="col">Moja prijava</th>
            <th scope="col">Odgovor oglašivača</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <prijave1 :key="podaci.id" :haha="podaci" v-for="podaci in search" />
      </table>
    </div>
  </div>
</template>
<style lang="scss">
@media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  tr {
    border: 1px solid #ccc;
  }
  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }
  td:before {
    position: absolute;
    top: -40px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
  }
}
</style>
<script>
import store from "@/store.js";
import prijave1 from "@/components/prijave1.vue";
import { Posts } from "@/services";
import _ from "lodash";
export default {
  data() {
    return store;
  },
  components: {
    prijave1
  },

  created() {
    this.fetchPosts();
  },
  computed: {
    search() {
      return this.prijave.filter(card =>
        card.poslodavac.includes(this.searchTerm)
      );
    }
  },
  methods: {
    async fetchPosts(email) {
      email = this.koremail;

      this.prijave = await Posts.mojeprijave(email);
    },
    nemaData() {
      return this.prijave.length == 0;
    }
  }
  //uwu
};
</script>