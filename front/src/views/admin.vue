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
        >Svi</a>
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
        >Plaćeni</a>
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
        >Normalni</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="pills-inactive-tab"
          data-toggle="pill"
          href="#pills-inactive"
          role="tab"
          aria-controls="pills-contact"
          aria-selected="false"
        >Neaktivni</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="pills-deac-tab"
          data-toggle="pill"
          href="#pills-deac"
          role="tab"
          aria-controls="pills-contact"
          aria-selected="false"
        >Deaktivirani</a>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div
        class="tab-pane fade show active"
        id="pills-home"
        role="tabpanel"
        aria-labelledby="pills-home-tab"
      >
        <div class="row justify-content-center" style="margin: 20px;">
          <table class="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">Poslodavac</th>
                <th scope="col">Oib</th>
                <th scope="col">Email</th>
                <th scope="col">Grad</th>
                <th scope="col">Datum poc</th>
                <th scope="col">Kraj</th>
                <th scope="col">Satnica</th>
                <th scope="col">Tel</th>
                <th scope="col">Vrsta</th>
                <th scope="col">Oglas</th>
                <th scope="col">Slika</th>
                <th scope="col">Datum:</th>
                <th scope="col">Status:</th>
                <th scope="col">Boost:</th>
              </tr>
            </thead>
            <admintablica
              :key="userDetails.id"
              :tablica="userDetails"
              v-for="userDetails in korisnickipodaci"
            />
          </table>
          <div class="card text-center col-sm-6" style="margin-top:5px;" v-if="hasNoUserDetails">
            <div class="card-header">Nema korisnika</div>
            <div class="card-body">
              <p class="card-text">Nema podataka</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="pills-profile"
        role="tabpanel"
        aria-labelledby="pills-profile-tab"
      >
        <div class="row justify-content-center" style="margin: 20px;">
          <table class="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">Poslodavac</th>
                <th scope="col">Oib</th>
                <th scope="col">Email</th>
                <th scope="col">Grad</th>
                <th scope="col">Datum poc</th>
                <th scope="col">Kraj</th>
                <th scope="col">Satnica</th>
                <th scope="col">Tel</th>
                <th scope="col">Vrsta</th>
                <th scope="col">Oglas</th>
                <th scope="col">Slika</th>
                <th scope="col">Datum:</th>
                <th scope="col">Status:</th>
                <th scope="col">Boost:</th>
              </tr>
            </thead>
            <admintablicaplaceni
              :key="userDetails.id"
              :tablica="userDetails"
              v-for="userDetails in korisnickipodaci"
            />
          </table>
          <div class="card text-center col-sm-6" style="margin-top:5px;" v-if="hasNoUserDetails">
            <div class="card-header">Nema korisnika</div>
            <div class="card-body">
              <p class="card-text">Nema podataka</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="pills-inactive"
        role="tabpanel"
        aria-labelledby="pills-inactive-tab"
      >
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Poslodavac</th>
              <th scope="col">Oib</th>
              <th scope="col">Email</th>
              <th scope="col">Grad</th>
              <th scope="col">Datum poc</th>
              <th scope="col">Kraj</th>
              <th scope="col">Satnica</th>
              <th scope="col">Tel</th>
              <th scope="col">Vrsta</th>
              <th scope="col">Oglas</th>
              <th scope="col">Slika</th>
              <th scope="col">Datum:</th>
              <th scope="col">Status:</th>
              <th scope="col">Boost:</th>
            </tr>
          </thead>
          <admintablicaneaktivan
            :key="userDetails.id"
            :tablica="userDetails"
            v-for="userDetails in korisnickipodaci"
          />
        </table>
        <div class="card text-center col-sm-6" style="margin-top:5px;" v-if="hasNoUserDetails">
          <div class="card-header">Nema korisnika</div>
          <div class="card-body">
            <p class="card-text">Nema podataka</p>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="pills-deac" role="tabpanel" aria-labelledby="pills-deac-tab">
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Poslodavac</th>
              <th scope="col">Oib</th>
              <th scope="col">Email</th>
              <th scope="col">Grad</th>
              <th scope="col">Datum poc</th>
              <th scope="col">Kraj</th>
              <th scope="col">Satnica</th>
              <th scope="col">Tel</th>
              <th scope="col">Vrsta</th>
              <th scope="col">Oglas</th>
              <th scope="col">Slika</th>
              <th scope="col">Datum:</th>
              <th scope="col">Status:</th>
              <th scope="col">Boost:</th>
            </tr>
          </thead>
          <admintablicaaneaktivan
            :key="userDetails.id"
            :tablica="userDetails"
            v-for="userDetails in korisnickipodaci"
          />
        </table>
        <div class="card text-center col-sm-6" style="margin-top:5px;" v-if="hasNoUserDetails">
          <div class="card-header">Nema korisnika</div>
          <div class="card-body">
            <p class="card-text">Nema podataka</p>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="pills-contact"
        role="tabpanel"
        aria-labelledby="pills-contact-tab"
      >
        <div class="row justify-content-center" style="margin: 20px;">
          <table class="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">Poslodavac</th>
                <th scope="col">Oib</th>
                <th scope="col">Email</th>
                <th scope="col">Grad</th>
                <th scope="col">Datum poc</th>
                <th scope="col">Kraj</th>
                <th scope="col">Satnica</th>
                <th scope="col">Tel</th>
                <th scope="col">Vrsta</th>
                <th scope="col">Oglas</th>
                <th scope="col">Slika</th>
                <th scope="col">Datum:</th>
                <th scope="col">Status:</th>
                <th scope="col">Boost:</th>
              </tr>
            </thead>
            <admintablicanormalni
              :key="userDetails.id"
              :tablica="userDetails"
              v-for="userDetails in korisnickipodaci"
            />
          </table>
          <div class="card text-center col-sm-6" style="margin-top:5px;" v-if="hasNoUserDetails">
            <div class="card-header">Nema korisnika</div>
            <div class="card-body">
              <p class="card-text">Nema podataka</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="tipoglasa=='Plaćeni'"
      class="modal fade"
      id="commentModal"
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
            <h2>
              <br />
              <h6>ID: ({{aktivnikorisnik}})</h6>
            </h2>
            <br />Napomena od oglašivača:
            <textarea
              placeholder="Opis kvara"
              rows="4"
              cols="50"
              v-model="tekst"
              disabled
            ></textarea>
            <br />Napomena (zašto prihvatit/odbit plaćeni oglas):
            <textarea
              placeholder="Komentar"
              rows="4"
              cols="50"
              name="opis"
              v-model="napomena1"
            ></textarea>
            <hr />
            <div class="row">
              <div class="col-sm">
                <h4>Plaćeni oglas</h4>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    v-model="status"
                    type="radio"
                    name="stanje11"
                    id="stanje1133"
                    value="odobreno"
                  />
                  <label class="form-check-label" for="stanje1133">
                    <span class="badge badge-success">Odobreno</span>
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    v-model="status"
                    type="radio"
                    name="stanje11"
                    id="stanje113"
                    value="odbijeno"
                  />
                  <label class="form-check-label" for="stanje113">
                    <span class="badge badge-danger">Odbijeno</span>
                  </label>
                </div>
              </div>
              <div class="col-sm">
                <h4>Status oglasa:</h4>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    v-model="aktivanoglas"
                    type="radio"
                    name="aktivanoglas"
                    id="aktivanoglas3232"
                    value="aktivan"
                  />
                  <label class="form-check-label" for="aktivanoglas3232">
                    <span class="badge badge-success">Aktivan</span>
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    v-model="aktivanoglas"
                    type="radio"
                    name="aktivanoglas343"
                    id="aktivanoglas343"
                    value="aneaktivan"
                  />
                  <label class="form-check-label" for="aktivanoglas343">
                    <span class="badge badge-danger">Trajno deaktiviraj</span>
                  </label>
                </div>
              </div>
            </div>
            <hr />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="zatvori()"
            >Zatvori</button>
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
    <div
      v-if="tipoglasa=='Normalni'"
      class="modal fade"
      id="commentModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="commentModalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content modcont1">
          <div class="modal-header">
            <h5 class="modal-title" id="commentModalLongTitle">{{aktivnikorisnik}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <br />
            <div class="form-check">
              <input
                class="form-check-input"
                v-model="aktivanoglas"
                type="radio"
                name="aktivanoglas"
                id="aktivanoglas"
                value="aktivan"
              />
              <label class="form-check-label" for="aktivanoglas">
                <span class="badge badge-success">Aktivan</span>
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                v-model="aktivanoglas"
                type="radio"
                name="aktivanoglas"
                id="aktivanoglas2"
                value="aneaktivan"
              />
              <label class="form-check-label" for="aktivanoglas2">
                <span class="badge badge-danger">Trajno deaktiviraj</span>
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button
              @click="saveComment()"
              type="submit"
              class="btn btn-primary"
              name="send-mail"
            >Spremi</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvori</button>
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
import admintablica from "@/components/admintablica.vue";
import admintablicaplaceni from "@/components/admintablicaplaceni.vue";
import admintablicaneaktivan from "@/components/admintablicaneaktivan.vue";
import admintablicaaneaktivan from "@/components/admintablicaaneaktivan.vue";
import admintablicanormalni from "@/components/admintablicanormalni.vue";
import { Posts } from "@/services";
export default {
  data() {
    return store;
  },
  components: {
    admintablica,
    admintablicaplaceni,
    admintablicaneaktivan,
    admintablicaaneaktivan,
    admintablicanormalni
  },
  created() {
    this.fetchPosts();
  },
  computed: {
    hasNoUserDetails() {
      return this.korisnickipodaci.length == 0;
    }
  },
  watch: {
    searchTerm: _.debounce(function(val) {
      this.fetchPosts(val);
    }, 500)
  },
  methods: {
    async fetchPosts(term) {
      term = term || store.searchTerm;
      this.korisnickipodaci = await Posts.getAll(term);
    },
    async saveComment() {
      let id = this.aktivnikorisnik;
      if (!id) {
        alert("Fail");
        return;
      }
      var azuriraj = {
        status: this.status,
        aktivanoglas: this.aktivanoglas,
        napomena: this.napomena1
      };
      await Posts.azuriraj(id, azuriraj).then(() => {
        for (let [i, k] of this.korisnickipodaci.entries()) {
          if (k.id == this.aktivnikorisnik) {
            k.status = azuriraj.status;
            k.aktivanoglas = azuriraj.aktivanoglas;
            k.napomena = azuriraj.napomena;
            break;
          }
        }
        $("#commentModal").modal("hide");
      });
    },
    zatvori() {
      this.tipoglasa = "";
    }
  }
};
</script>