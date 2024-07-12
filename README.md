# Node 知识点

```yaml
key1:
  child-key1: { name: 'zhangsan', age: 26 }
  child-key2: "Test"
key2:
  - Chen
  - true
  - 30
```

#### 如何执行 ts 文件
npm i ts-node

```bash
ts-node [XXX].ts
```

#### 读取文件

npm i fs-extra


```ts
import { readFileSync } from "fs";
import { ensureFileSync } from 'fs-extra';

// 确定目标路径是否存在, 没有则会创建文件
ensureFileSync(path)
// 如果没加上 utf-8 读取出来的是二进制的形式
const content = readFileSync(path, "utf-8")
```


#### 读取配置文件

npm i find-up
**find-up 可以往上寻找文件 并输出文件的路径**

npm i dotenv  
**dotenv 可以将读取的配置转换成对象的形式**

```ts
import { parse } from "dotenv";
import findUp from "find-up";

const search = findUp.sync(['.env']);
const readFile = readFileSync(search);

// 可以得到对象形式的数据
const content = parse(readFile);

```


