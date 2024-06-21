import AllPost from "./AllPost"
import MyPost from "./MyPost"

const Post = () => {
  return (
    <div className="flex w-full space-x-2">
    <div className="w-2/5 rounded-md ">
    <MyPost/>
    </div>
    <div className="w-3/5 rounded-md ">
    
    <AllPost/>
    </div>

</div>
  )
}

export default Post