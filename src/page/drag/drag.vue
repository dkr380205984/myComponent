<template>
  <div class="drag">
    <div class="column">
      <div class="row" @drop="drop" @dragover="allowDrop">
        <div class="dragCtn">
          <div draggable="true" class="draged" @dragstart="drag" id="1">拖拽元素1</div>
          <div draggable="true" class="draged" @dragstart="drag" id="2">拖拽元素2</div>
        </div>
        <div class="dragCtn">
          <div draggable="true" class="draged" @dragstart="drag" id="3">拖拽元素3</div>
        </div>
      </div>
      <div class="row" @drop="drop" @dragover="allowDrop">
        <div class="dragCtn"></div>
        <div class="dragCtn">
           <div draggable="true" class="draged" @dragstart="drag" id="4">拖拽元素4</div>
        </div>
      </div>
      <div class="row" @drop="drop" @dragover="allowDrop">
        <div class="dragCtn">
          <div draggable="true" class="draged2" @dragstart="drag" id="5">拖拽元素5</div>
        </div>
        <div class="dragCtn">
          <div draggable="true" class="draged3" @dragstart="drag" id="6">拖拽元素6</div>
        </div>
      </div>
      <div class="row" @drop="drop" @dragover="allowDrop">
        <div class="dragCtn">
          <div draggable="true" class="draged4" @dragstart="drag" id="7">拖拽元素7</div>
        </div>
        <div class="dragCtn">
          <div draggable="true" class="draged4" @dragstart="drag" id="8">拖拽元素8</div>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="row" @drop="drop" @dragover="allowDrop">
        <div class="dragCtn">
          <div draggable="true" class="draged3" @dragstart="drag" id="9">拖拽元素9</div>
        </div>
        <div class="dragCtn"></div>
      </div>
      <div class="row" @drop="drop" @dragover="allowDrop">
        <div class="dragCtn"></div>
        <div class="dragCtn"></div>
      </div>
      <div class="row" @drop="drop" @dragover="allowDrop">
        <div class="dragCtn"></div>
        <div class="dragCtn"></div>
      </div>
      <div class="row" @drop="drop" @dragover="allowDrop">
        <div class="dragCtn"></div>
        <div class="dragCtn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    allowDrop (ev) {
      ev.preventDefault()
    },
    drag (ev) {
      ev.dataTransfer.setData('Text', ev.target.id)
    },
    drop (ev) {
      ev.preventDefault()
      console.log(ev.target.className)
      if (ev.target.className === 'dragCtn') {
        let data = ev.dataTransfer.getData('Text')
        ev.target.appendChild(document.getElementById(data))
      }
    }
  }
}
</script>

<style lang="less">
.drag{
  .column{
    width: 520px;
    display: inline-block;
    vertical-align: text-top;
    .row{
      min-height: 120px;
      margin: auto;
      overflow: hidden;
      background: rgba(0,0,0,0.4);
      .dragCtn{
        width: 240px;
        min-height: 120px;
        background: blue;
        margin: 10px;
        float: left;
        margin-bottom: -9999px;
        padding-bottom: 9999px;
      }
      .draged{
        width: 100px;
        height: 100px;
        background: yellowgreen;
        margin: 10px;
        float: left;
      }
      .draged2{
        width: 220px;
        height: 220px;
        background: rgb(177, 101, 97);
        margin: 10px;
        float: left;
      }
      .draged3{
        width: 100px;
        height: 220px;
        background: rgb(192, 121, 15);
        margin: 10px;
        float: left;
      }
      .draged4{
        width: 220px;
        height: 100px;
        background: rgb(60, 39, 177);
        margin: 10px;
        float: left;
      }
    }
  }
}
</style>
