<template>
  <div class="row">
    <div class="col-4">
      <oglasiposlpocetnaplaceni :o="o" v-for="o in cards2" :key="o.id" />
    </div>
    <div class="col">
      <oglasiposlpocetnaobicni :e="e" v-for="e in cards2" :key="e.id" />
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
            <img class="modal-content" :src="url" />
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvori</button>
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
import oglasiposlpocetnaobicni from "@/components/oglasiposlpocetna.vue";
import oglasiposlpocetnaplaceni from "@/components/oglasiposlpocetnaplaceni.vue";
import { Posts } from "@/services";
import _ from "lodash";
import moment from "moment";

export default {
  data() {
    return store;
  },
  components: {
    oglasi,
    oglasii,
    oglasiposlpocetnaobicni,
    oglasiposlpocetnaplaceni
  },
  name: "oglasiposlpocetna",
  watch: {
    "this.searchTerm": _.debounce(function(val) {
      this.fetchPosts(val);
    }, 500)
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts(term) {
      term = term || this.searchTerm;

      this.cards2 = await Posts.getAll(term);
    }
  }
};
</script>
