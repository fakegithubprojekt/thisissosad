<template>
  <div class="Home">
    <div v-if="auth.authenticated==true && store.tipKorisnika=='Korisnik'">
      <router-view />
    </div>
    <div v-else-if="auth.authenticated==true && store.tipKorisnika=='oglašivač'">
      <router-view />
    </div>
    <div v-else-if="auth.authenticated==true && store.tipKorisnika=='admin'">
      <router-view />
    </div>
    <div v-else-if="auth.authenticated==false">
      <pregledoglasa />
    </div>
    <div v-else>
      <Login />
    </div>
  </div>
</template>

<script>
import store from "@/store.js";
import postavioglas from "@/views/postavioglas.vue";
import pregledoglasa from "@/views/pregledoglasa.vue";
import ulogiranioglasi from "@/views/ulogiranioglasi.vue";
import admin from "@/views/admin.vue";
import Login from "@/views/Login.vue";
import oglasiposlpocetna from "@/views/oglasiposlpocetna.vue";
import { Auth } from "@/services";
export default {
  name: "Home",
  components: {
    postavioglas,
    Login,
    pregledoglasa,
    ulogiranioglasi,
    admin,
    oglasiposlpocetna
  },
  data() {
    return {
      auth: Auth.state,
      store
    };
  }
};
</script>
