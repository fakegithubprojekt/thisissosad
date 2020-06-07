<template>
  <tbody>
    <tr>
      <td style="width: 15%;">
        {{haha.poslodavac}}
        <br />
        {{haha.email}}
        <br />
        {{haha.oib}}
      </td>
      <td style="width: 15%;">
        {{haha.grad}}
        <br />
        od: {{haha.datum | formatTime2 }}
        <br />
        do: {{haha.datumk | formatTime2 }}
      </td>
      <td style="width: 12%;">
        Satnica: {{haha.satnica}}
        <br />
        Putni: {{haha.putni}}
      </td>
      <td>{{haha.brtel}}</td>
      <td style="width: 15%;">{{haha.vrsta}}</td>
      <td style="width: 20%;">{{haha.prijava}}</td>
      <td style="width: 20%;">{{haha.razlog}}</td>
      <td v-if="haha.ocekivanje=='odobreno'">
        <span class="badge badge-success">Odobreno</span>
        {{ haha.posted_at | formatTime }}
      </td>
      <td v-else-if="haha.ocekivanje=='odbijeno'">
        <span class="badge badge-danger">Odbijeno</span>
        {{ haha.posted_at | formatTime }}
      </td>
      <td v-else style="width: 30%;">
        <span class="badge badge-info">Nerješeno</span>
        {{ haha.posted_at | formatTime }}
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
    return store; // Biće bolje : )
  },
  filters: {
    formatTime: function(value) {
      return moment(value).format("MMMM Do YYYY, h:mm:ss a");
    },
    formatTime2: function(value) {
      return moment(value).format("MMMM Do");
    }
  },
  props: ["haha"]
};
</script>