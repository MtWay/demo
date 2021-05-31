
// 显示一个 "Like" <button>

// return e(
//   'button',
//   { onClick: () => this.setState({ liked: true }) },
//   'Like'
// )
const { useState,useEffect } = React;
function Example() {
    // 声明一个叫 “count” 的 state 变量。
    const [count, setCount] = useState(0);
        useEffect(() => {
        // 使用浏览器的 API 更新页面标题
        document.title = `You clicked ${count} times`;
      });
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }
  const e = React.createElement;
function LikeButton(){
    const e = React.createElement;
// 显示一个 "Like" <button>
return e(
  'button',
  { onClick: () => this.setState({ liked: true }) },
  'Like'
);
}
function LikeButton1(){
    return (
  <button onClick={() => this.setState({ liked: true })}>
    Like
  </button>
);
}
const domContainer = document.querySelector('#like_button_container');
// ReactDOM.render(LikeButton1(), domContainer);
ReactDOM.render(<div>
    {
        [0,1].map(n=>{
            return(<span>
    <Example/>
            </span>)
        })
    }
    </div>, domContainer);