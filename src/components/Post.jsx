import AllPost from "./AllPost"
import CreatePost from "./CreatePost"
import MyPost from "./MyPost"

const Post = () => {
  return (
    <div className="flex w-full space-x-2">
    <div className="static w-2/5 bg-red-500 rounded-md ">
    <CreatePost/>
      <MyPost/>
    </div>
    <div className="static w-3/5 bg-green-500 rounded-md ">
    
    <AllPost/>
    </div>

</div>
  )
}

export default Post