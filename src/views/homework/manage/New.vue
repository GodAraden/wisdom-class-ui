<template>
  <a-layout class="data-view">
    <a-layout-sider>
      <a-collapse v-model:activeKey="activeKey" :ghost="true">
        <a-collapse-panel
          v-for="item in components"
          :key="item.key"
          :header="item.header"
          :collapsible="item.collapsible"
        >
          <mini-component
            v-for="component in item.components"
            :key="component.type"
            :img="component.img"
            :text="component.text"
            @click="appendComponent(component.type)"
          >
          </mini-component>
        </a-collapse-panel>
      </a-collapse>
    </a-layout-sider>
    <a-layout-content class="edit-container">
      <div class="edit-view">
        <a-empty
          v-if="questionnaire.length === 0"
          description="暂无题目，请在左边点击选择组件后编辑"
        />
        <div v-else class="questionnaire">
          <div
            v-for="(question, index) in questionnaire"
            :key="question.key"
            class="question"
          >
            <!-- 每个问题的标题等头部信息 -->
            <a-row>
              <a-col :span="1"> {{ index + 1 }}. </a-col>
              <a-col :span="14">
                <a-input
                  size="small"
                  v-model:value="question.title"
                  placeholder="在这里输入问题的标题"
                />
              </a-col>
              <a-col :span="1"></a-col>
              <a-col :span="3">
                <a-checkbox v-model:checked="question.required"
                  >必填
                </a-checkbox>
              </a-col>
              <a-col :span="2"></a-col>
              <a-col class="icon-btn" :span="1" @click="upQuestion(index)">
                <arrow-up-outlined />
              </a-col>
              <a-col class="icon-btn" :span="1" @click="downQuestion(index)">
                <arrow-down-outlined />
              </a-col>
              <a-col
                class="icon-btn"
                :span="1"
                @click="deleteQuestion(question.key)"
              >
                <delete-outlined />
              </a-col>
            </a-row>

            <!-- 每个问题的细节 -->
            <template v-if="question.type <= 3">
              <a-row
                v-for="(item, opIndex) in question.options"
                :key="item.key"
              >
                <a-col :span="1"> </a-col>
                <a-col :span="1">
                  <a-radio v-if="question.type === 1" disabled />
                  <a-checkbox
                    v-else-if="question.type === 2"
                    disabled
                  ></a-checkbox>
                  <unordered-list-outlined v-else />
                </a-col>
                <a-col :span="9">
                  <a-input
                    size="small"
                    style="width: 100%"
                    v-model:value="item.label"
                    placeholder="在这里输入选项内容"
                  />
                </a-col>
                <a-col :span="1"> </a-col>
                <a-col
                  class="icon-btn"
                  :span="1"
                  @click="upOption(question, opIndex)"
                  ><up-square-outlined
                /></a-col>
                <a-col
                  class="icon-btn"
                  :span="1"
                  @click="downOption(question, opIndex)"
                  ><down-square-outlined
                /></a-col>
                <a-col
                  class="icon-btn"
                  :span="1"
                  @click="deleteOption(question, opIndex)"
                  ><delete-outlined
                /></a-col>
              </a-row>
              <a-row>
                <a-col :span="1"></a-col>
                <a-col :span="14">
                  <a-button
                    type="dashed"
                    style="width: 100%"
                    @click="addOption(question)"
                  >
                    <PlusOutlined />
                    Add field
                  </a-button>
                </a-col>
              </a-row>
            </template>
            <template v-else-if="question.type <= 5">
              <a-row>
                <a-col :span="1"> </a-col>
                <a-col :span="10">
                  <a-input
                    size="small"
                    style="width: 100%"
                    v-model:value="question.placeholder"
                    placeholder="在这里输入输入框的占位符"
                  />
                </a-col>
              </a-row>
            </template>
            <a-divider orientation="right" style="font-size: 14px">
              题型：{{ question.typeToText() }}
            </a-divider>
          </div>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { homeworkComponents as components } from '@/utils/staticdata.js'
import MiniComponent from '@/components/homework/MiniComponent.vue'
import { FormComponent } from '@/utils/homework.js'
import { message } from 'ant-design-vue'
import { watch } from '@vue/runtime-core'
FormComponent._index = 1

const props = defineProps({ questionnaire: Array })
const emits = defineEmits(['update:questionnaire'])
const activeKey = ref([1, 2, 3])
const questionnaire = ref(props.questionnaire)
const appendComponent = (type) => {
  questionnaire.value.push(new FormComponent(type))
}
const addOption = (question) => {
  question.options.push({ label: '' })
}
const deleteQuestion = (key) => {
  questionnaire.value = questionnaire.value.filter((v) => v.key !== key)
}
const upQuestion = (index) => {
  if (index === 0) {
    message.warn('该问题已经排在第一位')
    return
  }
  ;[questionnaire.value[index - 1], questionnaire.value[index]] = [
    questionnaire.value[index],
    questionnaire.value[index - 1],
  ]
}
const downQuestion = (index) => {
  if (index + 1 === questionnaire.value.length) {
    message.warn('该问题已经排在最后一位')
    return
  }
  ;[questionnaire.value[index + 1], questionnaire.value[index]] = [
    questionnaire.value[index],
    questionnaire.value[index + 1],
  ]
}
const deleteOption = (question, index) => {
  question.options = question.options.filter((v, i) => i !== index)
}
const upOption = (question, index) => {
  if (index === 0) {
    message.warn('该选项已经排在第一位')
    return
  }
  ;[question.options[index - 1], question.options[index]] = [
    question.options[index],
    question.options[index - 1],
  ]
}
const downOption = (question, index) => {
  if (index + 1 === question.options.length) {
    message.warn('该选项已经排在最后一位')
    return
  }
  ;[question.options[index + 1], question.options[index]] = [
    question.options[index],
    question.options[index + 1],
  ]
}
watch(
  questionnaire,
  () => {
    emits('update:questionnaire', questionnaire.value)
  },
  {
    deep: true,
  }
)
</script>

<style lang="less" scoped>
.ant-layout {
  height: 100%;
  background-color: #fff;
  .ant-layout-sider {
    width: 200px;
    background-color: #fff;
    overflow-y: scroll;
    border-right: 2px solid #fafafa;
  }
  .edit-container {
    padding: 16px;
  }
  .edit-view {
    width: 100%;
    height: 100%;
    border: 1.6px dashed #ddd;
    padding: 4px 8vh;
    background-color: #fafafa;
    box-sizing: border-box;
    overflow-y: scroll;
    .ant-empty {
      margin-top: 12vh;
      color: #aeb8c2;
    }
    .questionnaire {
      background-color: #fff;
      padding: 4px;
      .question {
        margin-bottom: 12px;
      }
      .ant-row {
        margin-bottom: 6px;
      }
      .icon-btn {
        cursor: pointer;
        :hover {
          background-color: rgba(238, 238, 238, 0.9);
        }
      }
    }
  }
}
</style>
