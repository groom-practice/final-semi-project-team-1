# DEEPDIVE 프론트엔드 3기 Next.js 협업 Team-1

Next.js의 App Router 기능을 활용하여 사용자가 게시글 및 이미지를 확인하고, 회원가입/로그인을 할 수 있는 웹 어플리케이션입니다.

## 🚀 프로젝트 실행

```bash
$ npm i
$ npm run dev
```

## ⚙️ 기술 스택

- **프레임워크**: Next.js
- **상태 관리**: Zustand
- **스타일링**: Tailwind CSS
- **라우팅**: Intercepting Routes (Next.js App Router)
- **스크롤 감지**: Intersection Observer
- **UI 구성**: Swiper, Modal
- **인증 관련 API 연동**

<br />

## 👥 팀원 소개 및 역할 분담

| 이름   | 역할                                                                                                                         |
| ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| 최가은 | 팀장, Photos 페이지 및 기능 구현, Photos 즐겨찾기 기능 추가, Modal 컴포넌트 및 기능 구현, Login/Signup API 연동, README 작성 |
| 김승범 | 홈 페이지 내 Swiper 컴포넌트 및 기능 구현, 404 페이지 구현                                                                   |
| 이설아 | Post 페이지 및 기능 구현, Post 수정 및 삭제 기능 구현                                                                        |
| 최동윤 | 레이아웃 구현 및 Header 컴포넌트 및 기능 구현                                                                                |
| 하유희 | Login 뷰 퍼블리싱 및 기능 구현, Login zustand 상태 관리                                                                      |

<br />

## 🗂️ 폴더 구조

```
📦 app
├── 📁 @modal                           # parallel route
│   ├── (.)photos/[id]/page.tsx         # photos/${id} intercepting route
│   └── (.)posts/[id]/page.tsx          # posts/${id} intercepting route
│   └── default.tsx                     # default 페이지(이거 없으면 오류남)
│
├── 📁 api
│   ├── 📁 auth                         # Login, Signup API
│   │   ├── login/route.ts
│   │   └── signup/route.ts
│   ├── 📁 fetchImage                   # photos API(전체 리스트, id별)
│   │   ├── route.ts
│   │   └── [id]/route.ts
│   ├── 📁 posts                        # posts API(전체 리스트, id별, 댓글)
│   │   ├── route.ts
│   │   └── [id]
│   │       ├── route.ts
│   │       └── comments/route.ts
│   └── 📁 users/[userId]/route.ts      # user API(userId별)
│
├── 📁 login/page.tsx                   # 로그인 페이지
├── 📁 signup/page.tsx                  # 회원가입 페이지
├── 📁 photos
│   ├── page.tsx                        # photos 전체 페이지
│   └── [id]/page.tsx                   # photos/${id}별 페이지
├── 📁 posts
│   ├── page.tsx                        # posts 전체 페이지
│   └── [id]
│       ├── page.tsx                    # posts/${id}별 페이지
│       └── [edit]/paget.tsx            # post/${id}별 수정 페이지
├── globals.css                         # 전역 스타일 설정
├── layout.tsx                          # 전역 Layout 설정
└── page.tsx (Home)                     # 메인 페이지(`/`)

📦 components
├── AuthInput.tsx                       # 로그인과 회원가입에서 동일하게 사용되는 input 컴포넌트
├── ButtonPostList.tsx                  #
├── FavoriteBtn.tsx                     # photos 즐겨찾기 버튼 컴포넌트
├── Header.tsx                          # Header 컴포넌트
├── ImgSwiper.tsx                       # 메인페이지에 사용되는 Swiper 컴포넌트
├── InfinitePostList.tsx                # posts 무한스크롤에 사용되는 컴포넌트
├── Modal.tsx                           # Modal 컴포넌트
├── PhotoItem.tsx                       # photos/${id}마다 사용되는 컴포넌트
├── PostDetailItem.tsx                  # post/${id}마다 사용되는 컴포넌트
├── PostItem.tsx                        # postList에 사용되는 개별 요소 컴포넌트
├── Spinner.tsx                         # 로딩 스피너 컴포넌트
└── Toggle.tsx                          # post 목록 토글 컴포넌트

📦 hooks
├── usePhotoItem.ts                     # photos에서 사용되는 CustomHook
└── usePostItem.ts                      # postsd에서 사용되는 CustomHook


📦 store
├── useFavoriteStore.ts                 # photos의 즐겨찾기를 위한 zustand 상태관리
└── userStore.ts                        # login 유무 체크를 위한 zustand 상태관리

📦 type
├── photo.ts                            # photos API 받아올 때 타입 정의
└── posts.ts                            # posts 전역의 타입 정의
```

<br />

## ✅ 상세 기능 설명

### 🏠 Home(`/`)

- 즐겨찾기한 이미지들을 `Swiper` 컴포넌트로 볼 수 있습니다.
- 즐겨찾기가 하나도 없다면 "즐겨찾기한 이미지가 없습니다"라는 안내 메시지가 출력됩니다.
- 즐겨찾기 상태는 `zustand`를 사용하여 전역으로 관리됩니다.

### 🖼 Photos(`/photos`)

- 외부 API에서 받아온 이미지 목록이 표시됩니다.
- 각 이미지 우측 상단의 별 아이콘을 클릭해 즐겨찾기에 등록할 수 있습니다.
- 이미지를 클릭하면 `photos/{id}` 경로로 이동하며, **intercepting route**를 통해 모달로 상세 이미지가 먼저 표시됩니다.
  - 새로고침 시 모달 없이 전체 페이지로 전환됩니다.

### 📝 Posts(`/posts`)

- 외부 API에서 받아온 게시글 목록이 표시됩니다.
- 스크롤 모드 ↔ 버튼 모드로 전환 가능한 **토글 기능**이 존재합니다.
- 스크롤 모드에서는 `Intersection Observer`를 활용하여 무한 스크롤을 구현했습니다.
- 게시글 클릭 시 `posts/{id}`로 이동하고, `Photos`와 동일하게 모달 → 전체 페이지 전환이 이루어집니다.

### 🔐 Signup(`/signup`)

- 실제 스터디에서 사용한 회원가입 API를 사용하였습니다.
- 입력 필드가 모두 채워져야 가입 버튼이 활성화되며,
- 이미 등록된 이메일/전화번호로는 가입할 수 없습니다.
- 회원가입 성공 시 모달을 통해 로그인 창으로 이동할 수 있고, 실패 시 홈 또는 다시 회원가입 화면으로 돌아갈 수 있습니다.

### 🔓 Login(`/login`)

- 로그인 API를 이용하여 실제 인증이 가능하게 구성했습니다.
- 이메일과 비밀번호가 모두 입력되어야 로그인 버튼이 활성화됩니다.
- 등록된 이메일과 일치하는 비밀번호를 입력해야 로그인에 성공합니다.

<br />

## 🛠 API 정보

### 📦 Login(`/api/auth/login`)

- 사용자의 이메일과 비밀번호로 로그인 시도

### 📦 Signup(`/api/auth/signup`)

- 사용자의 회원가입 요청

### 🖼 Photos(`/api/fetchImage`)

- 전체 이미지 목록 조회

### 🖼 Photos(`/api/fetchImage/[id]`)

- 특정 이미지 상세 조회

### 📄 Posts(`/api/posts`)

- 전체 게시글 목록 조회

### 📄 Posts(`/api/posts/[id]`)

- 특정 게시글 상세 조회

### 💬 Posts(`/api/posts/[id]/comments`)

- 특정 게시글 댓글 조회

### 🙍‍♂️ User(`/api/users/[userId]`)

- 특정 사용자 정보 조회

<br />

## 🌿 Git 브랜치

- `main`: 최종 결과물 확인(반드시 PR 통해 머지 진행)
- `feature/본인 담당 기능명`: 본인이 맡은 부분 브랜치 파서 작업
