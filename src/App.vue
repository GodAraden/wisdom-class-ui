<template>
  <router-view></router-view>
</template>

<script setup></script>

<style lang="less">
.ant-input-prefix {
  color: #ddd;
  font-weight: 700;
}
.tips-page-bg {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
textarea {
  resize: none !important;
}

.view-bg {
  display: flex;
  flex-direction: column;
  height: 100%;
  .data-view {
    flex: 1;
    overflow-y: scroll;
  }
  .funcbar {
    margin: 10px;
    > *:first-child {
      float: left;
      > button {
        margin-right: 8px;
      }
    }
    > *:last-child {
      float: right;
    }
  }
}
</style>
