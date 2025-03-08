export class UUID {
    private readonly value: string;

    /**
     * UUIDを生成する
     * @param value - UUIDの文字列
     * @throws {Error} - UUIDが無効ならエラーを投げる
     */
    constructor(value: string) {
        if (!UUID.isValidUUID(value)) {
            throw new Error("Invalid UUID");
        }

        this.value = value;
    }

    /**
     * UUIDを文字列として返す
     * @returns {string} - UUIDの文字列
     */
    public toString(): string {
        return this.value;
    }

    /**
     * ランダムなUUIDを生成する
     * @returns {UUID} - 生成されたUUID
     */
    public static generate(): UUID {
        return new UUID(crypto.randomUUID());
    }

    /**
     * UUIDが有効かどうかをチェックする
     * @param value - チェックするUUID
     * @returns {boolean} - UUIDが有効ならtrue, 無効ならfalse
     */
    public static isValidUUID(value: string): boolean {
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        return uuidRegex.test(value);
    }
}
