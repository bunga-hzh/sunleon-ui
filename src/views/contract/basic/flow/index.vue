<template>
  <div class="execution">
    <basic-container>
        <avue-crud
          ref="crud"
          :page.sync="page"
          :data="tableData"
          :table-loading="tableLoading"
          :option="tableOption"
          @on-load="getList">
          <template slot-scope="scope" slot="menu">
            <el-button
              size="small"
              type="text"
              icon="el-icon-edit"
              @click="handleSettingUser(scope.row)"
            >设置审核人
            </el-button>
          </template>
        </avue-crud>
      <el-drawer
        :size="'100%'"
        title="设置审核人"
        :visible.sync="drawer"
        :direction="'ttb'"
        :before-close="handleClose">
        <el-row style="height: 100%;padding: 0px 30px 20px 30px;overflow: hidden" :gutter="20">
          <el-col :span="18" style="height: 100%;">
            <div style="height: 100%;">
              <div class="canvas flow-main" ref="canvas"></div>
            </div>
          </el-col>
          <el-col :span="6"  v-if=" JSON.stringify(nodeFormValue) == '{}' ? false:(nodeFormValue.type=='label' || nodeFormValue.type == 'bpmn:SequenceFlow' || nodeFormValue.type=='bpmn:ExclusiveGateway') ? false:(nodeFormValue.nodeId=='id_start' || nodeFormValue.nodeId=='id_sqrtj' || nodeFormValue.nodeId=='id_end') ? false:true">
            <el-tabs v-model="activeName" style="height: 80vh;border: 1px solid #e0e0e0;padding: 0px;" stretch>
              <el-tab-pane label="设置审核人" name="0" style="padding: 0px 20px;">
<!--                <el-form :label-position="'right'" label-width="70px" :model="nodeFormValue">-->
<!--                  <el-form-item label="" label-width="0px">-->
<!--                    <el-radio-group v-model="nodeFormValue.resource">-->
<!--                      <el-radio label="0" :value="0">指定成员</el-radio>-->
<!--                      <el-radio label="1" :value="1">部门负责人</el-radio>-->
<!--                    </el-radio-group>-->
<!--                  </el-form-item>-->

                  <div>
                    <avue-form ref="flowRule" v-model="nodeFormValue" :option="flowUserOption" @submit="handleSave">
                    </avue-form>
                  </div>

<!--                  <div style="height: 40px;"/>-->
<!--                  <el-divider content-position="left"></el-divider>-->
<!--                  <div style="margin: 20px 0px;"><span style="font-size: 14px;color: #191F25;font-family: PingFangSC-Medium;">多人审批时采用的审批方式</span></div>-->
<!--                  <el-radio-group v-model="nodeFormValue.radio">-->
<!--                    <el-radio :label="0">依次审批(按顺序依次审核)</el-radio>-->
<!--                    <br />-->
<!--                    <el-radio :label="1" style="margin: 20px 0px;">会签（须所有审批人同意）</el-radio>-->
<!--                    <br />-->
<!--                    <el-radio :label="2">或签（一名审批人同意或拒绝即可）</el-radio>-->
<!--                  </el-radio-group>-->
<!--                </el-form>-->
              </el-tab-pane>
<!--              <el-tab-pane label="多人审批方式" name="1" style="padding: 10px 30px;">-->
<!--                -->
<!--              </el-tab-pane>-->
            </el-tabs>
<!--            <el-button style="margin-top: 20px;width: 100%;" size="medium" type="primary" icon="el-icon-check" @click="handleSave">保存</el-button>-->
          </el-col>
        </el-row>



      </el-drawer>
      <el-dialog title="人员选择"
                 v-dialogDrag
                 :visible.sync="flowUserDialog"
                 class="avue-dialog avue-dialog--top"
                 width="40%">
        <span>这是一段信息</span>
        <div class="avue-dialog__footer">
          <el-button @click="flowUserDialog=false">取 消</el-button>
          <el-button @click="flowUserDialog=false" type="primary">确 定</el-button>
        </div>
      </el-dialog>
    </basic-container>
  </div>
</template>


<script>
import {tableOption} from "@/views/contract/basic/option/flowOption";
import BpmnModeler from 'bpmn-js/lib/Modeler'
import {fetchFlowList, fetchFowUser, getFLowXml, updateFlowUser} from "@/api/contract/basic/flow";

export default {
  name:'flow',
  data() {
    return {
      formData:{},
      flowUserOption:{
        submitText: '确定',
        emptyText:'取消',
        submitBtn:true,
        emptyBtn:false,
        span:24,
        column: [
          {
            label: '审核人设置',
            prop:"shr",
            multiple:true,
            remote: true,
            labelWidth:120,
            span:24,
            type:'tree',
            props:{
              label:'realName',
              value:'userName'
            },
            dicMethod:'get',
            dicUrl:`/act/resume/select/user?username={{key}}`,
            rules: [
              {
                required: true,
                message: '请选择审核人',
                trigger: 'blur'
              }
            ]
          }
        ]
      },
      activeName:'0',
      searchForm: {},
      flowUserDialog:false,
      tableData: [],
      bpmnModeler: null,
      nodeFormValue:{},//节点配置
      drawer:false,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      tableLoading: false,
      tableOption: tableOption
    }
  },
  mounted () {
  },
  watch:{
    nodeFormValue:function (val){
      // console.log(val)
    },
    bpmnModeler:function (val){
      if(val!=null){
        const eventBus = val.get('eventBus');
        // 注册节点事件，eventTypes中可以写多个事件
        const eventTypes = ['element.click', 'element.hover'];
        eventTypes.forEach((eventType) => {
          eventBus.on(eventType, (e) => {
            const {element} = e;
            if (!element.parent) return;
            if (!e || element.type === 'bpmn:Process') {
              return false;
            } else {
              if (eventType === 'element.click') {
                this.nodeFormValue = {};
                const nodeForm = {
                  type:e.element.type,
                  nodeId:e.element.id,
                  nodeName:e.element.businessObject.name
                };

                let shenArray = [];
                fetchFowUser(e.element.id).then(res=>{
                  let a = JSON.parse(res.data.data);
                  a.map(item=>{
                    shenArray.push(item.shr)
                  })

                  this.nodeFormValue = Object.assign(nodeForm,{shr:shenArray});
                })


                // this.node = element;
                // 节点点击后想要做的处理
                // 此时想要点击节点后，拿到节点实例，通过外部输入更新节点名称
                // this.currentElement = element;
              }
            }
          });
        });
      }
    }
  },
  methods:{
    handleSave(from,done) {

      this.$refs.flowRule.validate(validate=>{
        if(validate){
          let postData = this.nodeFormValue;

          let array = [];

          postData.shr.map((item)=>{
            array.push({shr:item})
          })

          postData['publicValue'] = JSON.stringify(array);
          postData['publicKey'] = postData.nodeId;

          updateFlowUser(postData).then(res=>{
            done();
            this.$notify({
              type:'success',
              message:'设置成功！'
            })
          })
        }
      })
    },
    handleClose(done) {
      this.bpmnModeler.clear();
      this.bpmnModeler.destroy();
      this.bpmnModeler.detach();
      this.bpmnModeler.off("element.click");
      this.bpmnModeler.off("element.hover");
      this.bpmnModeler = null;
      done();
    },
    createNewDiagram (xml) {
      const bpmnXmlStr = xml;
      // 将字符串转换成图显示出来
      this.bpmnModeler.importXML(bpmnXmlStr, (err) => {
        if (err) {
          console.error(err)
        }
      })
    },
    //设置审核人
    handleSettingUser(row){
      getFLowXml(row.deploymentId,row.processonDefinitionId).then(res=>{
        this.drawer = true;
        setTimeout(()=>{
            const canvas = this.$refs.canvas
            // 生成实例
            this.bpmnModeler = new BpmnModeler({
              container: canvas,
              additionalModules: [
                {
                  // 禁用左侧默认工具栏
                  paletteProvider: ['value', ''],// 去不干净，还是默认生成空白 dom
                  // // 禁用滚轮滚动
                  zoomScroll: ['value', ''],
                  // // 禁止拖动线
                  bendpoints: ['value', ''],
                  // // 禁止点击节点出现contextPad
                  contextPadProvider: ['value', ''],
                  // // 禁止双击节点出现label编辑框
                  labelEditingProvider: ['value', '']
                }]
            })
            this.createNewDiagram(res.data) // 新增流程定义
        },0)
      })
    },
    getList(page, params) {
      this.tableLoading = true
      fetchFlowList(Object.assign({
        descs: 'create_time',
        category:'合同审核',
        // category:'补充材料审核',
        current: page.currentPage,
        size: page.pageSize
      }, params, this.searchForm)).then(response => {
        this.tableData = response.data.data.records
        this.page.total = response.data.data.total
        this.tableLoading = false
      })
    },
  }
}
</script>

<style scoped>
.flow-main{
  border: 1px solid rgb(224, 224, 224);
  height: 100%;
  background-size: 20px 20px, 20px 20px, 10px 10px, 10px 10px;
  background-image: linear-gradient(to right, #dfdfdf 1px, transparent 1px), linear-gradient(to bottom, #dfdfdf 1px, transparent 1px), linear-gradient(to right, #f1f1f1 1px, transparent 1px), linear-gradient(to bottom, #f1f1f1 1px, transparent 1px);
  background-position: left -1px top -1px, left -1px top -1px, left -1px top -1px, left -1px top -1px;
}

</style>

<style>
.flow-main .bjs-powered-by {
  display: none
}
</style>
