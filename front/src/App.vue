<template>
  <div id="app">
    <div class="bg-white">
      <div class="container">
        <div class="row">
          <div class="col">
            <!--<router-link-->
            <nav class="navbar navbar-expand-lg navbar-light mb-2">
              <router-link v-if="!auth.authenticated" :to="{name: 'pregledoglasa'}">
                <img src="/images/fipu_logo.png" width="140" />
              </router-link>
              <router-link
                v-if="(auth.authenticated) && (store.tipKorisnika=='oglašivač')"
                to="/oglasiposlpocetna"
              >
                <img src="/images/fipu_logo.png" width="140" />
              </router-link>
              <router-link
                v-if="(auth.authenticated) && (store.tipKorisnika=='Korisnik')"
                :to="{name: 'ulogiranioglasi'}"
              >
                <img src="/images/fipu_logo.png" width="140" />
              </router-link>
              <router-link
                v-if="(auth.authenticated) && (store.tipKorisnika=='admin')"
                :to="{name: 'ulogiranioglasi'}"
              >
                <img src="/images/fipu_logo.png" width="140" />
              </router-link>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <form class="form-inline my-2 my-lg-0 mr-auto ml-5">
                  <input
                    v-model="store.searchTerm"
                    class="form-control mr-sm-2"
                    type="search"
                    placeholder="Tražilica"
                    aria-label="Search"
                  />
                </form>
                <router-link
                  v-if="!auth.authenticated"
                  class="btn btn-info my-2 my-sm-0 mr-2"
                  to="/login"
                >Prijava</router-link>
                <span v-if="auth.authenticated">
                  <span class="my-2 my-sm-0 mr-2">Dobrodošao nazad, {{store.username}}</span>
                  <router-link
                    v-if="store.tipKorisnika=='admin'"
                    class="btn btn-info my-2 my-sm-0 mr-2"
                    to="/admin"
                  >
                    <i class="fa fa-wrench" aria-hidden="true"></i> Admin
                  </router-link>
                  <router-link
                    v-if="store.tipKorisnika=='Korisnik'"
                    class="btn btn-secondary my-2 my-sm-0 mr-2"
                    to="/prijave"
                  >Moje Prijave</router-link>
                  <!--<router-link v-if="tipKorisnika=='oglašivač'" class="btn btn-secondary my-2 my-sm-0 mr-2" to="/oglasi" >Naslovna</router-link>-->
                  <router-link class="btn btn-info my-2 my-sm-0 mr-2" to="/profil">
                    <i class="fa fa-user" aria-hidden="true"></i> Profil
                  </router-link>
                  <span v-if="store.tipKorisnika=='oglašivač'" class="dropdown my-2 my-sm-0 mr-2">
                    <button
                      v-if="store.tipKorisnika=='oglašivač'"
                      class="btn btn-secondary dropdown-toggle my-2 my-sm-0 mr-2"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >Oglašivač</button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <router-link
                        v-if="store.tipKorisnika=='oglašivač'"
                        class="dropdown-item"
                        to="/postavioglas"
                      >
                        <i class="fa fa-plus" aria-hidden="true"></i> Dodaj oglas
                      </router-link>
                      <router-link
                        v-if="store.tipKorisnika=='oglašivač'"
                        class="dropdown-item"
                        to="/prijaveoglasivac"
                      >
                        <i class="fa fa-handshake-o" aria-hidden="true"></i> Prijave na oglas
                      </router-link>
                      <router-link
                        v-if="store.tipKorisnika=='oglašivač'"
                        class="dropdown-item"
                        to="/oglasiposlodavac"
                      >
                        <i class="fa fa-pencil" aria-hidden="true"></i> Uređivanje oglasa
                      </router-link>
                      <!--<div class="dropdown-divider"></div>
                      <router-link v-if="store.tipKorisnika=='oglašivač'" class="dropdown-item" to="/ulogiranioglasi" ><i class="fa fa-list" aria-hidden="true"></i> Svi oglasi</router-link>-->
                    </div>
                  </span>

                  <a
                    @click.prevent="logout"
                    class="btn btn-danger my-2 my-sm-0 mr-2"
                    href="#"
                  >Logout</a>
                </span>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <router-view />
    </div>

    <div id="footer" class="text-center mt-5" style>Zarada + (c) 2020</div>
  </div>
</template>
<script>
import store from "@/store.js";
import postavioglas from "@/views/postavioglas.vue";
import home from "@/views/Home.vue";
import profil from "@/views/profil.vue";
import { Auth } from "@/services";
export default {
  data() {
    return {
      store,
      auth: Auth.state
    };
  },
  methods: {
    logout() {
      Auth.logout();
      this.$router.push({ path: `pregledoglasa` });
    }
  }
};
</script>
<style lang="scss">
body {
  background-color: rgba(var(--b3f, 250, 250, 250), 1);
}

.bg-white {
  background-color: white;
  border-bottom: #ccc 1px solid;
  margin-bottom: 20px;
  padding: 10px;
}

nav.navbar {
  background-color: white;

  a {
    svg {
      border-right: #aaa 1px solid;
      margin-right: 10px;
      padding-right: 10px;
    }

    img {
      position: relative;
      top: 3px;
    }
  }
}
</style>

