<template>
  <div class="big-btn-container">
    <div class="big-btn-icon">
      <slot name="icon">123</slot>
    </div>
    <div class="big-btn-description">
      <slot name="description">description</slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.big-btn-container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 36vh;
  height: 36vh;
  background-color: rgba(9, 133, 249, 0.03);
  color: rgb(9, 133, 249);
  border-radius: 3vh;
  transition: background-color 0.24s linear;
  > div {
    text-align: center;
  }
  > .big-btn-icon {
    flex: 3;
    font-size: 18vh;
  }
  > .big-btn-description {
    flex: 1;
  }
}
.big-btn-container:hover {
  background-color: rgba(9, 133, 249, 0.06);
  cursor: pointer;
}
</style>
