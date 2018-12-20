<template>
  <div class="container">
    <span class="sale_rate">
          <span class="sale_progress" :style="'width:'+Number(percent).toFixed(2)*100+'%'"></span>
          <!-- <span class="residue"></span> -->
    </span>
    <span class="waitsale">{{Math.round(percent*100)+'%'}}</span>
  </div>
</template>
<script>
export default {
  data(){
    return{
    }
  },
  props:['percent']
};
</script>
<style lang="less">
* {
  margin: 0, 0;
  padding: 0, 0;
  box-sizing: border-box;
}

.container{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  .sale_rate {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 2.78rem;
  height: 0.39rem;
  line-height: 0.39rem;
  font-size: 0.15rem;
//   border: 1px solid red;
  background: rgba(220, 220, 220, 1);
  border-radius: 0.195rem;
  .sale_progress {
    box-sizing: border-box;
    display: inline-block;
    min-width: 0.3rem;
    font-size: 0.15rem;
    height: 100%;
    background: linear-gradient(
      -90deg,
      rgba(254, 147, 44, 1),
      rgba(244, 153, 38, 1),
      rgba(254, 202, 63, 1)
    );
    border-radius: 0.195rem;
  }
    // .residue {
    //   box-sizing: border-box;
    //   display: inline-block;
    //   // border: 1px salmon solid;
    //   width: 0.65rem;
    //   height: 0.39rem;
    //   line-height: 0.39rem;
    //   margin-right: 5px;
    //   z-index: 20;
    //   font-size: 0.15rem;
    //   font-family: SourceHanSansCN-Regular;
    //   font-weight: 400;
    //   background-color: transparent;
    //   color: rgba(255, 255, 255, 1);
    // }
  }
  .waitsale{
    width: 8px;
    height: 0.39rem;
    line-height: 0.39rem;
    font-size: 0.15rem;
  }

}





</style>


