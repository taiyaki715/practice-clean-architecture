import { describe, expect, it } from "vitest";
import { Todo } from "@/domain/entities/todo";

describe("todo entity", () => {
    it("正しく作成できる。", () => {
        const id = "asdf";
        const title = "asdf";
        const todo = new Todo(id, title);

        expect(todo.id).toBe(id);
        expect(todo.title).toBe(title);
    });

    it("idが0文字の場合はthrowする。", () => {
        expect(() => new Todo("", "asdf")).toThrow();
    });

    it("タイトルが0文字の場合はthrowする。", () => {
        expect(() => new Todo("asdf", "")).toThrow();
    });
});
