<template>
  <div>
    <div class="row">
      <div class="col" style="margin-top: 50px;">
        <!--<div :key="c.id" v-for="c in profil">
    <p>email:</p>{{email}}
        </div>-->
        <div class="card">
          <div class="card-header">{{store.korisnik.koremail}}</div>
          <div class="card-body">
            <p>Korisničko ime: {{store.korisnik.username}}</p>
            <p>Ime: {{store.korisnik.ime}} {{store.korisnik.prezime}}</p>
            <p>Telefonski broj: {{store.korisnik.brtel}}</p>
            <p>Tip korisnika: {{store.korisnik.tipKorisnika}}</p>
            <p>Zanimanje: {{store.korisnik.zanimanje}}</p>
            <p>Županija: {{store.korisnik.zupanija}}</p>
            <p>Datum Registracije: {{store.korisnik.datumreg | formatTime}}</p>
            <button
              class="btn btn-primary"
              type="button"
              data-toggle="collapse"
              data-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >Izmjeni</button>
            <button
              style="margin-left: 10px;"
              class="btn btn-primary"
              type="button"
              data-toggle="collapse"
              data-target="#pwchangecoll"
              aria-expanded="false"
              aria-controls="pwchangecoll"
            >Promjena lozinke</button>
          </div>
        </div>
      </div>
      <div class="col" style="margin-top: 50px;">
        <div class="collapse" id="collapseExample">
          <div class="card card-body">
            <form>
              <div class="form-row align-items-center">
                <div class="col-auto">
                  <label class="sr-only" for="inlineFormInputGroup">Korisničko ime</label>
                  <div class="input-group mb-2">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <i class="fa fa-user-o" aria-hidden="true"></i>
                      </div>
                    </div>
                    <input
                      v-model="store.korisnik.username"
                      type="text"
                      class="form-control"
                      id="inlineFormInputGroup"
                      placeholder="Korisničko ime"
                    />
                  </div>
                </div>

                <div class="form-group col-md-6 mb-2">
                  <select v-model="store.korisnik.zupanija" id="inputState" class="form-control">
                    <option :key="k.id" v-for="k in zupanijelista">{{k}}</option>
                  </select>
                </div>

                <div class="col-auto">
                  <label class="sr-only" for="inlineFormInputGroup">Zanimanje</label>
                  <div class="input-group mb-2">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <i class="fa fa-address-card-o" aria-hidden="true"></i>
                      </div>
                    </div>
                    <input
                      v-model="store.korisnik.zanimanje"
                      type="text"
                      class="form-control"
                      id="inlineFormInputGroup"
                      placeholder="Zanimanje"
                    />
                  </div>
                </div>

                <div class="col-auto">
                  <label class="sr-only" for="inlineFormInputGroup">Broj telefona</label>
                  <div class="input-group mb-2">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <i class="fa fa-phone" aria-hidden="true"></i>
                      </div>
                    </div>
                    <input
                      v-model="store.korisnik.brtel"
                      type="text"
                      class="form-control"
                      id="inlineFormInputGroup"
                      placeholder="Broj telefona"
                    />
                  </div>
                </div>

                <br />
                <br />
                <br />
              </div>
            </form>
            <div class="col-auto my-1">
              <button @click="spremiIzmjene()" type="submit" class="btn btn-primary">Spremi</button>
            </div>
          </div>
        </div>
        <div class="collapse" id="pwchangecoll">
          <div class="card card-body">
            <form @submit.prevent="pass">
              <label class="sr-only" for="inlineFormInputGroup">Stara lozinka</label>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <i class="fa fa-lock" aria-hidden="true"></i>
                  </div>
                </div>
                <input
                  v-model="oldpass"
                  type="text"
                  class="form-control"
                  id="inlineFormInputGroup"
                  placeholder="Trenutna Lozinka"
                />
              </div>
              <label class="sr-only" for="inlineFormInputGroup">Nova lozinka</label>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <i class="fa fa-lock" aria-hidden="true"></i>
                  </div>
                </div>
                <input
                  v-model="newpass"
                  type="text"
                  class="form-control"
                  id="inlineFormInputGroup"
                  placeholder="Nova lozinka"
                />
              </div>
              <br />
              <button type="submit" class="btn btn-primary">Promjeni lozinku</button>
            </form>
          </div>
        </div>
      </div>

      <!-- <pwchange /> -->
    </div>
  </div>
</template>
<script>
import store from "@/store.js";
import moment from "moment";
import profil from "@/components/profil.vue";
import pwchange from "@/components/promjenalozinke.vue";
import { Auth } from "@/services";

export default {
  data() {
    return {
      brtel: "",
      ime: "",
      prezime: "",
      zanimanje: "",
      zupanija: "",
      auth: Auth.state,
      zupanijelista: [
        "ZAGREBAČKA",
        "KRAPINSKO-ZAGORSKA",
        "SISAČKO-MOSLAVAČKA",
        "KARLOVAČKA",
        "VARAŽDINSKA",
        "KOPRIVNIČKO-KRIŽEVAČKA",
        "BJELOVARSKO-BILOGORSKA",
        "PRIMORSKO-GORANSKA",
        "LIČKO-SENJSKA",
        "VIROVITIČKO-PODRAVSKA",
        "POŽEŠKO-SLAVONSKA",
        "BRODSKO-POSAVSKA",
        "ZADARSKA",
        "OSJEČKO-BARANJSKA",
        "ŠIBENSKO-KNINSKA",
        "VUKOVARSKO-SRIJEMSKA",
        "SPLITSKO-DALMATINSKA",
        "ISTARSKA",
        "DUBROVAČKO-NERETVANSKA",
        "MEĐIMURSKA",
        "GRAD ZAGREB"
      ],
      store,
      oldpass: "",
      newpass: ""
    };
  },
  components: {
    profil,
    pwchange
  },
  filters: {
    formatTime: function(value) {
      return moment(value).format("Do MMMM YYYY  h:mm:ss a");
    }
  },
  methods: {
    async pass() {
      let promjenalozinke = {
        old_password: this.oldpass,
        new_password: this.newpass
      };
      await Auth.promjena(promjenalozinke).then(() => {
        Auth.logout();
        this.$router.push({ name: "pregledoglasa" });
      });
    },
    async spremiIzmjene() {
      var id = this.store.userid;
      if (!id) {
        alert("Error: kontaktirajte webmastera !");
        return;
      }
      var azuriraj = {
        brtel: this.store.korisnik.brtel,
        ime: this.store.korisnik.ime,
        prezime: this.store.korisnik.prezime,
        zanimanje: this.store.korisnik.zanimanje,
        zupanija: this.store.korisnik.zupanija
      };
      await Auth.azuriraj(id, azuriraj).then(() => {
        Auth.logout();
        this.$router.push({ name: "pregledoglasa" });
      });
    }
  }
};
</script>