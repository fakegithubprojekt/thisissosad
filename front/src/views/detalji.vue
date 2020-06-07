<template>
  <div>
    <div v-if="z">
      <placenioglasi :z="z" :showcomments="true" />
    </div>
    <div v-if="g">
      <oglasi420 :g="g" :showcomments1="true" />
    </div>
  </div>
</template>

<script>
import placenioglasi from "@/components/placenioglasi.vue";
import oglasi420 from "@/components/oglasi420.vue";
import store from "@/store.js";
import { Posts } from "@/services";

export default {
  props: ["id"],
  data() {
    return {
      z: null,
      g: null
    };
  },
  async mounted() {
    console.log(this.id);
    this.z = await Posts.getOne(this.id);
    this.g = await Posts.getOne(this.id);
  },
  name: "post-detail",
  components: {
    placenioglasi,
    oglasi420
  }
};
</script>

<style scoped>
button {
  margin-bottom: 20px;
}
</style>