<template>
  <div>
    <div v-if="z.tipoglasa=='Plaćeni' && z.status=='odobreno' && z.aktivanoglas=='aktivan'">
      <div class="card text-white bg-info mb-3 text-center" style="margin-top:15px;">
        <div class="card-header">{{z.poslodavac }} - {{z.posted_at | formatTime}}</div>
        <div class="card-body">
          <h5 class="card-title">{{z.vrsta}}</h5>
          <p v-if="showcomments==null" class="card-text" style="font-family:'verdana'">
            Objavljeno: {{z.posted_at | formatTime}}
            <br />
            Grad: {{z.grad}}
            <br />
            Pocetak rada: {{z.datum}}
            <br />
            Kraj rada: {{z.datumk}}
            <br />
            Satnica: {{z.satnica}}
          </p>
          <p class="card-text" style="font-family:'verdana'" v-if="showcomments">
            <i>{{z.tekst}}</i>
            <br />
            <br />
            Satnica: {{z.satnica}}
            <br />
            Putni trošak: {{z.putni}}
            <br />
            Pocetak rada: {{z.datum}}
            <br />
            Kraj rada: {{z.datumk}}
            <br />
            Grad: {{z.grad}}
            <br />
            Poslodavac: {{z.poslodavac}}
            <br />
            Email: {{z.email}}
            <br />
            Broj telefona: {{z.brtel}}
            <br />
          </p>
          <button
            v-if="showcomments!=null"
            @click="editComment(z);"
            type="button"
            style="margin: 12px;"
            class="btn btn-outline-warning"
            data-toggle="modal"
            data-target="#commentModal1"
          >Prijavi se na oglas</button>
          <button
            v-if="showcomments==null"
            @click="otvorioglas(z);"
            type="button"
            style="margin: 12px;"
            class="btn btn-outline-primary"
          >Detalji oglasa</button>
          <br />
          <img :src="z.url" @click="prikazSlikeUsr(z);" width="100px" />
        </div>
        <div v-if="showcomments" class="container">
          <div class="comments list-group">
            <a
              :key="c.posted_at"
              v-for="c in z.comments"
              href="#"
              class="animate list-group-item list-group-item-action flex-column align-items-start"
            >
              <div class="d-flex w-100 justify-content-between">
                <small>{{ c.email }}</small>
                <a
                  v-if="(store.koremail == z.email) || (c.email == store.koremail) || (store.tipKorisnika == 'admin')"
                  @click="removeComment(c.id)"
                  href="#"
                >Obriši</a>
              </div>
              <small>{{ c.comment }}</small>
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
                <img class="modal-content" :src="z.url" />
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
                placeholder="Komentar "
              />
            </div>
            <button type="submit" class="btn btn-primary ml-2">Post</button>
          </form>
        </div>
      </div>
    </div>
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
            <div class="container"></div>
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
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvori</button>
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
    <!-- modal -->
  </div>
</template>
<script>
import store from "@/store.js";
import moment from "moment";
import { Posts } from "@/services";
import { Auth } from "@/services";
export default {
  props: ["z", "showcomments"],
  data() {
    return {
      store,
      comments: [],
      newComment: ""
    };
  },
  filters: {
    formatTime: function(value) {
      return moment(value).format("Do MMMM YYYY");
    }
  },
  async mounted() {},
  methods: {
    async refresh() {
      let post = await Posts.getOne(this.z.id);
      this.z.comments = post.comments;
    },
    async removeComment(commentId) {
      let postId = this.z.id;
      await Posts.Comments.delete(postId, commentId);
      this.refresh();
    },
    editComment(z) {
      $("#commentModal1").modal("show");
      this.store.aktivnikorisnik = z.id;
      this.store.satnica = z.satnica;
      this.store.email = z.email;
      this.store.datumk = z.datumk;
      this.store.datum = z.datum;
      this.store.grad = z.grad;
      this.store.tekst = z.tekst;
      this.store.oib = z.oib;
      this.store.poslodavac = z.poslodavac;
      this.store.putni = z.putni;
      this.store.vrsta = z.vrsta;
      this.store.posted_at = z.posted_at;
      this.store.prijava = "";
      this.store.kkkoremail = z.kkkoremail;
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

      //$(".el").notify("I am a notification popup");
      this.$notify({
        group: "prijav",
        title: "Uspješno!",
        text: "Vaša prijava je poslana!"
      });
    },
    prikazSlikeUsr(z) {
      $("#picusrModal").modal("show");
      this.store.url = z.url;
    },
    otvorioglas(z) {
      this.$router.push({ path: `posts/${z.id}` });
    },
    async postComment() {
      if (this.newComment) {
        let postId = this.z.id;
        let comment = {
          // sadržaj komentara
          email: store.koremail,
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