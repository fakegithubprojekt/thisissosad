<template>
  <div class="container">
    <div class="card mb-3" style="max-width: 840px;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img :src="b.url" @click="prikazSlikeOglPosl(b);" style="max-width: 240px; margin: 20px;" />
          <img
            v-if="b.url == null"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png"
            class="card-img"
            alt
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              {{b.poslodavac}} - {{b.vrsta}}
              <span style="color: #538b01">[ {{b.tipoglasa}} ]</span>
              <br />
              <small class="text-muted">{{b.posted_at | formatTime}}</small>
            </h5>
            <p class="card-text" style="font-family:'comic sans ms'">
              ID: {{b.id}}
              <br />
              Email: {{b.email}}
              <br />
              Grad: {{b.grad}}
              <br />
              Vrijeme rada od: {{b.datum | formatTime2}} do: {{b.datumk | formatTime2}}
              <br />
              Satnica: [ {{b.satnica}} ] | Putni trošak: [ {{b.putni}} ]
              <br />
              Telefon: [ {{b.brtel}} ] | Oib: [ {{b.oib}} ]
              <br />
              Razlog (plaćeni): {{b.comment}} {{b.status}}
              <br />
            </p>Opis oglasa:
            <br />
            <textarea disabled wrap="off" class="form-control" rows="3" cols="50" v-model="b.tekst"></textarea>
            <hr />
            <div>
              <button
                @click="editad(b);"
                v-if="!(b.aktivanoglas=='aneaktivan')"
                type="button"
                style="margin-right: 10px;"
                class="btn btn-warning btn-sm"
                data-toggle="modal"
                data-target="#adeditmodal"
              >
                <i class="fa fa-list-alt" aria-hidden="true"></i> Uredi
              </button>
              <button
                v-if="b.aktivanoglas=='aneaktivan'"
                type="button"
                style="margin-right: 10px;"
                class="btn btn-warning btn-sm"
                data-toggle="modal"
                data-target="#adeditmodal"
                disabled
              >
                <i class="fa fa-list-alt" aria-hidden="true"></i> Uredi
              </button>
              <button
                v-if="b.aktivanoglas=='aktivan'"
                @click="deaktivirajOglas(b)"
                style="margin-right: 10px;"
                value="neaktivan"
                type="button"
                class="btn btn-danger btn-sm"
              >
                <i class="fa fa-times" aria-hidden="true"></i> Deaktiviraj
              </button>
              <button
                v-if="b.aktivanoglas=='aneaktivan'"
                style="margin-right: 10px;"
                value="neaktivan"
                type="button"
                class="btn btn-success btn-sm"
                disabled
              >
                <i class="fa fa-window-close" aria-hidden="true"></i> Aktiviraj
              </button>
              <button
                v-if="b.aktivanoglas=='neaktivan'"
                @click="aktivirajOglas(b)"
                style="margin-right: 10px;"
                value="aktivan"
                type="button"
                class="btn btn-success btn-sm"
              >
                <i class="fa fa-check" aria-hidden="true"></i> Aktiviraj
              </button>
              <button
                v-if="!(b.aktivanoglas=='aneaktivan')"
                type="button"
                class="btn btn-primary btn-sm"
                data-toggle="modal"
                data-target="#boostmodal"
              >
                <i class="fa fa-bolt" aria-hidden="true"></i> Bostaj
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="boostmodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Bostanje oglasa (30dana)</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h4>
              {{b.vrsta}}
              <br />
              {{b.poslodavac}}
            </h4>Za bostanje oglasa uplatite 50kn u BTC protuvrijednosti.
            Kao napomenu uplate navedite identifikacijski kod:
            <br />

            <h3 style="background: yellow;">{{b.id}}</h3>
            <hr />
            <img
              src="data:image/gif;base64,R0lGODdhpACkAIAAAAAAAP///ywAAAAApACkAAAC/4yPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEovGITCqXTAjgCY1Kp1QE9SplYKuL7VPrDUdJ4jLAah53zeBtO40lw92H+Xddfl/1drWov1dnx0enEEYIKHdn4ZfQiLbYEGiQ5gSF8fiRKbEZ0NkJmSWY9wBaejli6vCJatgqyUXJdhpJoZpx+6aLd0YrKku6+mo7rPl6ONorPBWKGetZ7BqJDKwc0kgNXcuLHR0xqW29Ww2ee9FdGG7JnOzMXr1unW3OeOzV7IsuPlHujU/+jF4Fff2m+WuXjOAsgAYbxkH4x146ffFCKQwWjmLCgP8HNVz8pQ4iLIcf53EkeXKfh5IS5XUMydDlHIstab6Dea1lQZkgK+W7x+tfxpSKeO60aRToMjHjcJrctlIn0Y0o0yECJ5Slw6JINcbs+uxqWJFaeXI9JxWqo5RecVZEq5aDwKxjpfWcCo/fy6Yg5pKtu/bmUZFv68Xd4Dfv159VzRL25U5lB0B4ndb8uxVzUspFKWdWbPlzaMegPYPsa/pyadWj6YpOvRduatekW2umDXbmkKebHy7F2sSj0tHZxB4OTmxiWt8jmSPHNbzsreK7X5bNLRn74Jg+7Z5dij08Y6aa+/A1dpw4W8DaK5s+HzX9daqnuS1Ur9t7quXbhwr/9paYf9k9tpgJ0rHGG3zfsEeggCgc+Fp0AMZm13QT3vSdgP0lGJRsFqoFnAo7faRgW8YlQh8MIy5XImsnmpfiCys21qJoLw4Sowsz9lZjbTfm56CMLN6Wo4YS/geiiw0+OORqNNLHm4lE6qdjk7YVaKRySEomJWgskDhlkNwdeVeSNi6535lYwmamc0XSRl1EaoqZJRwnItJUdyV0SSebXA6HVJ73ZcjKlu/Zh+Gb5QGKno9hzkdlYH+2WSh5cjrqZG1xutVgpZ4yGh+mV+JXn5edXlhqnQEWxmmmcAJWaY+fWrXCrJNaKmmgaJqa6aqN4omom70qGemr6TFJKaqb/4LJa64dYqmistLSOuycQhk7oIEMFrtrc3peCyWxKYTYnILxfHuqltnuua2z3HKC47t1gitiu/S2uiCQ93JYpaFktketqlbeWet66gIsrMBP/mZvoxBq6tmPPI7nq2Fl4vowuXqSK96luja746HysopbmhODbPBszw6E6r1yWWkrwug2S3KYqC2Mb8gRr5zcrS7/umjA+7as17HprnszxBj1aC7PkDmtbYRLQ50zhfgyXbDUuGI9MtVcs2s0ysn6Kx+CKQPrcdE+B8tsuUGfLGnFbsPbJsHQrty2xg1b3LOsZz9dLdwfg43xtEgrKvbFAnHs8L/B9hzr44h7a3Vk/P/GbbXeYws+HrKFbw450RUO3LnJjDMcdr524j1o1gmfWznFoJJ6OuG1oz1ZvO4qfPilt0se6sy07z0uf7PDPieku/8edW+bIi+q8tjSkHHsa4o+L+uJ9uv88aUn3vHyxHtesqvhCn3+2uB1S6jZWgsf/s/mc1/+qDCinuqHopL/qPur4x+59dEMMe7R3eCGtiWZGS91oXtf6+6WuLbcL3u+85/wNHcrCerueQRMYPowGEDMORAjHNQBn5ZlHXEpkIEzOOHs9Cc/3sntS+JCYdms9cHxtbCGL0whDseEPuHAJnwbM9zl2taZnQGxex4cHQktaD2WDTF9CEPg/+ynQ4v/iYyCvLNiEUfYO+iwEHzay2BlYsi8nIyxanU7Wn/QmMXcrTGE9SMi9nBHwzne0WZUPBr0otUYDZItVXajHJBmCDgu5s17TiRkDg92AuUtMogidOQSL9c+SF6PkvFj230QKUBF7nF+bFSfDEmXtiVaUVDJw94E0xgZO7YxUi6c5Slxlknm0LF/tsRWlKLYtz4OMJSszN8GgQk0VbLPa2+TGJ/yyMT9JbKYtsKkkAKpwmmWsZqOk0GAuDm1S36ymy34phEfeEtdkhOasfRkONOpsx8Srp2NvCCbZBnGpG3xi9GUGBybqEaViROM4LzYH5epRSV28W0FfWaRQFnJV44TMpubeyPwrvacjGp0oxztqEc/CtKQinSkJC2pSU+K0pSqdKUsbalLXwrTmMp0pjTNQAEAADs="
            />
            <br />BTC adresa: 1CQg2qDt28NYczUjRcddnf7hGw9yWqxCQg
            <hr />
            <p>
              Nakon izvršene uplate kliknite na
              <b>Boost</b>.
              <br />
U roku 24 sata vaš zahtjev će biti obrađen, te ukoliko uplata bude vidljiva oglas će biti aktivan.
            </p>
            <br />Ukoliko Vam je potrebna pomoć kontaktirajte nas na
            <a href="http://www.github.com/snortjs">placenioglasi@zaradaplus.website</a>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Odustani</button>
            <button @click="boostanje(b)" type="button" class="btn btn-success">Boost</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 <script>
import store from "@/store.js";
import { Posts } from "@/services";
import moment from "moment";
export default {
  data() {
    return {
      url: "",
      store
    };
  },
  props: ["b"],
  methods: {
    prikazSlikeOglPosl(b) {
      this.store.url = b.url;
      $("#picusr22Modal").modal("show");
    },
    editad(b) {
      $("#adeditmodal").modal("show");
      this.store.id = b.id;
      this.store.email = b.email;
      this.store.datum = b.datum;
      this.store.datumk = b.datumk;
      this.store.brtel = b.brtel;
      this.store.satnica = b.satnica;
      this.store.putni = b.putni;
      this.store.tekst = b.tekst;
      this.store.grad = b.grad;
    },
    async deaktivirajOglas(b) {
      let id = this.b.id;
      if (!id) {
        alert("Fail");
        return;
      }
      var azuriraj = {
        aktivanoglas: "neaktivan"
      };
      await Posts.azuriraj(id, azuriraj).then(() => {
        //this.refresh();
        for (let [i, k] of this.store.cardsds.entries()) {
          if (k.id == this.b.id) {
            k.aktivanoglas = azuriraj.aktivanoglas;
            break;
          }
        }
      });
    },
    async aktivirajOglas(b) {
      let id = this.b.id;
      if (!id) {
        alert("Fail");
        return;
      }
      var azuriraj = {
        aktivanoglas: "aktivan"
      };
      await Posts.azuriraj(id, azuriraj).then(() => {
        //this.refresh();
        for (let [i, k] of this.store.cardsds.entries()) {
          if (k.id == this.b.id) {
            k.aktivanoglas = azuriraj.aktivanoglas;
            break;
          }
        }
      });
    },
    async boostanje(b) {
      let id = this.b.id;
      if (!id) {
        alert("Fail");
        return;
      }
      var azuriraj = {
        tipoglasa: "Plaćeni"
      };
      await Posts.azuriraj(id, azuriraj).then(() => {
        for (let [i, k] of this.store.cardsds.entries()) {
          if (k.id == this.b.id) {
            k.tipoglasa = azuriraj.tipoglasa;
            break;
          }
        }
      });
      $("#boostmodal").modal("hide");
    }
  },
  filters: {
    formatTime: function(value) {
      return moment(value).format("Do MMMM YYYY, h:mm:ss a");
    },
    formatTime2: function(value) {
      return moment(value).format("Do MMMM YYYY");
    }
  }
};
</script>