import CreatePost from "./CreatePost"
import AllPost from "./AllPost"

const MyPost = () => {
  return (
    <>
    <div className="flex w-full">
        <div className="w-1/2 bg-red-500">
          <CreatePost/>
        </div>
        <div className="w-1/2 bg-green-500">
           <AllPost/>
            </div>

    </div>

    </>
  )
}

export default MyPost