import { UUID } from "@/core/models/uuid";

export class Todo {
    public readonly id: UUID;
    public readonly title: string;
    public readonly completed: boolean;

    /**
     * Todoを作成する
     * @param id - UUID
     * @param title - タイトル
     * @param completed - 完了しているかどうか
     * @throws {Error} - タイトルがない場合
     */
    constructor (id: UUID, title: string, completed: boolean = false) {
        if (!title) {
            throw new Error("Todoのタイトルは必須です");
        }

        this.id = id;
        this.title = title;
        this.completed = completed;
    };

    /**
     * Todoを完了する
     * @returns {Todo} - 完了したTodo
     * @throws {Error} - すでに完了している場合
     */
    public complete(): Todo {
        if (this.completed) {
            throw new Error("Todoはすでに完了しています");
        }

        return new Todo(this.id, this.title, true);
    }

    /**
     * Todoを未完了にする
     * @returns {Todo} - 未完了のTodo
     * @throws {Error} - すでに未完了の場合
     */ 
    public uncomplete(): Todo {
        if (!this.completed) {
            throw new Error("Todoは未完了です");
        }

        return new Todo(this.id, this.title, false);
    }
}
