import { db } from "@/infra/db/index";
import { todos } from "@/infra/db/schema";
import { Todo } from "@/core/models/todo";
import { TodoRepositoryInterface } from "@/core/repositories/todoRepositoryInterface";
import { eq } from "drizzle-orm";

export class TodoRepository implements TodoRepositoryInterface {
    async getAll(): Promise<Todo[]> {
        const todoRecords = await db
            .select()
            .from(todos);
        
        return todoRecords.map((record) => ({
            id: record.id,
            title: record.title,
            completed: record.completed,
        }));
    }

    async getById(id: string): Promise<Todo | undefined> {
        const todoRecord = (await db
            .select()
            .from(todos)
            .where(eq(todos.id, id)))[0];
        
        if (!todoRecord) {
            return undefined;
        }

        return {
            id: todoRecord.id,
            title: todoRecord.title,
            completed: todoRecord.completed,
        };
    }

    async create(todo: Todo): Promise<void> {
        await db.insert(todos).values({
            id: todo.id,
            title: todo.title,
            completed: todo.completed,
        });
    }

    async update(id: string, updates: Partial<Todo>): Promise<void> {
        await db
            .update(todos)
            .set({
                title: updates.title,
                completed: updates.completed,
            })
            .where(eq(todos.id, id));
    }

    async delete(id: string): Promise<void> {
        await db
            .delete(todos)
            .where(eq(todos.id, id));
    }
}
