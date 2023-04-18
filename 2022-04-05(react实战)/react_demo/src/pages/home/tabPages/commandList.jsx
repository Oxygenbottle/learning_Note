import { React } from "react";
import commandListData from "../../../mock/commandList.mock.js"

export default function CommandList(params) {
  return (
    <div className="flex flex-col">
      {
        commandListData.map(item => (
          <div key={item.id} className="flex flex-col items-start p-4 border-b">
            <div className="h-auto">
              <a className="font-bold text-lg leading-10" href="">
                {item?.target?.question?.title || item?.target?.title}
              </a>
            </div>
            <div className="leading-6">
              <a href="/" className="cursor-pointer hover:text-stone-600 text-stone-800 line-clamp-2">
                {item?.target?.excerpt.substring(0, 90) + '...'}
                <span href="/" className=" text-base leading-7 text-blue-500 ">阅读全文 &gt;</span>
              </a>
            </div>
            <div className="flex">
              <div className="h-10 rounded-md bg-blue-100 text-blue-500 p-2 m-2 inline-flex">
                <span className="inline-flex">赞同
                  <svg width="10" height="10" viewBox="0 0 24 24" data-new-api="AgreeFill24" data-old-api="TriangleUp" class="Zi Zi--TriangleUp VoteButton-TriangleUp" fill="currentColor"><path d="M13.792 3.681c-.781-1.406-2.803-1.406-3.584 0l-7.79 14.023c-.76 1.367.228 3.046 1.791 3.046h15.582c1.563 0 2.55-1.68 1.791-3.046l-7.79-14.023z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                </span>
              </div>
              <div className="h-10 rounded-md bg-blue-100 text-blue-500 p-2 m-2 inline-flex">
                <span className="inline-flex">
                  <svg width="10" height="10" viewBox="0 0 24 24" data-new-api="OpposeFill24" data-old-api="TriangleDown" class="Zi Zi--TriangleDown" fill="currentColor"><path d="M13.792 20.319c-.781 1.406-2.803 1.406-3.584 0L2.418 6.296c-.76-1.367.228-3.046 1.791-3.046h15.582c1.563 0 2.55 1.68 1.791 3.046l-7.79 14.023z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                </span>
              </div>
            </div>
            <div className=" font-semibold text-stone-500 p-2 m-2 inline-flex">
              <span className="inline-flex">
                <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" data-new-api="ChatBubbleFill24" data-old-api="Comment" class="Zi Zi--Comment Button-zi" fill="currentColor"><path d="M11.982 3C17.211 3 21 7.271 21 12.014c0 1.514-.441 3.072-1.215 4.496a.946.946 0 00-.063.813l.603 2.018c.135.487-.279.847-.738.703l-1.818-.54c-.495-.163-.882.044-1.341.324C15.114 20.602 13.476 21 12 21c-4.464 0-9-3.452-9-9.014C3 7.19 6.87 3 11.982 3z"></path></svg>
                &nbsp;{item?.target?.comment_count}条评论
              </span>
            </div>
            <div className=" font-semibold text-stone-500 p-2 m-2 inline-flex">
              <span className="inline-flex">
                <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" data-new-api="PaperplaneFill24" data-old-api="Share" class="Zi Zi--Share Button-zi" fill="currentColor"><path d="M20.223 1.881a.8.8 0 011.205.778l-1.874 16.393a.9.9 0 01-1.204.742l-4.617-1.692a.7.7 0 00-.83.28l-1.929 3.021c-.43.674-1.474.37-1.474-.43v-3.866a.8.8 0 01.18-.505l5.809-7.15a.595.595 0 00-.897-.782l-5.933 6.357a1.1 1.1 0 01-1.257.251l-4.085-1.847a.8.8 0 01-.08-1.415L20.223 1.88z"></path></svg>
                &nbsp;分享
              </span>
            </div>
            <div className=" font-semibold text-stone-500 p-2 m-2 inline-flex">
              <span className="inline-flex">
                <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" data-new-api="StarFill24" data-old-api="Star" class="Zi Zi--Star Button-zi" fill="currentColor"><path d="M10.484 3.307c.673-1.168 2.358-1.168 3.032 0l2.377 4.122a.25.25 0 00.165.12l4.655.987c1.319.28 1.84 1.882.937 2.884l-3.186 3.535a.25.25 0 00-.063.193l.5 4.733c.142 1.34-1.222 2.33-2.453 1.782l-4.346-1.938a.25.25 0 00-.204 0l-4.346 1.938c-1.231.549-2.595-.442-2.453-1.782l.5-4.733a.25.25 0 00-.064-.193L2.35 11.42c-.903-1.002-.382-2.604.937-2.884l4.655-.987a.25.25 0 00.164-.12l2.378-4.122z"></path></svg>
                &nbsp;收藏
              </span>
            </div>
            <div className=" font-semibold text-stone-500 p-2 m-2 inline-flex">
              <span className="inline-flex">
                &nbsp;喜欢
              </span>
            </div>
          </div>
        ))
      }
    </div>
  )
}