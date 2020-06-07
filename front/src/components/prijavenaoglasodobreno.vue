<template>
  <tbody v-if="ree.ocekivanje=='odobreno'">
    <tr>
      <td style="width: 15%;">
        <b>{{ree.poslodavac}}</b>
        <br />
        oib: {{ree.oib}}
      </td>
      <td>
        {{ree.userEmail}}
        <br />
        {{ree.ime}}
        <br />
        {{ree.prezime}}
      </td>
      <td>{{ree.grad}}</td>
      <td style="width: 10%;">{{ree.datum | formatTime2 }}</td>
      <td style="width: 10%;">{{ree.datumk | formatTime2 }}</td>
      <td style="width: 15%;">
        Satnica:{{ree.satnica}}
        <br />
        Putni: {{ree.putni}}
      </td>
      <td>{{ree.brtel}}</td>
      <td>{{ree.vrsta}}</td>
      <td style="width: 12%;">{{ ree.posted_at | formatTime }}</td>
      <button
        @click="editComment(ree);"
        type="button"
        style="margin: 12px;"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#commentModal2"
      >
        <i class="fas fa-comment-medical"></i>
      </button>
      <td v-if="ree.ocekivanje=='odobreno'">
        <span class="badge badge-success">Odobreno</span>
      </td>
      <td v-else-if="ree.ocekivanje=='odbijeno'">
        <span class="badge badge-danger">Odbijeno</span>
      </td>
      <td v-else>
        <span class="badge badge-info">Nerješeno</span>
      </td>
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
export default {
  data() {
    return store;
  },
  filters: {
    formatTime: function(value) {
      return moment(value).format("Do MMMM YYYY, h:mm:ss a");
    },
    formatTime2: function(value) {
      return moment(value).format("Do MMMM YYYY");
    }
  },
  methods: {
    editComment(ree) {
      $("#commentModal").modal("show");
      this.id = ree.id;
      this.ocekivanje = ree.ocekivanje;
      this.razlog = ree.razlog;
      this.prijava = ree.prijava;
    }
  },
  props: ["ree"]
};
</script>