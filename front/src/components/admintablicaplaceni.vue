<template>
  <tbody v-if="tablica.tipoglasa=='Plaćeni'">
    <tr>
      <th scope="row">{{tablica.poslodavac}}</th>
      <td>{{tablica.oib}}</td>
      <td>{{tablica.email}}</td>
      <td>{{tablica.grad}}</td>
      <td>{{tablica.datum}}</td>
      <td>{{tablica.datumk}}</td>
      <td>{{tablica.satnica}}</td>
      <td>{{tablica.brtel}}</td>
      <td>{{tablica.vrsta}}</td>
      <td>
        {{tablica.tipoglasa}}
        <p v-if="tablica.aktivanoglas=='neaktivan'">
          <span class="badge badge-warning">Neaktivan</span>
        </p>
        <p v-else-if="tablica.aktivanoglas=='aktivan'">
          <span class="badge badge-success">Aktivan</span>
        </p>
        <p v-else-if="tablica.aktivanoglas=='aneaktivan'">
          <span class="badge badge-danger">Deaktiviran</span>
        </p>
      </td>
      <td>
        <button
          v-if="tablica.url>='1'"
          @click="prikazSlike(tablica);"
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#picModal"
        >
          <!--*****-->
          <i class="far fa-image"></i> Prikaz
        </button>
        <p v-else-if="tablica.url!=='1'">
          <i class="fas fa-ban"></i>
        </p>
      </td>
      <td>{{ tablica.posted_at | formatTime }}</td>
      <button
        @click="editComment(tablica);"
        type="button"
        style="margin: 12px;"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#commentModal"
      >
        <i class="fas fa-comment-medical"></i>
      </button>
      <td v-if="tablica.status=='odobreno'">
        <span class="badge badge-success">Odobreno</span>
      </td>
      <td v-else-if="tablica.status=='odbijeno'">
        <span class="badge badge-danger">Odbijeno</span>
      </td>
      <td v-else-if="tablica.status==''">
        <span class="badge badge-info">Na čekanju</span>
      </td>
      <td v-else></td>
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
            <img class="modal-content" :src="url" />
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvori</button>
            </div>
          </div>
        </div>
      </div>
    </tr>
  </tbody>
</template>
  <script>
import store from "@/store.js";
import moment from "moment";
import { Posts } from "@/services";
export default {
  data() {
    return store;
  },
  filters: {
    formatTime: function(value) {
      return moment(value).format("MMMM Do YYYY, h:mm:ss a");
    }
  },
  props: ["tablica"],
  methods: {
    editComment(tablica) {
      $("#commentModal").modal("show");
      this.napomena1 = tablica.napomena || "";
      this.aktivnikorisnik = tablica.id;
      this.status = tablica.status || "";
      this.aktivanoglas = tablica.aktivanoglas || "";
      this.tipoglasa = tablica.tipoglasa;
      this.tekst = tablica.tekst;
    },
    prikazSlike(tablica) {
      this.url = tablica.url;
    }
  }
};
</script>