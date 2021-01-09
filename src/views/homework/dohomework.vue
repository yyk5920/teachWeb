<template>
  <div class="dndList">
    <div :style="{width:width1}" class="dndList-list">
      <h3>{{ unfinishedlistTitle }}</h3>
      <div class="dragArea">
        <div v-for="element in unfinishedlist" :key="element.id" class="list-complete-item">
          <div
            class="list-complete-item-handle"
          >{{ element.id }}[{{ element.author }}] {{ element.title }}</div>
          <div style="position:absolute;right:0px;">
            <span style="float: right;margin-top: -20px;margin-right:5px;" @click="detail(element)">
              <i style="color:#ff4949" class="el-icon-edit-outline" />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div :style="{width:width2}" class="dndList-list">
      <h3>{{ finishedlistTitle }}</h3>
      <div class="dragArea">
        <div v-for="element in finishedlist" :key="element.id" class="list-complete-item">
          <div
            class="list-complete-item-handle2"
            @click="pushEle(element)"
          >{{ element.id }} [{{ element.author }}] {{ element.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DndList",
  props: {
    unfinishedlist: {
      type: Array,
      default() {
        return [];
      }
    },
    finishedlist: {
      type: Array,
      default() {
        return [];
      }
    },
    unfinishedlistTitle: {
      type: String,
      default: "待完成"
    },
    finishedlistTitle: {
      type: String,
      default: "已完成"
    },
    width1: {
      type: String,
      default: "48%"
    },
    width2: {
      type: String,
      default: "48%"
    }
  },
  methods: {
    isNotInList1(v) {
      return this.unfinishedlist.every(k => v.id !== k.id);
    },
    isNotInList2(v) {
      return this.finishedlist.every(k => v.id !== k.id);
    },
    deleteEle(ele) {
      for (const item of this.unfinishedlist) {
        if (item.id === ele.id) {
          const index = this.unfinishedlist.indexOf(item);
          this.unfinishedlist.splice(index, 1);
          break;
        }
      }
      if (this.isNotInList2(ele)) {
        this.unfinishedlist.unshift(ele);
      }
    },
    pushEle(ele) {
      for (const item of this.finishedlist) {
        if (item.id === ele.id) {
          const index = this.finishedlist.indexOf(item);
          this.finishedlist.splice(index, 1);
          break;
        }
      }
      if (this.isNotInList1(ele)) {
        this.unfinishedlist.push(ele);
      }
    },
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData("Text", "");
    },
    detail(ele) {}
  }
};
</script>

<style lang="scss" scoped>
.dndList {
  background: #fff;
  padding-bottom: 40px;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  .dndList-list {
    float: left;
    padding-bottom: 30px;
    &:first-of-type {
      margin-right: 2%;
    }
    .dragArea {
      margin-top: 15px;
      min-height: 50px;
      padding-bottom: 30px;
    }
  }
}

.list-complete-item {
  cursor: pointer;
  position: relative;
  font-size: 14px;
  padding: 5px 12px;
  margin-top: 4px;
  border: 1px solid #bfcbd9;
  transition: all 1s;
}

.list-complete-item-handle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 50px;
}

.list-complete-item-handle2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 20px;
}

.list-complete-item.sortable-chosen {
  background: #4ab7bd;
}

.list-complete-item.sortable-ghost {
  background: #30b08f;
}

.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}
</style>
