import { Link } from 'react-router-dom';
import styled from 'styled-components';

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


function Main() {
  const categories = ["차", "음료/탄산수", "음료베이스", "시럽/소스", "파우더", "베이커리", "푸드", "테이크아웃"];
  return (
    <div style={{textAlign: "center"}}>
      <h1>메인 페이지</h1>
      {categories.map((category) => (
        <Linked to={`/${category}`}>{category}</Linked>
      ))}
    </div>
  );
}








export default Main;
