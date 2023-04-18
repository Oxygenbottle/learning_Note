import React from 'react'

export default function creation() {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-1 flex-row justify-between p-4'>
        <div className=' font-semibold'>创作中心</div>
        <div className=' text-sm text-gray-500'>草稿箱(0)</div>
      </div>
      <div className='flex flex-1 flex-row justify-between p-4'>
        <div className='flex flex-col w-1/4 items-center'>
          <div className=' rounded-full h-14 w-14 bg-blue-200 text-blue-500 flex justify-center items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div className='text-sm my-2'>回答问题</div>
        </div>

        <div className='flex flex-col w-1/4 items-center'>
          <div className=' rounded-full h-14 w-14 bg-orange-200 text-orange-500 flex justify-center items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div className='text-sm my-2'>发视频</div>
        </div>

        <div className='flex flex-col w-1/4 items-center'>
          <div className=' rounded-full h-14 w-14 bg-amber-200 text-amber-500 flex justify-center items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div className='text-sm my-2'>写文章</div>
        </div>

        <div className='flex flex-col w-1/4 items-center'>
          <div className=' rounded-full h-14 w-14 bg-emerald-200 text-emerald-500 flex justify-center items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div className='text-sm my-2'>写想法</div>
        </div>
      </div>
      <div className='flex flex-1 flex-row justify-between p-4'>
        <div className='bg-gray-100 w-full h-full p-6 rounded-md flex flex-col'>
          <div>开启你的前端之旅</div>
          <div className='text-sm text-gray-400 pt-2'>开启你的前端之旅，爪哇教育选麓一</div>
        </div>
      </div>
    </div>
  )
}
