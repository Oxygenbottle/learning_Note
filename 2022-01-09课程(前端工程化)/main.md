## 3.编译选项
**自动编译文件：** `tsc xxx.ts -w`
* 编译文件时，使用-w指令后，TS编译器会自动监视文件的变化，并在文件发声变化时对文件进行重新编译。
* 如果直接使用tsc指令，则可以自动将当前项目下的所有ts文件编译为js文件
* 但是能直接使用tsc命令的前提是，要先在项目的根目录下创建一个ts的配置文件tsconfig.json
* tsconfig.json是一个JSON文件，只需要tsc命令即可对整个项目进行编译 -w同样有监视效果。

**配置选项：**
1. `include`
    *   用来制定哪些ts需要被编译 
    ```ts
    //  **   任意文件夹
    //  *    任意文件
    "include": [
        "./src/**/*"
    ]
    ```
2.  `exclude`
    *   不需要被编译的文件目录
    ```ts
    "exclude": [
        "./src/index/**/*"
    ]
    ```
3.  `extends`
    *   定义被继承的`.json`文件配置
    ```ts
    "extends": "./configs/base"
    ```
4.  `files`
    *   制定被编译的文件列表，只有需要编译的文件少时才会用到
    ```ts
    "files": [
        "core.ts", 
        "index.ts"
    ]
    ```
5.  `compilerOptions`
    * **编译器的配置选项**
    1. target 
    2. module 
    3. lib 用来指定项目中要使用的库
    ```json
    // 示例
    "compilerOptions": {
        "target": "ES6",
        "module": "ES6",
        "lib": ["ES6","DOM"]
    }
    ```
    4. outDir  06_TS编译选项（2）