import { ServiceSchema } from "moleculer";
import { create, destroy, list, update } from "./user.action";

const UserService: ServiceSchema = {
    name: "users",
    actions: {
        create: create,
        list: list,
        update: update,
        destroy: destroy
    }
};

export default UserService;