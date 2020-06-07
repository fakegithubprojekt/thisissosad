 <template>
  <div>
    <div
      v-if="(e.tipoglasa=='Normalni' && e.aktivanoglas=='aktivan') || (e.tipoglasa=='Plaćeni' && e.status=='odbijeno' && e.aktivanoglas=='aktivan') || (e.tipoglasa=='Plaćeni' && e.status=='' && e.aktivanoglas=='aktivan') || (e.tipoglasa=='Plaćeni' && e.status==null && e.aktivanoglas=='aktivan')"
    >
      <div class="card bg-light text-center" style="margin-top:15px;">
        <div class="card-header">
          <p style="text-align:left;">
            {{e.poslodavac}}
            <span style="float:right;">{{e.posted_at | formatTime }}</span>
          </p>
        </div>
        <div class="card-body">
          <div class="card-text jumbotron">
            <h5>{{e.vrsta}}</h5>
            <b>Grad:</b>
            {{e.grad}}
            <br />
            <b>Pocetak rada:</b>
            [ {{e.datum}} ]
            <br />
            <b>Kraj rada:</b>
            [ {{e.datumk}} ]
            <br />
            <b>Satnica:</b>
            [ {{e.satnica}} ]
            <br />
            <b>Putni trošak:</b>
            [ {{e.putni}} ]
            <br />
            <b>Brtel:</b>
            [ {{e.brtel}} ]
            <br />
            <b>Email:</b>
            [ {{e.email}} ]
            <br />
            <b>Oib:</b>
            [ {{e.oib}} ]
            <br />
          </div>
          <p class="jumbotron">{{e.tekst}}</p>
          <img :src="e.url" @click="prikazSlikeUsr(e);" width="100px" />
          <br />
          <button
            v-if="showcomments2==null"
            @click="otvorioglas(e);"
            type="button"
            style="margin: 12px;"
            class="btn btn-outline-primary"
          >Detalji oglasa</button>
        </div>
        <div v-if="showcomments2" class="container">
          <div class="comments list-group">
            <a
              :key="c.posted_at"
              v-for="c in e.comments"
              href="#"
              class="animate list-group-item list-group-item-action flex-column align-items-start"
            >
              <div class="d-flex w-100 justify-content-between">
                <small>
                  <b>{{ c.email }}</b>
                </small>
                <a @click="removeComment(c.id)" href="#">Obriši</a>
              </div>
              <small>
                <i>{{ c.comment }}</i>
              </small>
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
  props: ["e", "showcomments2"],
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
  methods: {
    otvorioglas(e) {
      this.$router.push({ path: `post/${e.id}` });
    },
    async refresh() {
      let post = await Posts.getOne(this.e.id);
      this.e.comments = post.comments;
    },
    async removeComment(commentId) {
      let postId = this.e.id;
      await Posts.Comments.delete(postId, commentId);
      this.refresh();
    },
    prikazSlikeUsr(e) {
      $("#picusrModal").modal("show");
      this.store.url = e.url;
    },
    /*otvorioglas(a) {
      this.$router.push({ path: `posts/${a.id}` });
    },*/
    async postComment() {
      if (this.newComment) {
        // db.collection("noviobrazac2")
        //   .doc(this.b.id)
        //     .collection("comments")
        //     .add({ email: this.store.userEmail, comment: this.newComment, posted_at: Date.now() })
        //       .then(result => {
        //         console.log(result)
        //         this.newComment = "";
        //       })
        //       .catch(e => {
        //         console.error(e)
        //       })
        let postId = this.e.id;
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
