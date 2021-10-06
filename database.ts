interface Database<T, K> {
    get(id: K): T;
    set(id: K, value: T): void
}

interface Persistable {
    saveToString(): string;
    restoreFromString(storedState: string): void;
}

type DBKeyType = string | number | symbol;

class InMemoryDatabase<T, K extends DBKeyType> implements Database<T, K> {
    protected db: Record<K, T> = {} as Record<K, T>;
    get(id: K): T {
        return this.db[id];
    }
    set(id: K, value: T): void {
        this.db[id] = value;
    }
    
}

class PersistentMemoryDB<T, K extends DBKeyType> extends InMemoryDatabase<T, K> implements Persistable {
    saveToString(): string {
        return JSON.stringify(this.db);
    }
    restoreFromString(storedState: string): void {
        this.db = JSON.parse(storedState);
    }
}

const myDB = new PersistentMemoryDB<number, string>();
myDB.set("foo", 22);
console.log(myDB.get("foo"));
console.log(myDB.saveToString());
