import React from "react";
import ConvertTime from "./ConvertTime";

const DesignTable = props => {
  return (
    <div>
        <tr>
         <td><span className="num">{props.num_comments}</span></td>
          <td><span className="points">{props.points}</span></td>
          <td><a aria-label="Upvote button" className="upvotebutton">&#x25B4;</a></td><td>
          <span className="title">{props.title}</span>
            <span className="url">({props.url}) by </span>
            <span className="author">{props.author}</span>
            <span className="time">{<ConvertTime time={props.time}/>}</span>
            <span>[<button aria-label="Hide button" className="hide-button" onClick={props.onClick.bind(this,props.id)}> hide </button>]</span>
          </td>
        </tr>
</div>
  )
}

export default DesignTable;


