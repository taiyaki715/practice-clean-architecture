import { Todo } from "@/core/models/todo";

export interface TodoRepositoryInterface {
    getAll(): Promise<Todo[]>;
    getById(id: string): Promise<Todo | undefined>;
    create(todo: Todo): Promise<void>;
    update(id: string, updates: Partial<Todo>): Promise<void>;
    delete(id: string): Promise<void>;
}
