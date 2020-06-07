<template>
  <div>
    <div class="col" style="margin-top: 50px;">
      <div class="card">
        <div class="card-header">Promjena lozinke</div>
        <div class="card-body">
          <form @submit.prevent="promjena" class>
            <div class="form-group">
              <label for="exampleInputPassword1">Nova lozinka</label>
              <input
                v-model="password"
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Nova lozinka"
              />
              <center>
                <button type="submit" class="btn btn-primary mt-5" @click="promjena()">Promjeni</button>
              </center>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      password: ""
    };
  },
  methods: {
    promjena() {
      var user = firebase.auth().currentUser;
      user
        .updatePassword(this.password)
        .then(function() {})
        .catch(function(error) {
          // An error happened.
        });
      alert("Lozinka promjenjena !");
      firebase.auth().signOut();
      this.$router.push({ path: "/pocetna" });
      location.reload();
      console.log("Odjavljen!");
    }
  }
};
</script>
