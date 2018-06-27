import Cacheability from "cacheability";
import PromiseWorker from "promise-worker";
import { convertCacheability } from "../helpers/convert-cacheability";
import {
  CacheHeaders,
  CachemapArgs,
  ExportResult,
  ImportArgs,
  Metadata,
  PostMessageArgs,
  PostMessageResult,
  StoreTypes,
} from "../types";
import { WorkerCachemapArgs } from "./types";

/**
 * A browser cache that works in web workers, that
 * can use IndexedDB or an in-memory Map.
 *
 * ```typescript
 * import { WorkerCachemap } from "cachemap";
 *
 * const cachemap = await WorkerCachemap.create({
 *   name: "alfa",
 *   use: { client: "localStorage", server: "redis" },
 * });
 * ```
 *
 */
export class WorkerCachemap {
  /**
   * The method creates an instance of WorkerCachemap.
   *
   * ```typescript
   * const cachemap = await WorkerCachemap.create({
   *   name: "alfa",
   *   use: { client: "indexedDB" },
   * });
   * ```
   *
   */
  public static async create(args: CachemapArgs): Promise<WorkerCachemap> {
    try {
      const worker = new Worker("worker-cachemap.worker.js");
      const promiseWorker = new PromiseWorker(worker);
      const workerCachemap = new WorkerCachemap({ promiseWorker, worker });
      const { metadata, storeType, usedHeapSize } = await workerCachemap._postMessage({ args, type: "create" });
      workerCachemap._setProps(metadata, usedHeapSize, storeType);
      return workerCachemap;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private _metadata: Metadata[] = [];
  private _promiseWorker: PromiseWorker;
  private _storeType?: StoreTypes;
  private _usedHeapSize: number = 0;
  private _worker: Worker;

  constructor({ promiseWorker, worker }: WorkerCachemapArgs) {
    this._promiseWorker = promiseWorker;
    this._worker = worker;
  }

  /**
   * The property holds the metadata for each data
   * entry in the WorkerCachemap instance.
   *
   */
  get metadata(): Metadata[] {
    return this._metadata;
  }

  /**
   * The property holds the name of the store type the
   * DefaultCachemap is using.
   *
   */
  get storeType(): string | undefined {
    return this._storeType;
  }

  /**
   * The property holds the approximate amount of
   * memory the WorkerCachemap instance as used.
   *
   */
  get usedHeapSize(): number {
    return this._usedHeapSize;
  }

  /**
   * The method removes all data entries from the
   * WorkerCachemap instance.
   *
   * ```typescript
   * await cachemap.set("alfa", [1, 2, 3, 4, 5]);
   * await cachemap.clear();
   *
   * const size = await cachemap.size();
   * // size is 0;
   * ```
   *
   */
  public async clear(): Promise<void> {
    try {
      const { metadata, usedHeapSize } = await this._postMessage({ type: "clear" });
      this._setProps(metadata, usedHeapSize);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * The method removes a specific data entry from the
   * WorkerCachemap instance.
   *
   * ```typescript
   * await cachemap.set("alfa", [1, 2, 3, 4, 5]);
   *
   * const isDeleted = await cachemap.delete("alfa");
   * // isDeleted is true
   *
   * const size = await cachemap.size();
   * // size is 0;
   * ```
   *
   */
  public async delete(key: string, opts: { hash?: boolean } = {}): Promise<boolean> {
    try {
      const { metadata, result, usedHeapSize } = await this._postMessage({ key, opts, type: "delete" });
      this._setProps(metadata, usedHeapSize);
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * If a list of keys is provided, the method retrieves the
   * requested key/value pairs, while if no list is provided it retrieves
   * all key/value pairs in the instance of the DefaultCachemap.
   *
   * ```typescript
   * await cachemap.set("alfa", [1, 2, 3, 4, 5]);
   * await cachemap.set("bravo", [6, 7, 8, 9, 10]);
   *
   * const entries = await cachemap.entries();
   * // entries is [["alfa", [1, 2, 3, 4, 5]], ["bravo", [6, 7, 8, 9, 10]]]
   * ```
   *
   */
  public async entries(keys?: string[]): Promise<Array<[string, any]>> {
    try {
      const { metadata, result, usedHeapSize } = await this._postMessage({ keys, type: "entries" });
      this._setProps(metadata, usedHeapSize);
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * If a list of keys is provided, the method retreives the
   * requested entries and metadata, while if no list is provided
   * it retrieves all entries and metadata in the instance of
   * the DefaultCachemap.
   *
   * ```typescript
   * await cachemap.set("alfa", [1, 2, 3, 4, 5]);
   * await cachemap.set("bravo", [6, 7, 8, 9, 10]);
   *
   * const exported = await cachemap.export();
   * // exported.entries is [["alfa", [1, 2, 3, 4, 5]], ["bravo", [6, 7, 8, 9, 10]]]
   * ```
   *
   */
  public async export(opts?: { keys?: string[], tag?: any }): Promise<ExportResult> {
    try {
      const { metadata, result, usedHeapSize } = await this._postMessage({ opts, type: "export" });
      this._setProps(metadata, usedHeapSize);
      return { entries: result.entries, metadata: convertCacheability(result.metadata) };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * The method retrievs a data entry from the WorkerCachemap
   * instance.
   *
   * ```typescript
   * await cachemap.set("alfa", [1, 2, 3, 4, 5]);
   *
   * const entry = await cachemap.get("alfa");
   * // entry is [1, 2, 3, 4, 5]
   * ```
   *
   */
  public async get(key: string, opts: { hash?: boolean } = {}): Promise<any> {
    try {
      const { metadata, result, usedHeapSize } = await this._postMessage({ key, opts, type: "get" });
      this._setProps(metadata, usedHeapSize);
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * The method retrievs the cache metadata for a data
   * entry or returns false if no matching data entry is found.
   *
   * ```typescript
   * await cachemap.set("alfa", [1, 2, 3, 4, 5], {
   *   cacheHeaders: { cacheControl: "public, max-age=5" },
   * });
   *
   * const hasEntry = await cachemap.has("alfa");
   * // hasEntry is instanceof Cacheability
   *
   * // Six seconds elapse...
   *
   * const stillHasEntry = await cachemap.has("alfa", { deleteExpired: true });
   * // stillHasEntry is false
   * ```
   *
   */
  public async has(
    key: string,
    opts: { deleteExpired?: boolean, hash?: boolean } = {},
  ): Promise<Cacheability | false> {
    try {
      const { metadata, result, usedHeapSize } = await this._postMessage({ key, opts, type: "has" });
      this._setProps(metadata, usedHeapSize);
      if (!result) return false;
      const cacheability = new Cacheability({ metadata: result.metadata });
      return cacheability;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * The method imports the cache entries and metadata exported
   * from another instance of the DefaultCachemap.
   *
   * ```typescript
   * const exported = await cachemapAlfa.export();
   * await cachemapBravo.import(exported);
   * ```
   *
   */
  public async import(exported: ImportArgs): Promise<void> {
    try {
      const { metadata, usedHeapSize } = await this._postMessage({ exported, type: "import" });
      this._setProps(metadata, usedHeapSize);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * The method adds a data entry to the WorkerCachemap
   * instance.
   *
   * ```typescript
   * await cachemap.set("alfa", [1, 2, 3, 4, 5], {
   *   cacheHeaders: { cacheControl: "public, max-age=5" },
   *   hash: true,
   * });
   *
   * const size = await cachemap.size();
   * // size is 1
   * ```
   *
   */
  public async set(
    key: string,
    value: any,
    opts: { cacheHeaders?: CacheHeaders, hash?: boolean, tag?: any } = {},
  ): Promise<void> {
    try {
      const { metadata, usedHeapSize } = await this._postMessage({ key, opts, type: "set", value });
      this._setProps(metadata, usedHeapSize);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * The method gets the number of data entries in the
   * WorkerCachemap instance.
   *
   * ```typescript
   * await cachemap.set("alfa", [1, 2, 3, 4, 5]);
   *
   * const size = await cachemap.size();
   * // size is 1
   * ```
   *
   */
  public async size(): Promise<number> {
    try {
      const { metadata, result, usedHeapSize } = await this._postMessage({ type: "size" });
      this._setProps(metadata, usedHeapSize);
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * The method immediately terminates the web worker.
   *
   * ```typescript
   * cachemap.terminate();
   * ```
   *
   */
  public terminate(): void {
    this._worker.terminate();
  }

  private async _postMessage(args: PostMessageArgs): Promise<PostMessageResult> {
    try {
      return this._promiseWorker.postMessage(args);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private _setProps(workerMetadata: Metadata[], usedHeapSize: number, storeType?: string): void {
    this._metadata = convertCacheability(workerMetadata);
    if (storeType) this._storeType = storeType as StoreTypes;
    this._usedHeapSize = usedHeapSize;
  }
}
