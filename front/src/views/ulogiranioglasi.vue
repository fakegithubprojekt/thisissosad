<template>
  <div>
    <div class="row">
      <div class="col-4">
        <placenioglasi :z="z" v-for="z in cards1" :key="z.id" />
      </div>
      <div class="col">
        <oglasi420 :g="g" v-for="g in cards1" :key="g.id" />

        <!-- Modal reportad -->
        <div
          class="modal fade"
          id="reportadmodal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="reportadmodal">Prijava oglasa</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <h3>Razlog prijave oglasa</h3>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvori</button>
                <button type="button" class="btn btn-primary">Pošalji</button>
              </div>
            </div>
          </div>
        </div>

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
    </div>
    <br />

    <notifications group="prijav" />
  </div>
</template>
<script>
import store from "@/store.js";
import placenioglasi from "@/components/placenioglasi.vue";
import oglasi420 from "@/components/oglasi420.vue";
import { Posts } from "@/services";
import _ from "lodash";
import moment from "moment";
export default {
  data() {
    return store;
  },
  components: {
    placenioglasi,
    oglasi420
  },
  watch: {
    searchTerm: _.debounce(function(val) {
      this.fetchPosts(val);
    }, 500)
  },
  filters: {
    formatTime: function(value) {
      return moment(value).format("MMMM Do YYYY, h:mm:ss a");
    }
  },

  created() {
    this.fetchPosts();
  },
  name: "ulogiranioglasi",
  methods: {
    zatvori() {
      this.prijava = "";
    },
    async fetchPosts(term) {
      term = term || this.searchTerm;

      this.cards1 = await Posts.getAll(term);
    }
  }
};
</script>
