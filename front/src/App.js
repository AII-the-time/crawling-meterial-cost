import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Linked = styled(Link)`
  display: inline-block;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 5px;
  padding: 0 20px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  color: #000;
  text-decoration: none;
  &:hover{
    background-color: var(--color-main);
    color: white;
  }
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
`;

const Unit = styled.div`
  background-color: ${(props) => (props.$active ? 'var(--color-main)':"#ccc")};
  color: ${(props) => (props.$active ? 'white':'black')};
  border-radius: 5px;
  padding-bottom: 5px;
  margin-top: 5px;
  cursor: pointer;
  &:hover{
    background-color: var(--color-main);
    color: white;
  }
`;

const ContentsWrapper = styled.div`
  margin: 5px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0 10px;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
  input{
    text-align: left;
  }
  >*{
    >*{
      text-align: center;
    }
  }
  >*:not(:nth-child(3)) {
    flex-shrink: 0;
  }
  >*~*{
    border-left: 1px solid #ccc;
    padding-left: 10px;
    margin-left: 10px;
  }
  >div{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  >*:nth-child(1){
    width: 27px;
    text-align: center;
  }
  >*:nth-child(3){
    flex-grow: 1;
    >span{
      text-align: left;
    }
  }
  >*:nth-child(4){
    width: 140px;
    >div{
      display: flex;
      justify-content: center;
      align-items: center;
      >*{
        width: 70px;
      }
    }
  }
  >*:nth-child(5){
    width: 70px;
  }
  >*:nth-child(6){
    width: 70px;
  }
  >*:nth-child(7){
    width: 100px;
  }
`;

function App({cate}) {
  const [state, setState] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const res = await axios.get('/api/goods/'+cate);
      setState(res.data);
    };
    getList();
  }, [cate]);

  const onBlur = (id) => async (e) => {
    const res = await axios.patch('/api/goods/'+id, {
      volume: Number(document.getElementById("volume"+id).value),
      count: Number(document.getElementById("count"+id).value),
    });
    setState(state.map((item) => item.id===id?res.data:item));
  };

  const onClick = (id) => async (e) => {
    const res = await axios.patch('/api/goods/'+id, {
      unit: e.target.innerText,
    });
    setState(state.map((item) => item.id===id?res.data:item));
  };


  return (
    <div className="App" style={{textAlign: "center"}}>
      <h1>{cate}</h1>
      {["차", "음료/탄산수", "음료베이스", "시럽/소스", "파우더", "베이커리", "푸드", "테이크아웃"].map((category) => (
        <Linked to={`/${category}`}>{category}</Linked>
      ))}
      {state.map((item, index) => (
        <ContentsWrapper key={item.id}>
          <span>{index+1}</span>
          <Image src={"https://www.cntmart.com"+item.image}/>
          <div>
            <span>{item.brand}</span>
            <span>{item.name}</span>
          </div>
          <div>
            <label htmlFor="volume">용량</label>
            <input type="number" id={"volume"+item.id} name="volume" defaultValue={item.volume} onBlur={onBlur(item.id)} />
            <div>
              <Unit $active={item.unit==="ml"} onClick={onClick(item.id)}>ml</Unit>
              <Unit $active={item.unit==="g"} onClick={onClick(item.id)}>g</Unit>
            </div>
          </div>
          <div>
            <label htmlFor="count">개수</label>
            <input type="number" id={"count"+item.id} name="count" defaultValue={item.count} onBlur={onBlur(item.id)} />
          </div>
          <div>
            <label htmlFor="price">가격</label>
            <span>{item.price}</span>
          </div>
          <div>
            <label htmlFor="total">1{item.volume?item.unit:"개"}당 가격</label>
            <span>{Math.floor((item.volume?item.price/(item.volume*item.count):item.price/item.count)*100)/100}</span>
          </div>
        </ContentsWrapper>
      ))}
    </div>
  );
}

export default App;
