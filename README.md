# PreOnboarding

[위코드 x 원티드] 백엔드 프리온보딩 선발 과제

게시판 CRUD API \_ 김민재

<br/>

## 💻 Tech Stack

Programming Language : JavaScript <br/>
Runtime : NodeJS <br/>
Framework : Express <br/>
ETC : JWT, Bcrypt

<br/>

## 📋 API Docs

Git Book 바로 가기 :
https://minjman2659.gitbook.io/preonboarding-api/

<br/>

## 💾 DB Scheme

<img width="500" alt="DDO_Jurimma Stack" src="https://media.discordapp.net/attachments/885202056355397686/901014078330380338/unknown.png"><br/>
데이터베이스는 In-Memory 방식으로 구현 (models 폴더 참고) <br/>
usersList와 boardsList는 1:N 관계

<br/>

## 🔎 Description

**서버 실행 방법** <br/>
Github Repository를 clone 한 후, <br/>`npm install` 명령어를 통해 필요한 npm 모듈을 설치합니다. <br/>
이후, `npm run start` 혹은 `npm run nodemon` 명령어를 통해 서버를 실행시킬 수 있습니다. <br/>
\*JWT Secret key는 임시 키로 코드상에 구현해 놓았으니 별도로 .env 파일을 만들지 않아도 됩니다. <br/>
서버 url : http://localhost:4000 <br/>

**로그인 이전 할 수 있는 기능** <br/>
회원가입(POST), 이메일 중복 체크(GET), 글 조회(GET), 전체 글 목록 조회(GET)
<br/>

**로그인 기능 (POST)** <br/>
게스트 로그인(별도의 회원가입 필요없음), 유저 로그인(회원가입 필요)
<br/>

**로그인 이후 할 수 있는 기능** <br/>
게스트 로그인 : 새로운 글 작성(POST), 로그아웃(POST) <br/>
유저 로그인 : 새로운 글 작성(POST), 내가 쓴 글 목록 조회(GET), 내가 쓴 글 수정(PATCH), 내가 쓴 글 삭제(DELETE), 로그아웃(POST)
<br/>

**API에 대한 자세한 내용은 [Git Book](https://minjman2659.gitbook.io/preonboarding-api/) 을 통해 더 자세하게 확인 할 수 있습니다.** <br/>

<br/>

유저들은 회원가입을 통해 새로운 유저 데이터를 만들 수 있으며, 서비스 자체 로그인을 진행할 수 있습니다. <br/>
별도의 회원가입 없이 가능한 게스트 로그인과 달리, 새 글을 작성(POST)할 경우 해당 유저의 아이디와 이름이 작성자로 저장되며, 내가 쓴 글 조회(GET), 수정(PATCH), 삭제(DELETE)가 가능합니다. <br/>
회원가입과 로그인 시 Request Body를 통해 전달되는 password는 bcrypt 암호화 모듈로 해싱되어 In-Memory 방식으로 구현된(models 폴더 참고) 데이터베이스에 저장됩니다. <br/>

로그인 방식은 JWT를 활용한 토큰 인증 방식으로, 유저가 로그인에 성공할 경우 accessToken은 Response Body에, refreshToken은 Cookie Header에 담아 클라이언트에 전달합니다. 두 토큰의 여부로 로그인 한 유저와 게스트 로그인 유저를 구분하여 사용 가능한 기능에 차별을 두었습니다. <br/>

전체 글 목록 조회(GET)와 내가 쓴 글 목록 조회(GET)는 offset(리턴 데이터의 시작 인덱스)과 limit(리턴 데이터의 개수) query를 사용하여 5개의 데이터를 요청하는 **Pagination** 기능을 구현하였습니다.
