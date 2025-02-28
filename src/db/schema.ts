import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

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
    status: uuid().notNull().references(() => todoStatuses.id),
});

export const todosRelations = relations(todos, ({ one }) => ({
    todoStatus: one(todoStatuses, {
        fields: [todos.status],
        references: [todoStatuses.id],
    }),
}));
