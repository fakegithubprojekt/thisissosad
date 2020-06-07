<template>
  <div>
    <div
      v-if="(a.tipoglasa=='Normalni' && a.aktivanoglas=='aktivan') || (a.tipoglasa=='Plaćeni' && a.status=='odbijeno' && a.aktivanoglas=='aktivan') || (a.tipoglasa=='Plaćeni' && a.status=='' && a.aktivanoglas=='aktivan') || (a.tipoglasa=='Plaćeni' && a.status==null && a.aktivanoglas=='aktivan')"
    >
      <div class="card bg-light text-center" style="margin-top:15px;">
        <div class="card-header">
          <p style="text-align:left;">
            {{a.poslodavac}}
            <span style="float:right;">{{a.posted_at | formatTime }}</span>
          </p>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{a.vrsta}}</h5>
          <p class="card-text jumbotron">
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
            <br />
            <i>{{a.tekst}}</i>
          </p>
          <img :src="a.url" width="100px" />
          <!-- maknut cemo @click="prikazSlikeUsr(a);" jer nije ulogiran pa da ne moze viditi -->
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
      return moment(value).format("Do MMMM YYYY");
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