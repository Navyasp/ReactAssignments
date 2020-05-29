import React from 'react';
import axios from 'axios';
import DesignTable  from "./DesignTable";
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dataList:[],
      hideData:false,
      pageCount:0,
      xArray:[],
      dataArray:[]
    }

  }
  getNextData = (id) => {
console.log(id)
   this.setState({
     pageCount:this.state.pageCount + 1
   })
   console.log(this.state.pageCount)

    axios.get('http://hn.algolia.com/api/v1/search?query=foo&tags=story&page='+this.state.pageCount)
    .then(result => {
      console.log("D")
      const todoData = result.data.hits;
      console.log("D",result.data)
      const todos = [];
      let xaxis =[],datavalues = [];
      for (const key in todoData) {
        xaxis.push(todoData[key].num_comments);
        datavalues.push(todoData[key].points);
      console.log(todoData[key].created_at)
        todos.push({ id: key,
                     author: todoData[key].author,
                     num_comments:todoData[key].num_comments,
                     title:todoData[key].title,
                     points:todoData[key].points,
                     url:todoData[key].url && todoData[key].url.replace('http://','').replace('https://','').split('/')[0],
                     time:todoData[key].created_at

                  });
      }
   // setDataList(todos); //
 console.log(todos)
   this.setState({
     dataList:todos,
     hideData:false,
     xArray:xaxis,
     dataArray:datavalues
   })
   return localStorage.setItem("post",JSON.stringify(todos))

    })
  }
  //const [dataList,setDataList] = useState([]);
 componentDidMount(){
   this.getNextData(0)

  }

   hideData = (id) => {
    let removeData = JSON.parse(localStorage.getItem("post"));
    let d = removeData.filter(remove => remove.id !== id)
    this.setState({

      hideData:true
    })

   return  localStorage.setItem("post",JSON.stringify(d))

  }
render(){

  let dataArray;
   if(this.state.hideData){
     dataArray = JSON.parse(localStorage.getItem("post"));
   } else {
     dataArray = this.state.dataList;
   }
   const options = {
    chart: {
      type: 'spline'
    },
    title: {
      text: ''
    },
   xAxis: {
       categories: this.state.xArray
   },
   yAxis : {
    title: {
      text: 'Votes'
   },
  },
    series: [
      {
        name:"ID",
        data: this.state.dataArray
      }
    ]
  };
return (

  <React.Fragment>
  <table><tbody>
{dataArray.length > 2 &&  dataArray.map(data => (
    <DesignTable key = {data.id}
                id = {data.id}
                author = {data.author}
                num_comments = {data.num_comments}
                title = {data.title}
                points = {data.points}
                url = {data.url}
                time = {data.time}
                onClick={this.hideData} />

  ))
}
</tbody></table>
 <a  className = "previousPage" onClick={this.getNextData.bind(this, -1)}>Previous | </a><a onClick={this.getNextData.bind(this,1)}>Next</a>
 <hr />
 <div>
    <HighchartsReact highcharts={Highcharts} options={options} />
  </div>
</React.Fragment>

)
}
};

export default App;
