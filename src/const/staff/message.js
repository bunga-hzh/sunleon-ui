import {
  message
} from '@/const/staff/dictItems'

export function result($this, res, type, cb) {
  if (res.code !== 0) {
    $this.$message.error(message[type] + '失败！')
    cb()
    return false
  }
  $this.$message.success(message[type] + '成功！')
  return true
}
