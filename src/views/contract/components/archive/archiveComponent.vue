<template>
  <el-dialog
    :visible.sync="open"
    width="70%"
    class="dialog-archive"
    append-to-body
    title="合同归档"
  >
    <avue-form ref="form" v-model="formData" :option="archiveOption" @submit="submit">
    </avue-form>
  </el-dialog>
</template>


<script>
import {putArchive} from "@/api/contract/admin/admin";

export default {
  name:'archiveView',
  data(){
    return{
      open:false,
      propsData:{}, //数据
      formData:{},
      archiveOption:{
        size:'small',
        gutter:80,
        column: [
          {
            label: '归档编号',
            prop:'gdbh',
            span:24
          },
          {
            label: '归档名称',
            prop:'gdmc',
            span:24
          },
          {
            label: '备注',
            prop:'bz',
            span:24,
            type:'textarea',
            minRows:10,
            maxlength:200,
            showWordLimit:true
          },
          {
            label: '附件',
            prop:'fj',
            span:24,
            type:'upload',
            dragFile: true,
            loadText: '附件上传中，请稍等',
            tip: '最大20MB/个',
            action:'/admin/sys-file/upload',
            propsHttp: {
              url:'url',
              name:'originalName',
              res: 'data'
            }
          },
        ]
      }
    }
  },
  methods:{
    show(row,index){
      this.propsData = row;
      this.open = true;
      this.formData = {
        gdbh:row.htbh+'_gd',
        gdmc:row.htmc
      };
    },
    submit(data,done){
      data['htglId'] = this.propsData.id;
      data['fj'] = JSON.stringify(data['fj']);
      putArchive(data).then(res=>{
        console.log(res);
      })
    },
  }
}
</script>
