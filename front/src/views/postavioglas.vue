<template>
  <div class="container obr11">
    <form @submit.prevent="obrazac">
      <h2>Postavljanje oglasa</h2>
      <br />
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a
            class="nav-item nav-link"
            id="nav-home-tab"
            data-toggle="tab"
            href="#nav-home"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >Osobni podaci</a>
          <a
            class="nav-item nav-link"
            id="nav-profile-tab"
            data-toggle="tab"
            href="#nav-profile"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >Postavke oglasa</a>
          <a
            class="nav-item nav-link"
            id="nav-contact-tab"
            data-toggle="tab"
            href="#nav-contact"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >Dodatne postavke</a>
        </div>
      </nav>

      <div class="tab-content jumbotron" id="nav-tabContent">
        <div
          class="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="name">Poslodavac</label>
              <input
                v-model="poslodavac"
                name="poslodavac"
                type="name"
                class="form-control"
                placeholder="Poslodavac"
                required
              />
            </div>
            <div class="form-group col-md-4">
              <label for="lastname">OIB</label>
              <input v-model="oib" type="number" class="form-control" placeholder="oib" required />
            </div>
            <div class="form-group col-md-4">
              <label for="input">Tip oglasa</label>
              <select v-model="tipoglasa" class="form-control" required>
                <option selected disabled>Izaberi</option>
                <option>Normalni</option>
                <option>Plaćeni</option>
              </select>
            </div>
          </div>
          <br />
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="brtel">Broj telefona</label>
              <input
                v-model="brtel"
                type="number"
                class="form-control"
                id="brtel"
                placeholder="Br. tel"
                required
              />
            </div>
            <div class="form-group col-md-6">
              <label for="lastname">Email</label>
              <input v-model="email" class="form-control" type="email" placeholder="Email" required />
            </div>
          </div>
          <br />
          <div class="text-right">
            <button
              class="btn btn-primary btn-sm"
              id="nav-profile-tab"
              data-toggle="tab"
              href="#nav-profile"
            >Dalje</button>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="vrsta">Vrsta posla</label>
              <input
                v-model="vrsta"
                type="text"
                class="form-control"
                id="vrsta"
                placeholder="Vrsta posla"
                required
              />
            </div>

            <div class="form-group col-md-6">
              <label for="City">Mjesto obavljanja</label>
              <input
                v-model="grad"
                placeholder="Grad gdje se obavlja posao"
                type="text"
                class="form-control"
                id="City"
                required
              />
            </div>
          </div>
          <!-- form row -->

          <div class="form-row">
            <div class="form-group col-6">
              <label for="Satnica">Satnica (u HRK)</label>
              <input
                v-model="satnica"
                type="number"
                id="quantity"
                name="quantity"
                class="form-control"
                required
              />
            </div>
            <div class="form-group col-6">
              <label for="Date">Početak rada</label>
              <input v-model="datum" type="date" class="form-control" required />
            </div>
          </div>
          <div class="form-row">
            <!-- da znam da je ovo krivi nacin koristenja row-a (grid) ali nekad ja sam oduvijek bio poseban :Đ -->
            <div class="form-group col-6">
              <label for="putni">Putni trošak (HRK po KM)</label>
              <input v-model="putni" type="text" class="form-control" id="inputZip" required />
            </div>
            <div class="form-group col-6">
              <label for="Date">Kraj rada</label>
              <input v-model="datumk" type="date" class="form-control" required />
            </div>
          </div>

          <div class="form-row">
            <br />
            <h5>Opis oglasa:</h5>
            <br />
            <textarea
              v-model="tekst"
              placeholder="tekst oglasa .."
              class="form-control"
              id="comment"
              rows="7"
              cols="40"
              required
            ></textarea>
          </div>
          <!-- tab content -->

          <br />
          <div class="text-right">
            <nav>
              <button
                class="btn btn-primary btn-sm"
                id="nav-contact-tab"
                data-toggle="tab"
                href="#nav-contact"
              >Dalje</button>
            </nav>
          </div>
        </div>

        <div
          class="tab-pane fade"
          id="nav-contact"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
        >
          <div class="row">
            <div class="col">
              <h4>Slika:</h4>
              <croppa :width="400" :height="400" v-model="imageData"></croppa>
            </div>
            <div class="col">
              <h4>Postavke oglasa</h4>

              <div class="funkyradio">
                <div class="funkyradio-success">
                  <input
                    v-model="aktivanoglas"
                    value="aktivan"
                    type="radio"
                    name="radio"
                    id="radio2"
                    checked
                  />
                  <label for="radio2">Aktivan odmah</label>
                </div>
                <div class="funkyradio-warning">
                  <input
                    v-model="aktivanoglas"
                    value="neaktivan"
                    type="radio"
                    name="radio"
                    id="radio3"
                  />
                  <label for="radio3">Spremi sada, aktiviraj kasnije</label>
                </div>
              </div>
              <br />
              <br />
              <br />
              <input type="checkbox" class="form-check-input" id="terms" required />
              <label class="form-check-label" for="terms" required>
                Prihvaćam
                <a href data-toggle="modal" data-target="#termsmodal">pravila i uvijete</a> korištenja web aplikacije
              </label>
            </div>
          </div>
          <div class="text-right">
            <div
              v-if="loading"
              class="spinner-border text-primary"
              role="status"
              style="margin-right: 10px;"
            >
              <span class="sr-only">Loading...</span>
            </div>
            <button
              data-toggle="tooltip"
              data-placement="top"
              title="Molimo provjerite sva polja prije slanja!"
              type="submit"
              class="btn btn-primary"
              name="send-mail"
            >Pošalji</button>
          </div>
        </div>
        <!-- tab content -->

        <br />
        <br />
        <br />

        <!-- Modal -->
        <div
          class="modal fade"
          id="termsmodal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="termsmodalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="termsmodalLongTitle">Pravila i uvjeti korištenja</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>
                  Koje vrste podataka prikupljamo?
                  <br />Stvari koje vi i drugi radite i pružite.
                  Informacije i sadržaji koje dajete. Prikupljamo sadržaj, komunikacije i druge podatke koje dajete kada koristite naše proizvode, uključujući i kada se prijavite za račun, kreirate ili dijelite sadržaj te šaljete poruku ili komunicirate s drugima. To može uključivati ​​informacije u ili o sadržaju koji pružate (poput metapodataka), poput lokacije fotografije ili datuma kada je datoteka stvorena. Također može uključivati ​​ono što vidite kroz značajke koje pružamo, kao što je naš fotoaparat, tako da možemo raditi stvari poput prijedloga maski i filtera koji bi vam se mogli svidjeti ili vam dati savjete o upotrebi portretnog načina. Naši sustavi automatski obrađuju sadržaj i komunikacije koje vi i ostali pružate kako biste analizirali kontekst i ono što je u njima za potrebe opisane u nastavku. Saznajte više o tome kako možete kontrolirati tko može vidjeti stvari koje dijelite.
                  Podaci s posebnom zaštitom: Možete odabrati da na svojim Facebook profilnim profilima ili u Životnim događanjima pružite informacije o svojim vjerskim pogledima, političkim pogledima, koga vas "zanima" ili vašem zdravlju. Ove i druge informacije (poput rasnog ili etničkog podrijetla, filozofskih uvjerenja ili članstva u sindikatima) podliježu posebnoj zaštiti prema EU zakonu.
                  Mreže i veze. Prikupljamo podatke o osobama, Stranicama, računima, hashtagovima i grupama s kojima ste povezani i kako s njima komunicirate putem naših proizvoda, kao što su ljudi s kojima komunicirate sa većinom ili sa grupama čiji ste dio. Također prikupljamo podatke za kontakt ako ih odlučite prenijeti, sinkronizirati ili uvoziti s uređaja (poput adresara ili dnevnika poziva ili povijesti dnevnika SMS-a) koje koristimo za pomaganje vama i drugima u pronalaženju ljudi koje možda poznajete i za koje druge svrhe navedene u nastavku.
                </p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal -->
        <div
          class="modal fade"
          id="oglaspostavljen"
          tabindex="-1"
          role="dialog"
          aria-labelledby="successsendmodalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="successsendmodalLabel">Oglas objavljen !</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <h3>Vaš oglas je postavljen !</h3>
                <br />Za plaćene oglase potrebno je slijediti upute na Moji oglasi -> Boost .
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvori</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
  <!-- root element-->
</template>
<script>
$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

import store from "@/store.js";
import { Posts } from "@/services";

export default {
  data() {
    return {
      poslodavac: "",
      oib: "",
      email: "",
      brtel: "",
      vrsta: "",
      grad: "",
      satnica: "",
      putni: "",
      datum: "",
      vrijeme: "",
      number: "",
      napomena: "",
      imageData: null,
      uploadValue: 0,
      datumk: "",
      tipoglasa: "",
      aktivanoglas: "",
      tekst: "",
      store,
      loading: false
    };
  },
  methods: {
    getImageBlob() {
      // Advanced: kako omotati klasičnu callback funkciju u Promise
      return new Promise((resolve, reject) => {
        this.imageData.generateBlob(blobData => {
          if (blobData != null) {
            resolve(blobData);
          } else {
            resolve(blobData);
          }
        });
      });
    },
    async obrazac() {
      this.loading = true;
      var blobData = await this.getImageBlob();
      if (blobData != null) {
        let imageName = this.store.koremail + "/" + Date.now() + ".png";
        let result = await storage.ref(imageName).put(blobData);
        let url = await result.ref.getDownloadURL();
        let post = {
          email: this.email,
          posted_at: Date.now(),
          poslodavac: this.poslodavac,
          oib: this.oib,
          brtel: this.brtel,
          vrsta: this.vrsta,
          kkkoremail: this.store.koremail,
          grad: this.grad,
          satnica: this.satnica,
          putni: this.putni,
          datum: this.datum,
          vrijeme: this.vrijeme,
          number: this.number,
          tekst: this.tekst,
          uploadValue: this.uploadValue,
          datumk: this.datumk,
          tipoglasa: this.tipoglasa,
          aktivanoglas: this.aktivanoglas,
          url: url
        };
        let newpost = await Posts.add(post);
      } else if (blobData == null) {
        let post1 = {
          email: this.email,
          kkkoremail: this.store.koremail,
          posted_at: Date.now(),
          poslodavac: this.poslodavac,
          oib: this.oib,
          brtel: this.brtel,
          vrsta: this.vrsta,
          grad: this.grad,
          satnica: this.satnica,
          putni: this.putni,
          datum: this.datum,
          vrijeme: this.vrijeme,
          number: this.number,
          tekst: this.tekst,
          uploadValue: this.uploadValue,
          datumk: this.datumk,
          tipoglasa: this.tipoglasa,
          aktivanoglas: this.aktivanoglas
        };
        await Posts.add(post1);
      }

      console.log("Spremljeni post");
      this.post = "";
      this.post1 = "";
      this.loading = false;
      this.$router.push({ path: "oglasiposlpocetna" });
    }
  }
};
</script>

<style scoped>
.funkyradio div {
  clear: both;
  overflow: hidden;
}

.funkyradio label {
  width: 100%;
  border-radius: 3px;
  border: 1px solid rgb(40, 110, 145);
  font-weight: normal;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
.funkyradio input[type="radio"]:empty,
.funkyradio input[type="checkbox"]:empty {
  display: none;
}

.funkyradio input[type="radio"]:empty ~ label,
.funkyradio input[type="checkbox"]:empty ~ label {
  position: relative;
  line-height: 2.5em;
  text-indent: 3.25em;
  margin-top: 2em;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.funkyradio input[type="radio"]:empty ~ label:before,
.funkyradio input[type="checkbox"]:empty ~ label:before {
  position: absolute;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  content: "";
  width: 2.5em;
  background: #d1d3d4;
  border-radius: 3px 0 0 3px;
}

.funkyradio input[type="radio"]:hover:not(:checked) ~ label,
.funkyradio input[type="checkbox"]:hover:not(:checked) ~ label {
  color: rgb(10, 9, 9);
}

.funkyradio input[type="radio"]:hover:not(:checked) ~ label:before,
.funkyradio input[type="checkbox"]:hover:not(:checked) ~ label:before {
  content: "\2714";
  text-indent: 0.9em;
  color: rgb(5, 4, 4);
}

.funkyradio input[type="radio"]:checked ~ label,
.funkyradio input[type="checkbox"]:checked ~ label {
  color: rgb(0, 0, 0);
}

.funkyradio input[type="radio"]:checked ~ label:before,
.funkyradio input[type="checkbox"]:checked ~ label:before {
  content: "\2714";
  text-indent: 0.9em;
  color: #333;
  background-color: #ccc;
}

.funkyradio input[type="radio"]:focus ~ label:before,
.funkyradio input[type="checkbox"]:focus ~ label:before {
  box-shadow: 0 0 0 3px #999;
}

.funkyradio-default input[type="radio"]:checked ~ label:before,
.funkyradio-default input[type="checkbox"]:checked ~ label:before {
  color: #333;
  background-color: #ccc;
}

.funkyradio-primary input[type="radio"]:checked ~ label:before,
.funkyradio-primary input[type="checkbox"]:checked ~ label:before {
  color: #fff;
  background-color: #337ab7;
}

.funkyradio-success input[type="radio"]:checked ~ label:before,
.funkyradio-success input[type="checkbox"]:checked ~ label:before {
  color: #fff;
  background-color: #5cb85c;
}

.funkyradio-danger input[type="radio"]:checked ~ label:before,
.funkyradio-danger input[type="checkbox"]:checked ~ label:before {
  color: #fff;
  background-color: #d9534f;
}

.funkyradio-warning input[type="radio"]:checked ~ label:before,
.funkyradio-warning input[type="checkbox"]:checked ~ label:before {
  color: #fff;
  background-color: #f0ad4e;
}

.funkyradio-info input[type="radio"]:checked ~ label:before,
.funkyradio-info input[type="checkbox"]:checked ~ label:before {
  color: #fff;
  background-color: #5bc0de;
}
</style>
