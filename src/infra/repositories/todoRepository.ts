import { TodoRepositoryInterface } from "@/core/repositories/todoRepositoryInterface";
import { Todo } from "@/core/models/todo";
import { todos } from "@/infra/db/schema";
import { UUID } from "@/core/models/uuid";
import { eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export class TodoRepository implements TodoRepositoryInterface {
    constructor(private readonly db: PostgresJsDatabase) {}

    async getAll(): Promise<Todo[]> {
        const rawTodos = await this.db.select().from(todos);
        return rawTodos.map(rawTodo => new Todo(new UUID(rawTodo.id), rawTodo.title, rawTodo.completed));
    }

    async getById(id: string): Promise<Todo | undefined> {
        const rawTodos = await this.db.select().from(todos).where(eq(todos.id, id));
        const todo = rawTodos[0];
        if (!todo) {
            return undefined;
        }
        return new Todo(new UUID(todo.id), todo.title, todo.completed);
    }

    async create(todo: Todo): Promise<Todo> {
        const rawTodo = await this.db.insert(todos).values({
            id: todo.id.toString(),
            title: todo.title,
            completed: todo.completed
        }).returning();

        return new Todo(new UUID(rawTodo[0].id), rawTodo[0].title, rawTodo[0].completed);
    }

    async update(id: string, updates: Partial<Todo>): Promise<Todo> {
        const updateData: Partial<{ title: string; completed: boolean }> = {};
        
        if (updates.title !== undefined) {
            updateData.title = updates.title;
        }
        
        if (updates.completed !== undefined) {
            updateData.completed = updates.completed;
        }
        
        const rawTodo = await this.db
            .update(todos)
            .set(updateData)
            .where(eq(todos.id, id))
            .returning();
            
        return new Todo(new UUID(rawTodo[0].id), rawTodo[0].title, rawTodo[0].completed);
    }

    async delete(id: string): Promise<void> {
        await this.db.delete(todos).where(eq(todos.id, id));
    }
}
