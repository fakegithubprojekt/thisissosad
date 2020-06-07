<template>
  <div>
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="pills-home-tab"
          data-toggle="pill"
          href="#pills-home"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
        >Nerješene prijave</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="pills-profile-tab"
          data-toggle="pill"
          href="#pills-profile"
          role="tab"
          aria-controls="pills-profile"
          aria-selected="false"
        >Odobreno</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="pills-contact-tab"
          data-toggle="pill"
          href="#pills-contact"
          role="tab"
          aria-controls="pills-contact"
          aria-selected="false"
        >Odbijeno</a>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div
        class="tab-pane fade show active"
        id="pills-home"
        role="tabpanel"
        aria-labelledby="pills-home-tab"
      >
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Poslodavac</th>
              <th scope="col">Korisnik</th>
              <th scope="col">Grad</th>
              <th scope="col">Početak</th>
              <th scope="col">Kraj</th>
              <th scope="col">Satnica</th>
              <th scope="col">Tel</th>
              <th scope="col">Vrsta</th>
              <th scope="col">Datum prijave:</th>
              <th scope="col">Status:</th>
            </tr>
          </thead>
          <prijavenaoglas1 :key="podaci.id" :ree="podaci" v-for="podaci in search" />
          <div class="card text-center col-sm-6" style="margin-top:5px;" v-if="hasNoUserDetails">
            <div class="card-body">
              <p class="card-text">Nema podataka</p>
            </div>
          </div>
        </table>
      </div>
      <div
        class="tab-pane fade"
        id="pills-profile"
        role="tabpanel"
        aria-labelledby="pills-profile-tab"
      >
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Poslodavac</th>
              <th scope="col">Korisnik</th>
              <th scope="col">Grad</th>
              <th scope="col">Početak</th>
              <th scope="col">Kraj</th>
              <th scope="col">Satnica</th>
              <th scope="col">Tel</th>
              <th scope="col">Vrsta</th>
              <th scope="col">Datum prijave:</th>
              <th scope="col">Status:</th>
            </tr>
          </thead>
          <prijavenaoglasodobreno :key="podaci.id" :ree="podaci" v-for="podaci in search" />
        </table>
      </div>
      <div
        class="tab-pane fade"
        id="pills-contact"
        role="tabpanel"
        aria-labelledby="pills-contact-tab"
      >
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Poslodavac</th>
              <th scope="col">Korisnik</th>
              <th scope="col">Grad</th>
              <th scope="col">Početak</th>
              <th scope="col">Kraj</th>
              <th scope="col">Satnica</th>
              <th scope="col">Tel</th>
              <th scope="col">Vrsta</th>
              <th scope="col">Datum prijave:</th>
              <th scope="col">Status:</th>
            </tr>
          </thead>
          <prijavenaoglasodbijeno :key="podaci.id" :ree="podaci" v-for="podaci in search" />
        </table>
      </div>
    </div>

    <div
      class="modal fade"
      id="commentModal2"
      tabindex="-1"
      role="dialog"
      aria-labelledby="commentModalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content modcont1">
          <div class="modal-header">
            <h5 class="modal-title" id="commentModalLongTitle">Unesi napomenu</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <br />
            <h6>ID: {{id}}</h6>

            <p>
              <br />Korisnikova prijava:
              <textarea
                placeholder="Opis kvara"
                rows="4"
                cols="50"
                v-model="prijava"
                disabled
              ></textarea>
              <br />Razlog zašto ćete prihvatit/odbit zahtjev:
              <textarea
                placeholder="Komentar"
                rows="4"
                cols="50"
                v-model="razlog"
                name="opis"
              ></textarea>
            </p>
            <hr />
            <div class="form-check">
              <input
                class="form-check-input"
                v-model="ocekivanje"
                type="radio"
                name="stanje"
                id="stanje"
                value="odobreno"
              />
              <label class="form-check-label" for="stanjeradio">
                <span class="badge badge-success">Odobreno</span>
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                v-model="ocekivanje"
                type="radio"
                name="stanje"
                id="stanjeradio2"
                value="odbijeno"
              />
              <label class="form-check-label" for="stanjeradio2">
                <span class="badge badge-danger">Odbijeno</span>
              </label>
            </div>
            <hr />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvori</button>
            <button
              @click="saveComment()"
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
import prijavenaoglas1 from "@/components/prijavenaoglas1.vue";
import prijavenaoglasodobreno from "@/components/prijavenaoglasodobreno.vue";
import prijavenaoglasodbijeno from "@/components/prijavenaoglasodbijeno.vue";
import { Posts } from "@/services";
export default {
  data() {
    return store;
  },
  components: {
    prijavenaoglas1,
    prijavenaoglasodobreno,
    prijavenaoglasodbijeno
  },
  computed: {
    search() {
      return this.prijave1.filter(card =>
        card.poslodavac.includes(this.searchTerm)
      );
    },
    hasNoUserDetails() {
      return this.prijave1.length == 0;
    }
  },
  methods: {
    async saveComment() {
      var id = this.id;
      if (!id) {
        alert("Fail");
        return;
      }
      var azuriraj = {
        razlog: this.razlog,
        ocekivanje: this.ocekivanje
      };
      await Posts.prijavenaoglas1(id, azuriraj).then(() => {
        //this.refresh();
        for (let [i, k] of this.prijave1.entries()) {
          if (k.id == this.id) {
            k.razlog = azuriraj.razlog;
            k.ocekivanje = azuriraj.ocekivanje;
            break;
          }
        }
        $("#commentModal2").modal("hide");
      });
    },
    async fetchPosts(email) {
      email = this.koremail;
      this.prijave1 = await Posts.prijavenaoglas(email);
    }
  },
  created() {
    this.fetchPosts();
  }
};
</script>