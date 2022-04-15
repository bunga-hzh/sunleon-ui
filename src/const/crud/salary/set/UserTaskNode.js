import {
  RectNode,
  RectNodeModel
} from "@logicflow/core";

class UserTaskModel extends RectNodeModel {}

class UserTaskView extends RectNode {}

export default {
  type: "UserTask",
  view: UserTaskView,
  model: UserTaskModel
};
