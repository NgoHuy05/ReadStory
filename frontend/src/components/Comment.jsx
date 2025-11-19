const Comment = () => {
    return (
        <div className="bg-[var(--card-bg)] max-w-7xl mx-auto px-4 py-2 rounded-xl">
          <div className="flex flex-col gap-2">
            <div className="[font-size:var(--title-text)]">Bình luận</div>
            <div className="relative">
              <textarea
                className="w-full h-[100px] bg-white rounded-2xl text-black px-4 py-2 outline outline-none"
                name="comment"
                placeholder="Var nhau ít cho đời thêm vui"
              ></textarea>
              <button className="absolute bottom-0 right-0 mb-5 mr-5 px-4 py-2 bg-red-500 rounded-2xl hover:bg-red-400 transition duration-300 cursor-pointer ">Gửi</button>
            </div>
          </div>
        </div>
    )
}

export default Comment;