import { ActionSchema, Context, GenericObject, Service } from "moleculer";
import { queryToPostgres } from "../db";

export const create: ActionSchema = {
    params: {
        name: { type: "string" },
    },
    async handler(this: Service, ctx: Context<GenericObject>) {
        const result = await queryToPostgres({
            text: 'INSERT INTO tasks(text) VALUES($1)',
            values: [ctx.params.name],
          })
        return result;
    },
}

export const update: ActionSchema = {
    params: {
        name: { type: "string" },
        taskId: { type: "number" },
    },
    async handler(this: Service, ctx: Context<GenericObject>) {
        const result = await queryToPostgres({
            text: 'UPDATE tasks SET text = $1 WHERE id = $2',
            values: [ctx.params.name, ctx.params.taskId],
          })
        return result;
    },
}

export const list: ActionSchema = {
    async handler(this: Service) {
        const result = await queryToPostgres({
            text: "SELECT * FROM tasks",
        })
        return result;
    },
}

export const destroy: ActionSchema = {
    params: {
        taskId: { type: "number" },
    },
    async handler(this: Service, ctx: Context<GenericObject>) {
        const result = await queryToPostgres({
            text: "DELETE FROM tasks WHERE id = $1",
            values: [ctx.params.taskId]
        })
        return result;
    },
}