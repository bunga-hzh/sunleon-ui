import { rule } from "@/util/validateRules"
import constants from "@/const/crud/salary/constants"

export const option = {
  align: "center",
  border: true,
  dialogWidth: "40%",
  menuWidth: 140,
  index: true,
  labelWidth: 120,
  addBtn: false,
  delBtn: false,
  viewBtn: true,
  searchSpan: 8,
  searchLabelWidth: 120,
  column: [
    {
      type: 'input',
      label: '姓名',
      span: 24,
      display: true,
      prop: 'xm',
      readonly: true,
      disabled: true,
      search: true,
      rules: [{
        required: true,
        message: "姓名不能为空",
        trigger: "blur"
      }],
    },
    {
      type: 'input',
      label: '工号',
      span: 24,
      display: true,
      prop: 'gh',
      readonly: true,
      disabled: true,
      search: true,
      rules: [{
        required: true,
        message: "工号不能为空",
        trigger: "blur"
      }],
    },
    {
      type: 'tree',
      label: '所属部门',
      span: 24,
      display: true,
      prop: 'deptId',
      readonly: true,
      disabled: true,
      dicUrl: 'admin/dept/tree',
      search: true,
      props: {
        label: "name",
        value: "id",
        children: "children"
      },
      rules: [{
        required: true,
        message: "所属部门不能为空",
        trigger: "blur"
      }],
    },
    {
      type: 'input',
      label: '身份证号',
      span: 24,
      display: true,
      prop: 'sfzjh',
      readonly: true,
      disabled: true,
      width: 150,
      search: true,
      rules: [{
        required: true,
        message: "身份证号不能为空",
        trigger: "blur"
      }],
    },
    {
      type: 'select',
      label: '人员类型',
      span: 24,
      display: true,
      search: true,
      props: {
        label: 'label',
        value: 'value'
      },
      cascader: ["postLevelId", "salaryLevelId", "subsidyLevelId"],
      prop: 'personType',
      dicUrl: '/admin/dict/type/sal_person_type',
      dicMethod: 'get',
      clearable: true,
      required: true,
      rules: [
        {
          required: true,
          message: '请选择人员类型'
        }
      ]
    },
    {
      type: 'select',
      label: '套用工资标示',
      cascaderItem: [],
      span: 24,
      display: true,
      props: {
        label: 'label',
        value: 'value'
      },
      prop: 'salaryMark',
      dicUrl: '/admin/dict/type/sal_salary_mark',
      dicMethod: 'get',
      clearable: true,
      required: true,
      search: true,
      rules: [
        {
          required: true,
          message: '请选择人员类型'
        }
      ]
    },
    {
      type: 'number',
      label: '岗位绩点',
      controls: true,
      span: 24,
      display: true,
      prop: 'postGpa',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      rules: [
        {
          required: true,
          message: "岗位绩点必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      type: 'select',
      label: '岗位工资等级',
      cascaderItem: [],
      span: 24,
      display: true,
      dicUrl: '/salary/salsetting/post/level/{{key}}',
      props: {
        label: 'salLevel',
        value: 'id',
      },
      prop: 'postLevelId',
      clearable: true,
      filterable: true,
      required: true,
      search: true,
      rules: [
        {
          required: true,
          message: '请选择岗位工资等级'
        }
      ]
    },
    {
      type: 'select',
      label: '薪级工资等级',
      cascaderItem: [],
      span: 24,
      display: true,
      dicUrl: '/salary/salsetting/salary/level/{{key}}',
      props: {
        label: 'salLevel',
        value: 'id',
      },
      prop: 'salaryLevelId',
      clearable: true,
      filterable: true,
      required: true,
      search: true,
      rules: [
        {
          required: true,
          message: '请选择岗位工资等级'
        }
      ]
    },
    {
      type: 'select',
      label: '岗位津贴等级',
      cascaderItem: [],
      span: 24,
      display: true,
      dicUrl: '/salary/salsetting/subsidy/level/{{key}}',
      props: {
        label: 'salLevel',
        value: 'id',
      },
      prop: 'subsidyLevelId',
      clearable: true,
      filterable: true,
      required: true,
      search: true,
      rules: [
        {
          required: true,
          message: '请选择岗位工资等级'
        }
      ]
    },
    {
      label: '薪级等级附件',
      type: 'upload',
      type: 'upload',
      limit: 1,
      fileSize: 5120,
      propsHttp: {
        url: 'url',
        name: 'originalName',
        res: 'data'
      },
      tip: '不超过5M',
      action: '/admin/sys-file/upload',
      span: 24,
      hide: true,
    }
  ],
}
