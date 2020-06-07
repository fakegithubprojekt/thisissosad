<template>
  <div>
    <p v-if="nemaData()" class="alert alert-warning" role="alert">
      Trenutno nemate objavljeni niti jedan oglas.
      <br />Za objavu oglasa posjetite
      <a href="postavioglas" class="alert-link">Dodaj oglas</a> stranicu.
    </p>
    <oglasip :key="modal.id" :b="modal" v-for="modal in search" />
    <div
      class="modal fade"
      id="picusr22Modal"
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
    <!-- Modal -->
    <div
      class="modal fade"
      id="adeditmodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Uredjivanje oglasa {{store.id}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Satnica</span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Amount (to the nearest dollar)"
                    v-model="store.satnica"
                  />
                </div>
              </div>
              <div class="col">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Putni</span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Amount (to the nearest dollar)"
                    v-model="store.putni"
                  />
                </div>
              </div>
              <div class="w-100"></div>
              <div class="col">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Br. Tel:</span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Amount (to the nearest dollar)"
                    v-model="store.brtel"
                  />
                </div>
              </div>
              <div class="col">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Email:</span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Amount (to the nearest dollar)"
                    v-model="store.email"
                  />
                </div>
              </div>
            </div>Grad:
            <input type="text" class="form-control" v-model="store.grad" />
            <br />Opis oglasa:
            <textarea
              class="form-control"
              aria-label="With textarea"
              v-model="store.tekst"
            ></textarea>
            <br />
            <div class="row">
              <div class="col">
                <label for="Date">Početak rada</label>
                <input v-model="store.datum" type="date" class="form-control" />
              </div>
              <div class="col">
                <label for="Date">Kraj rada</label>
                <input v-model="store.datumk" type="date" class="form-control" required />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Odustani</button>
            <button
              @click="spremiOglas()"
              type="submit"
              class="btn btn-primary"
              name="send-mail"
            >Spremi</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store.js";
import oglasip from "@/components/oglasip.vue";
import moment from "moment";
import { Posts } from "@/services";
import _ from "lodash"; //
export default {
  data() {
    return { store, cardsds: [], satnica: "", id: "", datumk: "", datum: "" };
  },
  components: {
    oglasip
  },
  name: "oglasiposlodavac",
  computed: {
    search() {
      return this.store.cardsds.filter(card =>
        card.poslodavac.includes(this.store.searchTerm)
      );
    }
  },
  methods: {
    async fetchPosts(email) {
      email = this.store.koremail;

      this.store.cardsds = await Posts.mojioglasi(email);
    },

    async spremiOglas() {
      let id = this.store.id;
      if (!id) {
        alert("Fail");
        return;
      }
      var azuriraj = {
        tekst: this.store.tekst,
        satnica: this.store.satnica,
        putni: this.store.putni,
        datum: this.store.datum,
        email: this.store.email,
        datumk: this.store.datumk,
        brtel: this.store.brtel,
        grad: this.store.grad
      };
      await Posts.azuriraj(id, azuriraj).then(() => {
        for (let [i, k] of this.store.cardsds.entries()) {
          if (k.id == this.store.id) {
            k.tekst = azuriraj.tekst;
            k.satnica = azuriraj.satnica;
            k.putni = azuriraj.putni;
            k.email = azuriraj.email;
            k.datum = azuriraj.datum;
            k.datumk = azuriraj.datumk;
            k.brtel = azuriraj.brtel;
            k.grad = azuriraj.grad;
            break;
          }
        }
        $("#adeditmodal").modal("hide");
      });
    },
    nemaData() {
      return this.store.cardsds.length == 0;
    }
  },
  watch: {
    "store.searchTerm": _.debounce(function(val) {
      this.fetchPosts(val);
    }, 500)
  },

  created() {
    this.fetchPosts();
  }
};
</script>