import { resolve } from "path";
import { isNil, set } from "lodash"
import { ensureFileSync } from 'fs-extra';
import { readFileSync, writeFileSync } from "fs";
import YAML from "YAML";

class Storage {
    protected _path = resolve(__dirname, '../content/my.yml');

     /**
     * 存储在yaml中的配置对象
     */
     protected _config: Record<string, any> = {};


    get path() {
        return this._path;
    }

    constructor(filePath?: string) {
        // console.log('start',
        // YAML.parse(readFileSync(this._path, 'utf8')),
        // 'ensure path', ensureFileSync(this._path));
        
        if(!isNil(filePath)) {
            this._path = filePath;
            console.log('test', ensureFileSync(this._path));
            
            ensureFileSync(this._path);
            const config = YAML.parse(readFileSync(this._path, 'utf8'))
            console.log('config', config);
            this._config = isNil(config) ? {} : config;
        }
    }

    set<T>(key: string, value: T) {
        ensureFileSync(this.path);
        set(this._config, key, value);
        writeFileSync(this.path, JSON.stringify(this.path, null, 4))
    }
}

const storage = new Storage(resolve(__dirname, '../content/my.yml'));
console.log(storage);

storage.set('key3', [1, 2, 'hhh', true])
