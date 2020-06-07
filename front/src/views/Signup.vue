<template>
  <div>
    <form @submit.prevent="signup">
      <hr />
      <div v-if="errorMessage" class="alert alert-danger">
        <strong>Ups!</strong>
        {{ errorMessage }}
      </div>
      <div class="row">
        <div class="col">
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fa fa-user-o" aria-hidden="true"></i>
              </div>
            </div>
            <input
              v-model="ime"
              type="text"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Ime"
              required
              oninvalid="this.setCustomValidity('Ime je obavezno.')"
              onchange="this.setCustomValidity('')"
            />
          </div>
          <br />
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fa fa-user-o" aria-hidden="true"></i>
              </div>
            </div>
            <input
              v-model="prezime"
              type="text"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Prezime"
              required
              oninvalid="this.setCustomValidity('Ovo polje je obavezno.')"
              onchange="this.setCustomValidity('')"
            />
          </div>
          <br />
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fa fa-address-card" aria-hidden="true"></i>
              </div>
            </div>
            <input
              v-model="zanimanje"
              type="text"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Zanimanje"
              required
              oninvalid="this.setCustomValidity('Ovo polje je obavezno.')"
              onchange="this.setCustomValidity('')"
            />
          </div>
          <br />
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fa fa-phone" aria-hidden="true"></i>
              </div>
            </div>
            <input
              v-model="brtel"
              type="number"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Broj telefona"
              required
              oninvalid="this.setCustomValidity('Ovo polje je obavezno.')"
              onchange="this.setCustomValidity('')"
            />
          </div>
          <br />
          <div class="input-group mb-2">
            <select
              v-model="store.tipKorisnika"
              class="form-control"
              id="selecttipkorisnika"
              oninvalid="this.setCustomValidity('Ovo polje je obavezno.')"
              onchange="this.setCustomValidity('')"
            >
              <option :key="a.id" v-for="a in polje">{{a}}</option>
            </select>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fa fa-user" aria-hidden="true"></i>
              </div>
            </div>
            <input
              v-model="username"
              type="text"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Korisničko ime"
              required
              oninvalid="this.setCustomValidity('Ovo polje je obavezno.')"
              onchange="this.setCustomValidity('')"
            />
          </div>
          <br />
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fa fa-lock" aria-hidden="true"></i>
              </div>
            </div>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Lozinka"
              required
            />
          </div>
          <br />
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fa fa-lock" aria-hidden="true"></i>
              </div>
            </div>
            <input
              v-model="password2"
              type="password"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Ponovljena lozinka"
              required
            />
          </div>
          <br />
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fa fa-envelope-o" aria-hidden="true"></i>
              </div>
            </div>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Email"
              required
            />
          </div>
          <br />
          <div class="input-group mb-2">
            <select
              v-model="zupanija"
              class="form-control"
              id="selectzupaniju"
              required
              oninvalid="this.setCustomValidity('Ovo polje je obavezno.')"
              onchange="this.setCustomValidity('')"
            >
              <option :key="k.id" v-for="k in zupanijelista">{{k}}</option>
            </select>
          </div>
        </div>
      </div>
      <hr />
      <button type="submit" class="btn btn-primary mt-5">Registriraj</button>
    </form>
  </div>
</template>

<script>
import store from "@/store.js";
import { Posts } from "@/services";
import { Auth } from "@/services";
export default {
  data() {
    return {
      errorMessage: "",
      email: "",
      password: "",
      password2: "",
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
      polje: ["oglašivač", "Korisnik"],
      tipKorisnika: "",
      ime: "",
      prezime: "",
      zanimanje: "",
      brtel: "",
      zupanija: "",
      username: "",
      store
    };
  },
  mounted() {},
  methods: {
    async signup() {
      if (
        this.password !== this.password2 ||
        this.password2 !== this.password
      ) {
        alert("Lozinke se ne podudaraju!");
        console.log(error);
      }

      let a = {
        email: this.email,
        password: this.password,
        polje: this.polje,
        tipKorisnika: this.store.tipKorisnika,
        ime: this.ime,
        prezime: this.prezime,
        zanimanje: this.zanimanje,
        brtel: this.brtel,
        zupanija: this.zupanija,
        username: this.username,
        datumreg: Date.now()
      };
      await Auth.signup(a).then(() => {
        this.$router.push({ name: "pregledoglasa" });
      });
    }
  }
};
</script>