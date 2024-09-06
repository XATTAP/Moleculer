import { ActionSchema, Context, GenericObject, Service } from "moleculer";
import { queryToPostgres } from "../db";

export const create: ActionSchema = {
    params: {
        name: { type: "string" },
    },
    async handler(this: Service, ctx: Context<GenericObject>) {
        const result = await queryToPostgres({
            text: 'INSERT INTO users(name) VALUES($1)',
            values: [ctx.params.name],
          })
        return result;
    },
}

export const update: ActionSchema = {
    params: {
        name: { type: "string" },
        userId: { type: "number" },
    },
    async handler(this: Service, ctx: Context<GenericObject>) {
        const result = await queryToPostgres({
            text: 'UPDATE users SET name = $1 WHERE id = $2',
            values: [ctx.params.name, ctx.params.userId],
          })
        return result;
    },
}

export const list: ActionSchema = {
    async handler(this: Service) {
        const result = await queryToPostgres({
            text: "SELECT * FROM users",
        })
        return result;
    },
}

export const destroy: ActionSchema = {
    async handler(this: Service, ctx: Context<GenericObject>) {
        const result = await queryToPostgres({
            text: "DELETE FROM users WHERE id = $1",
            values: [ctx.params.userId]
        })
        return result;
    },
}