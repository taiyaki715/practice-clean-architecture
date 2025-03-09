import { Todo } from "@/core/models/todo";

export interface TodoRepositoryInterface {
    /**
     * すべてのTodoを取得する
     * @returns {Promise<Todo[]>} - すべてのTodo
     */
    getAll(): Promise<Todo[]>;

    /**
     * 指定されたIDのTodoを取得する
     * @param id - TodoのID
     * @returns {Promise<Todo | undefined>} - 指定されたIDのTodo
     */
    getById(id: string): Promise<Todo | undefined>;

    /**
     * 新しいTodoを作成する
     * @param todo - 新しいTodo
     * @returns {Promise<Todo>} - 作成されたTodo
     */
    create(todo: Todo): Promise<Todo>;

    /**
     * 指定されたIDのTodoを更新する
     * @param id - TodoのID
     * @param updates - 更新する内容
     * @returns {Promise<Todo>} - 更新されたTodo
     */
    update(id: string, updates: Partial<Todo>): Promise<Todo>;

    /**
     * 指定されたIDのTodoを削除する
     * @param id - TodoのID
     */
    delete(id: string): Promise<void>;
}
