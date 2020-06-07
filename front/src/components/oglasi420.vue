<template>
  <div>
    <div
      v-if="(g.tipoglasa=='Normalni' && g.aktivanoglas=='aktivan') || (g.tipoglasa=='Plaćeni' && g.status=='odbijeno' && g.aktivanoglas=='aktivan') || (g.tipoglasa=='Plaćeni' && g.status=='' && g.aktivanoglas=='aktivan') || (g.tipoglasa=='Plaćeni' && g.status==null && g.aktivanoglas=='aktivan')"
    >
      <div class="card bg-light text-center" style="margin-top:15px;">
        <div class="card-header">
          <p style="text-align:left;">
            {{g.poslodavac}}
            <span style="float:right;">{{g.posted_at | formatTime }}</span>
          </p>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{g.vrsta}}</h5>
          <p
            class="card-text jumbotron"
            style="font-family:'comic sans ms'"
            v-if="showcomments1==null"
          >
            Grad: {{g.grad}}
            <br />
            Pocetak rada: {{g.datum}}
            <br />
            Kraj rada: {{g.datumk}}
            <br />
            Email: {{g.email}}
            <br />
            Satnica: {{g.satnica}}
            <br />
            <i>{{g.tekst}}</i>
          </p>

          <p class="card-text" style="font-family:'verdana'" v-if="showcomments1">
            <i>
              <b>{{g.tekst}}</b>
            </i>
            <br />
            <br />
            Satnica: {{g.satnica}}
            <br />
            Putni trošak: {{g.putni}}
            <br />
            Pocetak rada: {{g.datum}}
            <br />
            Kraj rada: {{g.datumk}}
            <br />
            Grad: {{g.grad}}
            <br />
            Poslodavac: {{g.poslodavac}}
            <br />
            Email: {{g.email}}
            <br />
            Broj telefona: {{g.brtel}}
            <br />
          </p>
          <img :src="g.url" @click="prikazSlikeUsr(g);" width="100px" />
          <br />
          <button
            v-if="showcomments1"
            @click="editComment(g);"
            type="button"
            style="margin: 12px;"
            class="btn btn-outline-primary"
            data-toggle="modal"
            data-target="#commentModal1"
          >Prijavi se na oglas</button>
          <button
            v-if="showcomments1==null"
            @click="otvorioglas(g);"
            type="button"
            style="margin: 12px;"
            class="btn btn-outline-primary"
          >Detalji oglasa</button>
        </div>
        <div v-if="showcomments1" class="container">
          <div class="comments list-group">
            <a
              :key="c.posted_at"
              v-for="c in g.comments"
              href="#"
              class="animate list-group-item list-group-item-action flex-column align-items-start"
            >
              <div class="d-flex w-100 justify-content-between">
                <small>{{ c.email }}</small>
                <a
                  v-if="(store.koremail == g.email) || (c.email == store.koremail) || (store.tipKorisnika=='admin')"
                  @click="removeComment(c.id)"
                  href="#"
                >Obriši</a>
              </div>
              {{ c.comment }}
            </a>
          </div>
          <br />
          <div
            class="modal fade"
            id="picusrModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="picusrModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content" style="display:inline-block;">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <img class="modal-content" :src="store.url" />
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvori</button>
                </div>
              </div>
            </div>
          </div>

          <!-- prijava na oglas modal -->
          <div
            class="modal fade"
            id="commentModal1"
            tabindex="-1"
            role="dialog"
            aria-labelledby="commentModalTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content modcont1">
                <div class="modal-header">
                  <h5 class="modal-title" id="commentModalLongTitle">Prijava na oglas</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <h2>
                    <br />
                    <h6>ID: ({{store.aktivnikorisnik}})</h6>
                  </h2>

                  <div class="row">
                    <div class="col-sm">
                      Poslodavac: {{store.poslodavac}}
                      <br />
                      Oib: {{store.oib}}
                      <br />
                      Vrsta: {{store.vrsta}}
                      <br />
                      Email: {{store.email}}
                      <br />
                    </div>
                    <div class="col-sm">
                      Datum početka: {{store.datum}}
                      <br />
                      Datum kraja: {{store.datumk}}
                      <br />
                      Grad: {{store.grad}}
                      <br />
                      Satnica: {{store.satnica}}
                      <br />
                      Putni: {{store.putni}}
                      <br />
                    </div>
                    <br />
                  </div>
                  <small>{{store.posted_at | formatTime }}</small>
                  <br />
                  <br />
                  <textarea
                    v-model="store.tekst"
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    disabled
                  ></textarea>
                  <br />
                  <hr />

                  <h4>Podaci i prijava</h4>
                  <div class="container">
                    <div class="row">
                      <div class="col">
                        <input
                          class="form-control"
                          type="text"
                          v-model="store.username"
                          placeholder="korisnicko ime"
                          readonly
                        />
                      </div>
                      <div class="col">
                        <input
                          class="form-control"
                          type="text"
                          v-model="store.ime"
                          placeholder="Ime"
                          readonly
                        />
                      </div>
                      <div class="col">
                        <input
                          class="form-control"
                          type="text"
                          v-model="store.prezime"
                          placeholder="Prezime"
                          readonly
                        />
                      </div>
                      <div class="w-100"></div>
                      <br />
                      <div class="col">
                        <input
                          class="form-control"
                          type="text"
                          v-model="store.koremail"
                          placeholder="Email"
                          required
                        />
                      </div>
                      <div class="col">
                        <input
                          class="form-control"
                          type="text"
                          v-model="store.brtel"
                          placeholder="Broj telefona"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                  <div class="form-group">
                    <textarea
                      v-model="store.prijava"
                      class="form-control"
                      id="zasseprijav"
                      rows="3"
                      placeholder="Vaša prijava"
                      required
                    ></textarea>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    @click="zatvori()"
                  >Zatvori</button>
                  <button
                    @click="saveComment()"
                    type="submit"
                    class="btn btn-primary"
                    name="send-mail"
                  >Pošalji</button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="modal fade"
            id="picusrModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="picusrModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content" style="display:inline-block;">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <img class="modal-content" :src="store.url" />
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvori</button>
                </div>
              </div>
            </div>
          </div>

          <form @submit.prevent="postComment" class="form-inline mb-5">
            <div class="form-group">
              <input
                v-model="newComment"
                type="text"
                class="form-control"
                id="imageUrl"
                placeholder="Komentar"
              />
            </div>
            <button type="submit" class="btn btn-primary ml-2">Post</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store.js";
import moment from "moment";
import { Posts } from "@/services";
import { Auth } from "@/services";
export default {
  props: ["g", "showcomments1"],
  data() {
    return {
      store,
      comments: [],
      newComment: "",
      kkkoremail: ""
    };
  },
  filters: {
    formatTime: function(value) {
      return moment(value).format("Do MMMM YYYY");
    }
  },
  mounted() {},
  methods: {
    async refresh() {
      let post = await Posts.getOne(this.g.id);
      this.g.comments = post.comments;
    },
    async removeComment(commentId) {
      let postId = this.g.id;
      await Posts.Comments.delete(postId, commentId);
      this.refresh();
    },
    editComment(g) {
      $("#commentModal1").modal("show");
      this.store.aktivnikorisnik = g.id;
      this.store.email = g.email;
      this.store.satnica = g.satnica;
      this.store.datumk = g.datumk;
      this.store.datum = g.datum;
      this.store.grad = g.grad;
      this.store.tekst = g.tekst;
      this.store.napomena = g.napomena;
      this.store.oib = g.oib;
      this.store.poslodavac = g.poslodavac;
      this.store.putni = g.putni;
      this.store.vrsta = g.vrsta;
      this.store.posted_at = g.posted_at;
      this.store.prijava = "";
      this.store.kkkoremail = g.kkkoremail;
    },
    async saveComment() {
      let podaciprijave = {
        aktivnikorisnik: this.store.aktivnikorisnik,
        satnica: this.store.satnica,
        brtel: this.store.brtel,
        datumk: this.store.datumk,
        datum: this.store.datum,
        grad: this.store.grad,
        oib: this.store.oib,
        poslodavac: this.store.poslodavac,
        putni: this.store.putni,
        vrsta: this.store.vrsta,
        ime: this.store.ime,
        prezime: this.store.prezime,
        korime: this.store.username,
        prijava: this.store.prijava,
        email: this.store.email,
        tekst: this.store.tekst,
        userEmail: this.store.koremail,
        koremail: this.store.kkkoremail,
        posted_at: Date.now()
      };
      await Posts.prijava(podaciprijave).then(() => {
        $("#commentModal1").modal("hide");
        console.log("prijava poslana !");
        this.prijava = "";
      });
      this.$notify({
        group: "prijav",
        title: "Uspješno!",
        text: "Vaša prijava je poslana!"
      });
    },
    prikazSlikeUsr(g) {
      $("#picusrModal").modal("show");
      this.store.url = g.url;
    },
    otvorioglas(g) {
      this.$router.push({ path: `posts/${g.id}` });
    },
    async postComment() {
      if (this.newComment) {
        let postId = this.g.id;
        let comment = {
          // sadržaj komentara
          email: this.store.koremail,
          comment: this.newComment
        };
        try {
          await Posts.Comments.add(postId, comment); // pozivamo gore
          this.refresh();
        } catch (e) {
          console.error("Greška prilikom snimanja komentara", e);
        } finally {
          this.newComment = "";
        }
      }
    }
  }
};
</script>
<style>
@-webkit-keyframes fade-in-fwd {
  0% {
    -webkit-transform: translateZ(-80px);
    transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}
@keyframes fade-in-fwd {
  0% {
    -webkit-transform: translateZ(-80px);
    transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}
.animate {
  -webkit-animation: fade-in-fwd 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in-fwd 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
</style>