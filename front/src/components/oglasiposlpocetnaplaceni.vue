<template>
  <div>
    <div v-if="o.tipoglasa=='Plaćeni' && o.status=='odobreno' && o.aktivanoglas=='aktivan'">
      <div class="card text-white bg-info mb-3 text-center" style="margin-top:15px;">
        <div class="card-header">{{o.poslodavac }}</div>
        <div class="card-body">
          <h5 class="card-title">{{o.vrsta}}</h5>
          <p class="card-text" style="font-family:'verdana'">
            Objavljeno: {{o.posted_at | formatTime}}
            <br />
            Grad: {{o.grad}}
            <br />
            Pocetak rada: {{o.datum}}
            <br />
            Kraj rada: {{o.datumk}}
            <br />
            Satnica: {{o.satnica}}
          </p>
          <br />
          <p class="card-text" style="font-family:'verdana'" v-if="showcomments3">
            email: {{o.email}}
            <br />
            oib: {{o.oib}}
            <br />
            <br />
            {{o.tekst}}
          </p>
          <button
            v-if="showcomments3==null"
            @click="otvorioglas(o);"
            type="button"
            style="margin: 12px;"
            class="btn btn-outline-dark"
          >Detalji oglasa</button>
          <br />
          <img :src="o.url" @click="prikazSlikeUsr(o);" width="100px" />
        </div>
        <div v-if="showcomments3">
          <div class="comments list-group">
            <a
              :key="c.posted_at"
              v-for="c in o.comments"
              href="#"
              class="animate list-group-item list-group-item-action flex-column align-items-start"
            >
              <div class="d-flex w-100 justify-content-between">
                <small>by {{ c.email }}</small>
                <a
                  v-if="(store.koremail == c.email) || (c.email == store.koremail) || (store.tipKorisnika=='admin')"
                  @click="removeComment(c.id)"
                  href="#"
                >Obraiši</a>
              </div>
              <small>{{ c.comment }}</small>
            </a>
          </div>
          <br />

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
            <button type="submit" class="btn btn-primary ml-2">Pošalji</button>
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
  props: ["o", "showcomments3"],
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
      let post = await Posts.getOne(this.o.id);
      this.o.comments = post.comments;
    },
    async removeComment(commentId) {
      let postId = this.o.id;
      await Posts.Comments.delete(postId, commentId);
      this.refresh();
    },
    prikazSlikeUsr(o) {
      $("#picusrModal").modal("show");
      this.store.url = o.url;
    },
    otvorioglas(o) {
      this.$router.push({ path: `post/${o.id}` });
    },
    async postComment() {
      if (this.newComment) {
        let postId = this.o.id;
        let comment = {
          // sadržaj komentara
          email: Auth.state.userEmail,
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