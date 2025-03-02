export class Todo {
    public readonly id: string;
    public readonly title: string;
    public readonly completed: boolean;

    constructor (id: string, title: string, completed: boolean = false) {
        if (!id) {
            throw new Error();
        }

        if (!title) {
            throw new Error();
        }

        this.id = id;
        this.title = title;
        this.completed = completed;
    };
}
