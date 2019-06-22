import React from "react";
import marked from "marked";

marked.setOptions({
  gfm: true,
    breaks: true
 })
 
 export default class MarkdownPreview extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
    markdown: '',
    toggle: 'preview'
   };
   this.handleToggle = this.handleToggle.bind(this);
   this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount() {
   this.setState({
    markdown: '# a header\n\n## a subheader\n\n[a link](http://google.com)\n\n`inline code`\n\n```\nThis is code block\n```\n\n1. a list item\n\n> a block quote\n\n![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")\n\n**bolded text**'
   })
  }

  handleToggle() {
    this.setState(prevState => ({
      toggle: prevState.toggle === 'preview' ? 'editor' : 'preview'
    }));
  }
  
  handeCreateMarkup() {
   return {__html: marked(this.state.markdown)};
  }
  
  handleChange(event) {
   this.setState({markdown: event.target.value});
  }
 
  render() {
   return (
    <div id="main">
     <div id="toggle" onClick={this.handleToggle}>{this.state.toggle}</div>
     <div id="preview-container" className={this.state.toggle === 'preview' ? "visible" : "hidden"}>
         <div id="preview" dangerouslySetInnerHTML={this.handeCreateMarkup()} >
     </div>
     </div>
     <div id="editor-container" className={this.state.toggle ==='editor' ? "visible" : "hidden"}>
      <textarea id="editor" value={this.state.markdown} onChange={this.handleChange} />
     </div>
    </div>
   );
  }
 }