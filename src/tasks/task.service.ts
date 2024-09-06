import { ServiceSchema } from "moleculer";
import { create, destroy, list, update } from "./task.action";

const TasksService: ServiceSchema = {
    name: "tasks",
    actions: {
        create: create,
        list: list,
        update: update,
        destroy: destroy
    }
};

export default TasksService;