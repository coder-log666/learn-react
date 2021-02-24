import React, { PureComponent } from 'react'
import './style.css'

export default class EventTest extends PureComponent {
  constructor(props) {
    super(props);
    this.grandClicked = this.grandClicked.bind(this)
    this.fatherClicked = this.fatherClicked.bind(this)
    this.sonClicked = this.sonClicked.bind(this)
    this.sonClicked1 = this.sonClicked1.bind(this)
  }

  componentDidMount() {
    const grand = document.querySelector('.grand')
    const father = document.querySelector('.father')
    const son = document.querySelector('.son')
    // grand.onclick = function() {
    //     console.log('dom-grand')
    // }
    // father.onclick = function() {
    //     console.log('dom-father')
    // }
    // son.onclick = function(e) {
    //     console.log('dom-son')
    //     //会阻止合成事件以及dom冒泡
    //     e.stopPropagation();
    // }
    son.addEventListener('click', this.sonClicked1)
    father.addEventListener('click', this.fatherClicked)
    grand.addEventListener('click', this.grandClicked)
  }

  grandClicked(e) {
    console.log('grand');
    // e.stopPropagation()
  }

  fatherClicked(e) {
    console.log('father');
    // e.stopPropagation()
  }

  sonClicked(e) {
    console.log('son');
    //会阻止合成事件的冒泡
    e.stopPropagation()
  }
  sonClicked1(e) {
    console.log('dom-son');
    //会阻止合成事件以及dom冒泡
    // e.stopPropagation()
  }

  render() {
    return (
      <div className='grand' onClick={this.grandClicked}>
        <div className='father' onClick={this.fatherClicked}>
          <div className='son' onClick={
            this.sonClicked
          }>

          </div>
        </div>
      </div>
    )
  }
}
