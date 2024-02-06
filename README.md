# Node 知识点

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
const content = readFileSync(path, "utf-8")
```

