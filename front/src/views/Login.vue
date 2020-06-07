<template>
  <div class="row" align="center">
    <div class="container">
      <div
        id="loginbox"
        style="margin-top:50px;"
        class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"
      >
        <div class="panel panel-info">
          <div class="panel-heading">
            <div class="panel-title">
              <b>PRIJAVA</b>
            </div>
          </div>
          <div style="padding-top:30px" class="panel-body">
            <div style="display:none" id="login-alert" class="alert alert-danger col-sm-12"></div>
            <form @submit.prevent="login">
              <div style="margin-bottom: 25px" class="input-group">
                <span class="input-group-addon">
                  <i class="glyphicon glyphicon-user"></i>
                </span>
                <input
                  v-model="email"
                  id="login-username"
                  type="text"
                  class="form-control"
                  name="username"
                  value
                  placeholder="Email"
                />
              </div>
              <div style="margin-bottom: 25px" class="input-group">
                <span class="input-group-addon">
                  <i class="glyphicon glyphicon-lock"></i>
                </span>
                <input
                  v-model="password"
                  id="login-password"
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Lozinka"
                />
              </div>
              <div style="margin-top:10px" class="form-group">
                <!-- Button -->
                <div class="col-sm-12 controls">
                  <div class="row">
                    <div class="col">
                      <button
                        type="submit"
                        class="btn btn-success"
                        name="login_user"
                        style="width: 120%;"
                      >Login</button>
                    </div>
                    <div class="col">
                      <a
                        id="btn-fblogin"
                        style="width: 100px; float:right;"
                        href="#"
                        onclick="$('#loginbox').hide(); $('#signupbox').show()"
                        class="btn btn-primary"
                      >Registracija</a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        id="signupbox"
        style="display:none; margin-top:50px"
        class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"
      >
        <div class="panel panel-info">
          <div class="panel-heading">
            <div class="panel-title">
              <b>Registracija</b>
            </div>
            <div style="float:right; font-size: 85%; position: relative; top:-10px">
              <a
                id="signinlink"
                href="#"
                onclick="$('#signupbox').hide(); $('#loginbox').show()"
              >Prijava</a>
            </div>
          </div>
          <br />
          <div class="panel-body">
            <Signup />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Signup from "@/views/Signup.vue";
import { Auth } from "@/services";
import admin from "@/views/admin";
import store from "@/store";

export default {
  data() {
    return {
      email: "",
      password: "",
      tipKorisnika: "",
      auth: Auth.state
    };
  },
  components: {
    Signup,
    admin
  },
  name: "Login",
  methods: {
    async login() {
      let success = await Auth.login(this.email, this.password);
      console.log("Rezultat prijave", success);

      if (success == true && Auth.state.tipKorisnika == "admin") {
        this.$router.push({ name: "admin" });
      }
      if (success == true && Auth.state.tipKorisnika == "Korisnik") {
        this.$router.push({ name: "ulogiranioglasi" });
      }
      if (success == true && Auth.state.tipKorisnika == "oglašivač") {
        this.$router.push({ name: "oglasiposlpocetna" });
      }
    }
  }
};
</script>