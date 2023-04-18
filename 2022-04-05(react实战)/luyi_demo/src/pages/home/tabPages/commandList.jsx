import React from 'react'
import commandListData from '../../../mock/commandList.mock';

export default function commandList() {
    return (
        <div className='flex flex-col'>
            {
                commandListData.map(item => (
                    <div key={item.id} className='flex flex-col items-start p-4 border-b'>
                        <div className="h-auto">
                            <a className='font-bold text-lg leading-10' href='/'>{
                                item?.target?.question?.title || item?.target?.title
                            }</a>
                        </div>
                        <div className='leading-6'>
                            <a href="/" className='cursor-pointer hover:text-stone-600 text-stone-800 line-clamp-2'>
                                {item?.target?.excerpt.substring(0, 90) + '...'}
                                <span href="/" className=" text-base leading-7 text-blue-500 ">阅读全文 &gt;</span>
                            </a>
                        </div>
                        <div className='flex' >
                            <div className="h-10 rounded-md bg-blue-100 text-blue-500 p-2 m-2 inline-flex">
                                <span className='inline-flex'><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 16" fill="currentColor">
                                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                    赞同
                                </span>
                            </div>
                            <div className="h-10 rounded-md bg-blue-100 text-blue-500 p-2 m-2 inline-flex">
                                <span className='inline-flex'><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 16" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                </span>
                            </div>
                            <div className=' font-semibold text-stone-500 p-2 m-2 inline-flex'>
                                <span className='inline-flex'><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 16" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                    &nbsp;{item?.target?.comment_count}条评论
                                </span>
                            </div>
                            <div className=' font-semibold text-stone-500 p-2 m-2 inline-flex'>
                                <span className='inline-flex'><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 16" fill="currentColor">
                                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                                </svg>
                                    &nbsp;分享
                                </span>
                            </div>
                            <div className=' font-semibold text-stone-500 p-2 m-2 inline-flex'>
                                <span className='inline-flex'><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 16" fill="currentColor">
                                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                                    <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                                    &nbsp;收藏
                                </span>
                            </div>
                            <div className=' font-semibold text-stone-500 p-2 m-2 inline-flex'>
                                <span className='inline-flex'><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 16" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                                    &nbsp;喜欢
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
