#!/usr/bin/env node
 // console.log('bin')

const {
  Command,
  program
} = require('commander');
const inquirer = require('inquirer');
const {devRollup} = require('./rollup')

program
  .version('0.1.0')
  .description('this is a cli for learning')
  .command('pack [entry]') // 构建一个打包工具, <>表示必选  []表示可选
  .description('this is a pack tools for react')
  .option('-d, --dev', "开发模式")
  .option('-p, --prod', "生产模式")
  .action((entry, type) => {
    console.log(`this is the entry :${entry}, and type is ${JSON.stringify(type)}`)
    let {
      dev,
      prod
    } = type;
    if (!(dev || prod)) {
      const prompList = [{
        type: 'list',// input, confirm, list..., checkbox, editor
        message: '运行(dev)还是打包？(prod)?', // 问题的描述
        name: 'packEnv',
        choices: [
          'dev', 'prod'
        ],
        //validate, filter, prefix, suffix, default../
      }];

      inquirer.prompt(prompList).then((res) => {
        if (res.packEnv === "dev") {
          console.log('我要运行')
          devRollup(entry);
        } else {
          console.log('我要打包')
        }
      })

    } else {
      dev && console.log('我要运行')
      prod && console.log('我要打包')
    }
  })

program
  .version('0.1.0')
  .description('this is a cli for learning')
  .command('create') // 构建一个打包工具, <>表示必选  []表示可选
  .description('this is a template generator')

program.parse(process.argv)