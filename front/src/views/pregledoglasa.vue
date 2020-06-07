<template>
  <div class="row">
    <div @click="aaaa" class="col-4">
      <oglasi :a="a" v-for="a in cards" :key="a.id" />
    </div>
    <div class="col">
      <div @click="aaaa">
        <oglasii :a="a" v-for="a in cards" :key="a.id" />
        <div
          class="modal fade"
          id="picusrModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="picusrModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content" style="display:inline-block;">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <img class="modal-content" :src="store.url" />
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvori</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <notifications group="obavj" />
  </div>
</template>
<script>
import store from "@/store.js";
import oglasi from "@/components/oglasi.vue";
import oglasii from "@/components/oglasii.vue";
import { Posts } from "@/services";
import _ from "lodash";
import moment from "moment";
export default {
  data() {
    return { store, cards: [] };
  },
  components: {
    oglasi,
    oglasii
  },
  name: "pregledoglasa",
  watch: {
    "store.searchTerm": _.debounce(function(val) {
      this.fetchPosts(val);
    }, 500)
  },

  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts(term) {
      term = term || store.searchTerm;

      this.cards = await Posts.getAll1(term);
    },
    aaaa() {
      //$(".el").notify("I am a notification popup");
      this.$notify({
        group: "obavj",
        title: "Upozorenje!",
        text: "Trebate se prijaviti za pregledavanje oglasa!"
      });
    }
  }
};
</script>
