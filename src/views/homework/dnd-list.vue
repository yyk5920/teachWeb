<template>
  <div class="components-container" style="text-align: left">
    <aside>
      作业情况统计
      <!-- <a
        href="https://github.com/SortableJS/Vue.Draggable"
        target="_blank"
      >Vue.Draggable</a>-->
    </aside>
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
      <do-homework></do-homework>
    </div>
  </div>
</template>

<script>
import DndList from "@/components/DndList";
import { fetchList } from "@/api/article";
import { fetchunfinishedList } from "@/api/exercise_s";
import { fetchfinishedList } from "@/api/exercise_s";
import DoHomework from "./dohomework";

export default {
  name: "DndListDemo",
  components: { DndList, DoHomework },
  data() {
    return {
      show: false,
      unfinishedlist: [],
      finishedlist: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.listLoading = true;
      fetchunfinishedList({
        id: 1,
        type: 1
      }).then(response => {
        this.unfinishedlist = response.data.items.splice(0, 5);
      });
      fetchfinishedList({
        id: 1
      }).then(response => {
        this.finishedlist = response.data.items.splice(0, 5);
      });
    },
    dohomework() {
      console.log("dohomework");
      this.show = true;
    }
  }
};
</script>

