import { relations } from "drizzle-orm";
import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const todoStatuses = pgTable("todo_statuses", {
    id: uuid().primaryKey().defaultRandom(),
    title: text().notNull(),
});

export const todoStatusesRelations = relations(todoStatuses, ({ many }) => ({
    todos: many(todos),
}));

export const todos = pgTable("todos", {
    id: uuid().primaryKey().defaultRandom(),
    title: text().notNull(),
    completed: boolean().notNull().default(false),
});

export const todosRelations = relations(todos, ({ one }) => ({
    todoStatus: one(todoStatuses, {
        fields: [todos.completed],
        references: [todoStatuses.id],
    }),
}));
