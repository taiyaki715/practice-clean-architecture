import { describe, expect, it } from "vitest";
import { Todo } from "@/core/models/todo";
import { UUID } from "@/core/models/uuid";

describe("[Entity] Todo", () => {
    const validId = UUID.generate();
    const validTitle = "買い物に行く";

    describe("正常系", () => {
        it("有効なIDとタイトルで正しくインスタンス化できる", () => {
            const todo = new Todo(validId, validTitle);
            
            expect(todo.id).toBe(validId);
            expect(todo.title).toBe(validTitle);
        });

        it("デフォルトでは未完了状態である", () => {
            const todo = new Todo(validId, validTitle);
            expect(todo.completed).toBe(false);
        });

        it("complete()メソッドで完了状態のTodoを返す", () => {
            const todo = new Todo(validId, validTitle);
            const completedTodo = todo.complete();
            
            expect(completedTodo.id).toBe(validId);
            expect(completedTodo.title).toBe(validTitle);
            expect(completedTodo.completed).toBe(true);
            expect(todo.completed).toBe(false);
        });

        it("uncomplete()メソッドで未完了状態のTodoを返す", () => {
            const todo = new Todo(validId, validTitle, true);
            const uncompletedTodo = todo.uncomplete();
            
            expect(uncompletedTodo.id).toBe(validId);
            expect(uncompletedTodo.title).toBe(validTitle);
            expect(uncompletedTodo.completed).toBe(false);
            expect(todo.completed).toBe(true);
        });
    });

    describe("異常系", () => {
        it("タイトルが空文字の場合はエラーをスローする", () => {
            expect(() => new Todo(validId, ""))
                .toThrow("Todoのタイトルは必須です");
        });

        it("完了済のTodoは完了操作できない", () => {
            const todo = new Todo(validId, validTitle, true);
            expect(() => todo.complete())
                .toThrow("Todoはすでに完了しています");
        });

        it("未完了のTodoは未完了操作できない", () => {
            const todo = new Todo(validId, validTitle, false);
            expect(() => todo.uncomplete())
                .toThrow("Todoは未完了です");
        });
    });
});
