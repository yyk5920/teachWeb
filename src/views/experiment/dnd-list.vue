<template>
  <div class="components-container" style="text-align: left">
    <aside>实验情况统计</aside>
    <div class="editor-container">
      <dnd-list
        :unfinishedlist="unfinishedlist"
        :finishedlist="finishedlist"
        @dohomework="dohomework"
        finishedlist-title="已完成"
        unfinishedlist-title="待完成"
      />
    </div>
    <div v-if="show">
      <do-exercise
        :missionlist="missionlist"
        @dohomework="dohomework"
        :mission-title="missionTitle"
      ></do-exercise>
    </div>
  </div>
</template>

<script>
import DndList from "@/components/DndList";
import { fetchList } from "@/api/article";
import { fetchunfinishedList } from "@/api/exercise_s";
import { fetchfinishedList } from "@/api/exercise_s";
import { fetchExperiment } from "@/api/exercise_s";
import DoExercise from "./doexercise";
import { mapState } from "vuex";

export default {
  name: "DndListDemo",
  components: { DndList, DoExercise },
  data() {
    return {
      show: false,
      missionTitle: "",
      unfinishedlist: [],
      finishedlist: [],
      missionlist: [],
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapState("user", ["id"]),
  },
  methods: {
    getData() {
      this.listLoading = true;
      fetchunfinishedList({
        type: 0,
        id: 1,
      }).then((response) => {
        this.unfinishedlist = response.data.items.splice(0, 5);
      });
      fetchfinishedList({
        type: 0,
        id: 1,
      }).then((response) => {
        this.finishedlist = response.data.items.splice(0, 5);
      });
    },
    dohomework(title) {
      console.log("dohomework", title);
      this.missionTitle = title;
      fetchExperiment({
        id: 0, //实验id
        username: this.id,
      }).then((response) => {
        console.log(typeof response.data);
        console.log(response.data);
        // var lists =Object.values(response.data);
        var lists = response.data;
        this.missionlist = lists;
        // console.log(this.missionlist);
      });
      this.show = true;
    },
  },
};
</script>

