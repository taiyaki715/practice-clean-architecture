import { UUID } from "./uuid";

export class Todo {
    public readonly id: UUID;
    public readonly title: string;
    public readonly completed: boolean;

    constructor (id: UUID, title: string, completed: boolean = false) {
        if (!title) {
            throw new Error("Todoのタイトルは必須です");
        }

        this.id = id;
        this.title = title;
        this.completed = completed;
    };

    public complete(): Todo {
        if (this.completed) {
            throw new Error("Todoはすでに完了しています");
        }

        return new Todo(this.id, this.title, true);
    }

    public uncomplete(): Todo {
        if (!this.completed) {
            throw new Error("Todoは未完了です");
        }

        return new Todo(this.id, this.title, false);
    }
}
