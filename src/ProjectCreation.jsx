import React, { Component, forwardRef } from 'react';
import { Button, TextField, Chip, Input, ExpansionPanel, 
    ExpansionPanelSummary, Typography} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MaterialTable from 'material-table';
import ReactFileReader from 'react-file-reader';
import { history } from '@/_helpers';
import { authenticationService } from '@/_services';

//Table
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

class ProjectCreation extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            projectTitle: null,
            description: null,
            rules: null,
            key: null,
            value: "",
            labels: [],
            dataUpload:null,
            userList:[],
            selectedRows:[],
            expanded:false
        };

        this._isMounted = false
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    handleTextChange = name => event => {
        this.setState({[name]:event.target.value}, () => {})
    }

    handleLabelChange = evt => {
        this.setState({
          value: evt.target.value,
        });
    };

    handleLabelDelete = (label) => {
        this.setState({
            labels: this.state.labels.filter(i => i !== label)
          });
    }

    handleExpandChange = (expand) => {
        this.setState({expanded:expand}, () => {
            if(this.state.expanded === true){
                this.getUserList()
            }
        })
    }

    handleRowChange = (rows) => {
        var rowID = []
        rows.forEach(row => {
            rowID.push(row["UserID"])
        })
        this.setState({selectedRows:rowID}, () => {
            console.log(this.state.selectedRows)
        })
    }

    displayAnnotationLabels = () => {
        var currentLabels = []
        currentLabels = this.state.labels
        return(
            <div className='PC-label-ctn'>
                <Input
                    placeholder = "Type Labels and press 'Enter'"
                    onKeyDown = {this.handleAddLabel} 
                    onChange = {this.handleLabelChange}
                    value = {this.state.value}
                />
                <div className='clear'></div>
                {currentLabels.map((label, i) => (
                    <Chip 
                    key={i}
                    label={label}
                    onDelete={() => this.handleLabelDelete(label)}
                    >
                    </Chip>
                ))}
            </div>
        )
    }

    async getUserList(){
        //Create the base project first
        console.log("Attempting to get user list...")
        const userList = await authenticationService.getUserList('Default')
        this.setState({userList:JSON.parse(userList)})
    }

    displayUserList = () => {
        var userList = this.state.userList
        return(
        <div>
        <MaterialTable
        icons={tableIcons}
        options={{selection:true}}
          columns={[
            { width:30, title: "ID", field: "UserID", type:"numeric"},
            { title: "First Name", field: "FirstName" },
            { title: "Last Name", field: "LastName" },
            { title: "Username", field: "Username" },
          ]}
          
          data={userList}
          title="User List"
          onSelectionChange={(rows) => this.handleRowChange(rows)}
        />
         </div>)
    }

    async createProject() {
        if(this._isMounted){
        //Create the base project first
        const response = await authenticationService.createProject(this.state.projectTitle, this.state.description, this.state.rules, this.state.labels, this.state.selectedRows)
        if(await response === "Success"){
            history.push('/');
        }
        }
    }

    handleAddLabel = evt => {
        var currentLabels = []
        currentLabels = this.state.labels

        if (["Enter", "Tab", ","].includes(evt.key)){
            evt.preventDefault();

            var value = this.state.value.trim();
            currentLabels.push(value)
            console.log(value)
            this.setState({
                labels: currentLabels,
                value: ""
            });
        }
    }
    
    render() {
        return(
            <div className='M-view-ctn'>
                <div className='PC-main-title'>Create a new Project</div>
                <ExpansionPanel expanded className='PC-form-ctn'>
                    <div className='PC-sub-title'></div>
                    <div className='PC-textfield-ctn'>
                    <TextField 
                    className='PC-title-textfield'
                    label="Title" 
                    variant="outlined"
                    onChange = {this.handleTextChange('projectTitle')} />
                    <TextField
                    className='PC-desc-textfield'
                    label="Description"
                    multiline
                    rows="4"
                    variant="outlined"
                    onChange = {this.handleTextChange('description')} />
                    <TextField 
                    className='PC-rule-textfield'
                    multiline
                    rows="8"
                    label="Rules" 
                    variant="outlined"
                    onChange = {this.handleTextChange('rules')} />
                    {this.displayAnnotationLabels()}
                    {/*
                    <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                        <Button className='PC-upload-btn' variant="contained" color="secondary">Upload</Button>
                    </ReactFileReader>
                    */}
                </div>
                </ExpansionPanel>
                <ExpansionPanel className='PC-user-list-ctn' TransitionProps={{ unmountOnExit: true }} expanded={this.state.expanded} onChange={e => this.handleExpandChange(!this.state.expanded)}>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    className = "PC-user-expand"
                    >
                    <Typography>Add Users to Project</Typography>
                    </ExpansionPanelSummary>
                    {/*<Button className='PC-sumbit-btn' variant="contained" color="primary" onClick={e => this.getUserList()}>Get User List</Button>*/}
                    {this.displayUserList()}
                </ExpansionPanel>
                <div className='PC-submit-ctn'>
                <Button className='PC-sumbit-btn' variant="contained" color="primary" onClick={e => this.createProject(this.state.projectTitle)}>Create Project</Button>
                </div>
            </div>            
        )
        }
};
export { ProjectCreation };