<template>
  <div>
    <div v-if="a.tipoglasa=='Plaćeni' && a.status=='odobreno' && a.aktivanoglas=='aktivan'">
      <div>
        <div class="card text-white bg-info mb-3 text-left" style="margin-top:15px;">
          <div class="card-header text-center">{{a.poslodavac }}</div>
          <div class="card-body">
            <h5 class="card-title">{{a.vrsta}}</h5>
            <p class="card-text">
              Grad: {{a.grad}}
              <br />
              Pocetak rada: {{a.datum}}
              <br />
              Kraj rada: {{a.datumk}}
              <br />
              Satnica: {{a.satnica}}
              <br />
              Email: {{a.email}}
              <br />
            </p>
            <small>{{a.posted_at | formatTime}}</small>
            <br />
            <center>
              <img :src="a.url" width="100px" />
            </center>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store.js";
import moment from "moment";
export default {
  props: ["a"],
  data() {
    return store;
  },
  filters: {
    formatTime: function(value) {
      return moment(value).format("MMMM Do YYYY, h:mm:ss a");
    }
  },
  methods: {
    prikazSlikeUsr(a) {
      $("#picusrModal").modal("show");
      this.url = a.url;
    }
  }
};
</script>