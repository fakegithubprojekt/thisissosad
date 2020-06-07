<template>
  <div>
    <p>Email: {{d.email}}</p>
    <p>Telefonski broj:{{d.brtel}}</p>
    <p>Korisničko ime: {{d.korisnickoime}}</p>
    <p>Ime: {{d.ime}} {{d.prezime}}</p>
    <p>Tip korisnika: {{d.tipKorisnika}}</p>
    <p>Zanimanje: {{d.zanimanje}}</p>
    <p>Županija: {{d.zupanija}}</p>
    <button
      @click="editComment(d);"
      type="button"
      style="margin: 12px;"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#commentModal"
    >
      <i class="fas fa-comment-medical"></i> Postavke
      <div
        class="modal fade"
        id="picModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="picModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content" style="display:inline-block;">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvori</button>
            </div>
          </div>
        </div>
      </div>
    </button>
  </div>
</template>
<script>
import store from "@/store.js";
import moment from "moment";
export default {
  props: ["d"],
  data() {
    return {
      brtel: "",
      datumRegistracije: "",
      email: "",
      ime: "",
      korisnickoime: "",
      prezime: "",
      tipKorisnika: "",
      zanimanje: "",
      zupanija: ""
    };
  },
  methods: {
    editComment(d) {
      $("#commentModal").modal("show");
      (this.brtel = d.brtel),
        (this.datumRegistracije = d.datumRegistracije),
        (this.email = d.email),
        (this.ime = d.ime),
        (this.korisnickoime = d.korisnickoime),
        (this.prezime = d.prezime),
        (this.tipKorisnika = d.tipKorisnika),
        (this.zanimanje = d.zanimanje),
        (this.zupanija = d.zupanija);
    }
  }
};
</script>