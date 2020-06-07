<template>
  <div>
    <div v-if="e">
      <oglasiposlpocetna :e="e" :showcomments2="true" />
    </div>
    <div v-if="o">
      <oglasiposlpocetnaplaceni :o="o" :showcomments3="true" />
    </div>
  </div>
</template>

<script>
import oglasiposlpocetna from "@/components/oglasiposlpocetna.vue";
import oglasiposlpocetnaplaceni from "@/components/oglasiposlpocetnaplaceni.vue";
import store from "@/store.js";
import { Posts } from "@/services";

export default {
  props: ["id"],
  data() {
    return {
      e: null,
      o: null
    };
  },
  async mounted() {
    console.log(this.id);
    this.e = await Posts.getOne(this.id);
    this.o = await Posts.getOne(this.id);
  },
  name: "post-detail1",
  components: {
    oglasiposlpocetna,
    oglasiposlpocetnaplaceni
  }
};
</script>

<style scoped>
button {
  margin-bottom: 20px;
}
</style>