import { React } from "react";

export default function creation(params) {
  return <div>
    <div className="flex flex-col">
      <div className="flex flex-1 flex-row justify-between p-4">
        <div className=" font-semibold">创作中心</div>
        <div className=" text-sm text-gray-500">草稿箱(0)</div>
      </div>
      <div className="flex flex-1 flex-row justify-between p-4">
        <div className="flex flex-col w-1/4 items-center">
          <div className=" rounded-full h-14 w-14 bg-blue-200 text-blue-500 flex justify-center items-center">
            书籍icon
          </div>
          <div className="text-sm my-2">回答问题</div>
        </div>
        <div className="flex flex-col w-1/4 items-center">
          <div className=" rounded-full h-14 w-14 bg-blue-200 text-blue-500 flex justify-center items-center">
            书籍2icon
          </div>
          <div className="text-sm my-2">回答问题</div>
        </div>
        <div className="flex flex-col w-1/4 items-center">
          <div className=" rounded-full h-14 w-14 bg-blue-200 text-blue-500 flex justify-center items-center">
            书籍3icon
          </div>
          <div className="text-sm my-2">回答问题</div>
        </div>
        <div className="flex flex-col w-1/4 items-center">
          <div className=" rounded-full h-14 w-14 bg-blue-200 text-blue-500 flex justify-center items-center">
            书籍4icon
          </div>
          <div className="text-sm my-2">回答问题</div>
        </div>
      </div>
      <div className="flex flex-1 flex-row justify-between p-4">
        <div className="bg-gray-100 w-full h-full p-6 rounded-md flex flex-col">
          <div>开启你的前端之旅</div>
        </div>
      </div>
    </div>
  </div>
}