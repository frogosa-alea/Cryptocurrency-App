import React, {CSSProperties} from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#001529",
};


const Loading = () => {

  return (
    <div className="sweet-loading">
      <ClipLoader cssOverride={override} size={150} />
    </div>
  )
}

export default Loading