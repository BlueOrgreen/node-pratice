import { resolve } from "path";
import { has, isNil, omit, set } from "lodash"
import { ensureFileSync } from 'fs-extra';
import { parse } from 'dotenv';
import { readFileSync, writeFileSync } from "fs";
import YAML from "YAML";
import findUp from "find-up";
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
            // console.log('test', ensureFileSync(this._path));
            
            ensureFileSync(this._path);
            const config = YAML.parse(readFileSync(this._path, 'utf8'))
            // console.log('config', config);
            this._config = isNil(config) ? {} : config;
        }
    }

    set<T>(key: string, value: T) {
        ensureFileSync(this.path);
        set(this._config, key, value);
        writeFileSync(this.path, YAML.stringify(this._config, null, 4))
    }

    remove(key: string) {
        this._config = omit(this._config, [key]);
        if(has(this._config, key)) omit(this._config, [key]);
        writeFileSync(this.path, YAML.stringify(this._config, null, 4));

    }
}

const storage = new Storage(resolve(__dirname, '../content/my.yml'));
console.log(storage);

// storage.set('key3', [11, 22, 'Test', false]);

// storage.remove('key3');

class Env {
    /**
     * 加载环境变量
     */
    async load() {
        console.log(process.env.NODE_ENV);
        if (isNil(process.env.NODE_ENV)) process.env.NODE_ENV = 'dev';
        const search = [findUp.sync(['.env'])];
        console.log('search===>', search);
        const readContent = readFileSync(search[0], 'utf-8')
        console.log('readContent===>', readContent);
        const docContent = parse(readContent);
        console.log('readFile Content parse docContent===>', docContent);
    }
}

const env = new Env();
env.load();
