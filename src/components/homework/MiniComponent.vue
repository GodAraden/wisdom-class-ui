<template>
  <div class="mini-container">
    <img :src="img" :alt="text" />
    <p>{{ text }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  img: String,
  text: String,
})
</script>

<style lang="less" scoped>
@container: 11vh;
@img: @container - 2.4vh;
.mini-container {
  display: inline-block;
  width: @container;
  height: @container;
  margin: 0 9px 12px 0;
  overflow: hidden;
  user-select: none;
  > img {
    width: @container;
    height: @img;
  }
  > p {
    text-align: center;
    font-size: 12px;
  }
  :hover {
    cursor: pointer;
  }
}
</style>
