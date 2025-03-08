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
        return new Todo(this.id, this.title, true);
    }

    public uncomplete(): Todo {
        return new Todo(this.id, this.title, false);
    }
}
