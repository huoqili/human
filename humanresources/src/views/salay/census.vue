<template>
  <div class="salat-census">
      <el-row>
        <el-col :span="14"><div id="line"></div></el-col>
        <el-col :span="10"><div id="bar"></div></el-col>
      </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent,onMounted, ref } from 'vue'
import { handlerSalayEcharts } from '../../http/salay'
import * as echarts from 'echarts'
import { BarTable } from '../../type/salay'
import { SUCCESS } from '@/config'
import { ElMessage } from 'element-plus'
export default defineComponent({
   setup() {
       let namesArr = [] as any;
       let valuesArr = [] as any;
       let barTable = ref<BarTable>();
       let initLine = () => {
           let lineChart = echarts.init(document.getElementById('line') as any,'dark');
           let option = {
               tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: namesArr,
                axisLabel: {
                    rotate: 40
                }
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                data: valuesArr,
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
                }
            ]
            };
           lineChart.setOption(option);
       }

       let initBar = () => {
           let barChart = echarts.init(document.getElementById('bar') as any,'dark');
           let option = {
            title: {
                text: 'salay of total',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: barTable.value,
                emphasis: {
                    itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                    }
                }
            ]
            };
            barChart.setOption(option);
       }
       onMounted(() => {
           handlerSalayEcharts().then(res => {
               if(res.data.code === SUCCESS) {
                   let datas = res.data.data as any;
                   let values = Object.values(datas[0]);
                   let names = ['基本薪资','加班薪资','奖金','补贴','考勤扣款','五险一金代扣','个税代扣','实发薪资'];
                   namesArr = names;
                   valuesArr = values;
                   let arr = [];
                   for(let i = 0; i < names.length; i++) {
                       let obj = {} as any;
                       obj.name = names[i];
                       obj.value = values[i];
                       arr.push(obj);
                   }
                   barTable.value = arr as any ;
                    initLine();
                    initBar();
               }else{
                   ElMessage.warning(res.data.msg);
               }
           }).catch(err => {
               console.log(err);
           })
          
       });
       return {
           barTable
       }
   }
})
</script>


<style>
    #line, #bar {
        height: 450px;
    }
</style>