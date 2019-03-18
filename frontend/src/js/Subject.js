import React,{Component} from 'react';
import '../css/Subject.css';
import pin from '../img/black-pin.png';
import ActivePin from '../img/black-pin-active.png';
import axios from 'axios';

class Subject extends Component{
	state ={
		menuPostion:null,
		subjectList:[{subject_name:"a",subject_seq:"1"}]
	};

	constructor(props) {
		super(props);
	
		this.state = {
			  pinSw:false,
			  menuPostion:'fixed',
			  curTop:0,
				menuTop:250
			
			};
	   this.pinClick = this.pinClick.bind(this);
	 };
	 componentDidMount() {
				this.GetSubject();
				window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount(){
			window.removeEventListener("scroll", this.handleScroll);
	}

	handleScroll=() =>{
		if(!this.state.pinSw){
		const top =
			(document.documentElement && document.documentElement.scrollTop) ||
			document.body.scrollTop;
			this.setState(()=>({
				curTop:top+250
			}));
		}
   }
	pinClick() {

		if(!this.state.pinSw){
			this.setState(() =>({
				menuPostion:'absolute',
				menuTop:this.state.curTop,
				pinSw:!this.state.pinSw
			}));
		}else{
			this.setState(() =>({
				menuPostion:'fixed',
				menuTop:250,
				pinSw:!this.state.pinSw
			}));
		}
	};
	SubjectInsertForm(){
		//추가할 주제의 고유번호 (마지막 번호에서 1추가해서 가져옴)
		axios.get('/lastsubjectseq').then(res => window.location = "/subject/"+res.data);
	}
	GetSubject = () =>{
		axios.get('/subjectlist').then(res=>this.setState({subjectList:res.data}));
	}
	getDocuemnt(subject) {
		window.location="/document/"+subject;
	}
	ModifySubjectPage(){
		window.location="/subjectlist";
	}
	render(){
		return (
				<div className="Subject" style={{position:this.state.menuPostion,top:this.state.menuTop}}>
				<header className="Subject-header">
				{this.state.pinSw ? <img src={ActivePin} className="Active-pin" onClick={this.pinClick} alt="chock-pin"></img>  :<img src={pin} className="Subject-pin" onClick={this.pinClick} alt="Active-pin"></img>}
					<h4 className="Subject-title">주제</h4>
				</header>
				<div className="Subject-body">
				{this.state.subjectList ? <ul className="Subject-ul">
				{
					this.state.subjectList.map(
						(item)=><li className="Subject-list" key={item.subject_seq}>
						<a className="Subject-name" value={item.subject_seq} onClick={()=>this.getDocuemnt(item.subject_name)}>{item.subject_name}</a> 
						</li>
					) 
				} </ul> : <p>주제를 불러오는중..</p>}
				</div>
				
				<button className="Subject-add-btn" onClick={this.SubjectInsertForm}>추가</button>
				<button className="Subject-modified-btn" onClick={this.ModifySubjectPage}>수정</button>
				</div>
				);
	};
};

export default Subject;