export class UUID {
    private readonly value: string;

    constructor(value: string) {
        if (!UUID.isValidUUID(value)) {
            throw new Error("Invalid UUID");
        }

        this.value = value;
    }

    public toString(): string {
        return this.value;
    }

    public static generate(): UUID {
        return new UUID(crypto.randomUUID());
    }

    public static isValidUUID(value: string): boolean {
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        return uuidRegex.test(value);
    }
}
